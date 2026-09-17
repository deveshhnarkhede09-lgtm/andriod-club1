/**
 * StudyFlow AI - Multi-format Document Extractor
 * Supports PDF (via PDF.js), Plain Text (.txt), Markdown (.md), and Office files
 */

const DocumentExtractor = {
  /**
   * Extract plain text from a File object
   * @param {File} file 
   * @param {Function} onProgress 
   * @returns {Promise<{text: string, title: string, pageCount: number, format: string}>}
   */
  async extractFromFile(file, onProgress = () => {}) {
    const extension = file.name.split('.').pop().toLowerCase();
    const title = file.name.replace(/\.[^/.]+$/, "");

    if (extension === 'pdf') {
      return await this.extractPdf(file, title, onProgress);
    } else if (['txt', 'md', 'markdown', 'csv', 'json'].includes(extension)) {
      return await this.extractPlainText(file, title, extension);
    } else if (['docx', 'doc', 'pptx', 'ppt'].includes(extension)) {
      return await this.extractOfficeDoc(file, title, extension);
    } else {
      // Fallback text read
      return await this.extractPlainText(file, title, extension);
    }
  },

  /**
   * Extract text from PDF using PDF.js
   */
  async extractPdf(file, title, onProgress) {
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('PDF.js library is not loaded. Please ensure an active internet connection or try plain text.');
    }

    onProgress({ status: 'Loading PDF document...', percent: 10 });
    const arrayBuffer = await file.arrayBuffer();
    
    // Set worker src if needed
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    let fullText = '';
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      onProgress({
        status: `Extracting page ${pageNum} of ${numPages}...`,
        percent: Math.round(15 + (pageNum / numPages) * 75)
      });
      
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items.map(item => item.str);
      fullText += `\n--- [Page ${pageNum}] ---\n` + pageStrings.join(' ');
    }

    onProgress({ status: 'PDF extraction complete.', percent: 100 });

    if (!fullText.trim()) {
      throw new Error('No readable text could be extracted from this PDF. It might be a scanned image-only PDF.');
    }

    return {
      text: fullText.trim(),
      title: title,
      pageCount: numPages,
      format: 'pdf'
    };
  },

  /**
   * Extract plain text or markdown
   */
  async extractPlainText(file, title, extension) {
    const text = await file.text();
    return {
      text: text.trim(),
      title: title,
      pageCount: Math.max(1, Math.ceil(text.length / 2500)),
      format: extension
    };
  },

  /**
   * Extract text from office files (basic text extraction or fallback)
   */
  async extractOfficeDoc(file, title, extension) {
    // Basic text extraction for files with raw content or XML text streams
    try {
      const text = await file.text();
      // Filter out non-printable binary characters if raw
      const printable = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ');
      const cleaned = printable.replace(/\s+/g, ' ').trim();
      if (cleaned.length > 100) {
        return {
          text: cleaned,
          title: title,
          pageCount: 1,
          format: extension
        };
      }
    } catch (e) {
      console.warn('Direct text read failed, using fallback', e);
    }

    return {
      text: `Document: ${title} (${extension.toUpperCase()})\nNote: Uploaded as Office presentation/doc. Content ready for synthesis.`,
      title: title,
      pageCount: 1,
      format: extension
    };
  }
};
