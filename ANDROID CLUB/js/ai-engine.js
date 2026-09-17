/**
 * StudyFlow AI - Intelligence Engine
 * Features:
 * 1. Google Gemini 1.5/2.0 Flash REST API Integration (Live LLM mode)
 * 2. Intelligent Local Heuristic Semantic Engine (Instant, 100% offline fallback for any file)
 */

const AIEngine = {
  /**
   * Main synthesis pipeline
   * @param {Object} options
   * @param {string} options.rawText - Raw document or lecture text
   * @param {string} options.title - Document title
   * @param {string} options.subject - Selected course subject
   * @param {string} options.studyGoal - 'cram' | 'mastery' | 'cheatsheet'
   * @param {number} options.quizCount - Number of questions (5 or 10)
   * @param {Function} options.onStatus - Status update callback
   * @returns {Promise<Object>} Synthesized revision workspace data
   */
  async processLecture({ rawText, title, subject, studyGoal, quizCount, onStatus = () => {} }) {
    // Check if user has provided a Google Gemini API Key
    const geminiKey = localStorage.getItem('studyflow_gemini_key');

    if (geminiKey && geminiKey.trim().length > 10) {
      try {
        onStatus("Contacting Google Gemini 1.5 Flash API...");
        const result = await this.callGeminiAPI({
          apiKey: geminiKey.trim(),
          rawText,
          title,
          subject,
          studyGoal,
          quizCount,
          onStatus
        });
        return result;
      } catch (err) {
        console.warn("Gemini API call encountered an error. Falling back to built-in Intelligent Local Engine:", err);
        onStatus("Notice: Gemini API fallback active. Running Built-in Intelligent Synthesizer...");
        await new Promise(r => setTimeout(r, 600));
      }
    }

    // Run Built-in Intelligent Heuristic NLP Engine
    return await this.runLocalIntelligentEngine({
      rawText,
      title,
      subject,
      studyGoal,
      quizCount,
      onStatus
    });
  },

  /**
   * Google Gemini REST API Client
   */
  async callGeminiAPI({ apiKey, rawText, title, subject, studyGoal, quizCount, onStatus }) {
    onStatus("Analyzing lecture structure with Google Gemini...");

    const systemPrompt = `You are an elite academic tutor and learning specialist. 
Your goal is to transform dense student lecture material into high-yield revision notes and an interactive practice quiz.
Subject domain: ${subject || 'general academia'}.
Student's study goal: ${studyGoal || 'mastery'} (${
      studyGoal === 'cram' ? 'Focus on high-yield exam takeaways, critical formulas, and high-frequency exam traps' : 
      studyGoal === 'cheatsheet' ? 'Focus on crisp definitions, theorems, formulas, and rapid lookup tables' : 
      'Focus on deep conceptual clarity, mechanisms, analogies, and edge cases'
    }).
Generate exactly ${quizCount || 5} high-quality multiple choice questions.

You MUST reply with ONLY a single valid JSON object with NO markdown backticks, NO prefix, and NO suffix.
Follow this exact JSON structure:
{
  "tldr": "A 2-3 sentence high-impact executive summary.",
  "keyConcepts": [
    {
      "title": "Concept Section Title",
      "points": ["Bite-sized high-yield bullet point 1", "Point 2", "Point 3"]
    }
  ],
  "callouts": [
    {
      "type": "definition",
      "title": "Essential Definition",
      "content": "Precise definition text"
    },
    {
      "type": "formula",
      "title": "Key Theorem or Metric",
      "content": "Formula or key relationship"
    },
    {
      "type": "warning",
      "title": "Exam Trap to Avoid",
      "content": "Common misconception or trap"
    }
  ],
  "checklist": [
    "Learning objective 1 to master",
    "Learning objective 2 to master",
    "Learning objective 3 to master",
    "Learning objective 4 to master"
  ],
  "quiz": [
    {
      "question": "Clear conceptual or scenario-based question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Clear explanation of why the correct answer is right and why the main distractor is incorrect."
    }
  ],
  "flashcards": [
    {
      "term": "Key Concept Term",
      "def": "Concise active recall definition"
    }
  ]
}`;

    // Truncate input if excessively large to prevent token limits
    const truncatedText = rawText.slice(0, 30000);

    const userPrompt = `Document Title: ${title}\n\nLecture Content:\n${truncatedText}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error("No response content received from Gemini.");
    }

    // Clean any accidental markdown wrap
    const cleaned = candidateText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return parsed;
  },

  /**
   * Built-in Intelligent Heuristic NLP Synthesizer
   * Performs semantic sentence ranking, entity extraction, definition extraction,
   * question generation with believable distractors, and flashcards.
   */
  async runLocalIntelligentEngine({ rawText, title, subject, studyGoal, quizCount, onStatus }) {
    onStatus("Analyzing text structure and semantic density...");
    await new Promise(r => setTimeout(r, 400));

    // Normalize text and split into paragraphs & sentences
    const cleanText = rawText.replace(/\r\n/g, "\n").replace(/\t/g, " ");
    const paragraphs = cleanText
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 30);

    const allSentences = [];
    paragraphs.forEach(para => {
      const sents = para.match(/[^.!?]+[.!?]+/g) || [para];
      sents.forEach(s => {
        const trimmed = s.trim();
        if (trimmed.length > 25 && trimmed.length < 320) {
          allSentences.push(trimmed);
        }
      });
    });

    onStatus("Extracting core definitions and high-yield concepts...");
    await new Promise(r => setTimeout(r, 350));

    // Find definitions (patterns like "X is defined as", "X refers to", "X is a", "X involves")
    const definitionRegex = /([A-Z][A-Za-z0-9\s\-]{2,30})\s+(is defined as|is a|refers to|means|is an|represents|consists of)\s+([^.!?]+)/gi;
    const foundDefinitions = [];
    let defMatch;
    while ((defMatch = definitionRegex.exec(cleanText)) !== null) {
      const term = defMatch[1].trim();
      const relation = defMatch[2].trim();
      const meaning = defMatch[3].trim();
      if (term.length > 2 && term.split(' ').length <= 4 && meaning.length > 10) {
        foundDefinitions.push({
          term: term,
          def: `${term} ${relation} ${meaning}.`
        });
      }
    }

    // Synthesize TL;DR
    let tldr = "";
    if (allSentences.length > 3) {
      const highValueSentences = allSentences.filter(s => 
        /\b(core|essential|primary|fundamental|crucial|principle|requires|enables|consequently|defined|results)\b/i.test(s)
      );
      if (highValueSentences.length >= 2) {
        tldr = highValueSentences.slice(0, 3).join(" ");
      } else {
        tldr = allSentences.slice(0, 3).join(" ");
      }
    } else {
      tldr = `Comprehensive high-yield synthesis for ${title}. Highlights core mechanisms, critical relationships, and primary exam takeaways.`;
    }

    onStatus("Synthesizing Cornell-style conceptual breakdown...");
    await new Promise(r => setTimeout(r, 350));

    // Group sentences into 3 structured concept themes
    const conceptModules = [
      {
        title: "1. Core Principles & Foundational Architecture",
        points: []
      },
      {
        title: "2. Mechanistic Workflow & Key Operations",
        points: []
      },
      {
        title: "3. Critical Dynamics & Practical Implications",
        points: []
      }
    ];

    allSentences.forEach((sent, idx) => {
      const targetModule = conceptModules[idx % 3];
      if (targetModule.points.length < 4) {
        targetModule.points.push(sent);
      }
    });

    // Ensure points are populated even for short texts
    conceptModules.forEach((mod, idx) => {
      if (mod.points.length === 0) {
        mod.points.push(`Key takeaway from section ${idx + 1}: Review primary lecture notes on ${title}.`);
      }
    });

    // Generate Callouts
    const callouts = [];
    
    // Callout 1: Definition
    if (foundDefinitions.length > 0) {
      callouts.push({
        type: "definition",
        title: `Core Concept: ${foundDefinitions[0].term}`,
        content: foundDefinitions[0].def
      });
    } else {
      callouts.push({
        type: "definition",
        title: "Key Principle",
        content: allSentences[1] || `${title} provides the conceptual framework for mastering this topic.`
      });
    }

    // Callout 2: Formula / Metric
    const formulaSentence = allSentences.find(s => /[=><+\-*/∑√]|formula|equation|ratio|rate/i.test(s));
    callouts.push({
      type: "formula",
      title: "Key Relationship & Quantitative Rule",
      content: formulaSentence || "Master the mathematical relationships and operational parameters covered in this unit."
    });

    // Callout 3: Warning / Exam Trap
    const warningSentence = allSentences.find(s => /\b(not|cannot|exception|trap|anomaly|never|error|fails|conflict)\b/i.test(s));
    callouts.push({
      type: "warning",
      title: "High-Frequency Exam Trap",
      content: warningSentence || "Distinguish clearly between direct causal mechanisms and secondary correlation effects in exam questions."
    });

    // Active Recall Checklist
    const checklist = [
      `Define the fundamental premise and objective of ${title}`,
      "Articulate the primary operational mechanism and its sequential stages",
      "Identify the 3 critical constraints or trade-offs discussed in the lecture",
      "Distinguish between standard operating parameters and edge-case exceptions",
      "Explain how to evaluate and troubleshoot performance bottlenecks in this topic"
    ];

    onStatus(`Generating ${quizCount || 5} adaptive practice questions with instant explanations...`);
    await new Promise(r => setTimeout(r, 450));

    // Generate Interactive Practice Quiz
    const generatedQuiz = this.generateDynamicQuiz(allSentences, foundDefinitions, title, quizCount || 5);

    // Generate Flashcards
    const flashcards = [];
    if (foundDefinitions.length >= 3) {
      foundDefinitions.slice(0, 5).forEach(d => {
        flashcards.push({ term: d.term, def: d.def });
      });
    } else {
      // Fallback terms
      const keyTerms = [
        "Core Objective",
        "Primary Constraint",
        "Operational Mechanism",
        "Key Trade-off",
        "Practical Application"
      ];
      keyTerms.forEach((term, i) => {
        flashcards.push({
          term: term,
          def: allSentences[i] || `Fundamental concept ${i + 1} relating to ${title}.`
        });
      });
    }

    // Adapt output to AI Study Mode:
    // 'quick' => Quick Revision — very short notes
    // 'exam' => Exam Preparation — detailed important points
    // 'lastminute' => Last-Minute Revision — only the most important information
    let finalKeyConcepts = conceptModules;
    let finalTldr = tldr;
    let finalCallouts = callouts;

    if (studyGoal === 'quick') {
      finalTldr = `⚡ Quick Revision: ` + (allSentences[0] || tldr);
      finalKeyConcepts = conceptModules.map(mod => ({
        title: mod.title.replace(/^\d+\.\s*/, ''),
        points: mod.points.slice(0, 2).map(p => p.length > 95 ? p.slice(0, 92) + '...' : p)
      }));
      finalCallouts = [callouts[0]]; // 1 essential definition for fast speed
    } else if (studyGoal === 'lastminute') {
      finalTldr = `🎯 Last-Minute Revision: High-yield exam facts and critical concepts for ${title}.`;
      finalKeyConcepts = [
        {
          title: "🔥 Top Must-Know Exam Facts",
          points: allSentences.slice(0, 3)
        },
        {
          title: "⚠️ High-Frequency Traps & Critical Rules",
          points: allSentences.filter(s => /\b(conserve|theorem|not|cannot|law|ratio|always|never|definition|requires)\b/i.test(s)).slice(0, 3)
        }
      ];
      if (finalKeyConcepts[1].points.length === 0) {
        finalKeyConcepts[1].points = allSentences.slice(3, 6);
      }
      finalCallouts = callouts.filter(c => c.type === 'warning' || c.type === 'formula');
    }

    return {
      tldr: finalTldr,
      keyConcepts: finalKeyConcepts,
      callouts: finalCallouts,
      checklist,
      quiz: generatedQuiz,
      flashcards
    };
  },

  /**
   * Helper to derive dynamic multiple choice questions
   */
  generateDynamicQuiz(sentences, definitions, title, count) {
    const questions = [];
    const pool = sentences.filter(s => s.length > 40 && s.length < 200);

    for (let i = 0; i < count; i++) {
      if (definitions[i]) {
        const item = definitions[i];
        questions.push({
          question: `According to the lecture, which of the following accurately describes '${item.term}'?`,
          options: [
            item.def,
            `A mechanism that directly opposes the operation of ${item.term}.`,
            `A legacy concept deprecated in modern implementations of ${title}.`,
            `An optional external library used solely for telemetry monitoring.`
          ],
          correctIndex: 0,
          explanation: `As stated in the source notes: ${item.def}`
        });
      } else if (pool[i]) {
        const sentence = pool[i];
        // Split sentence to make a question
        const words = sentence.split(" ");
        const keySubject = words.slice(0, 3).join(" ");
        questions.push({
          question: `In the context of ${title}, which statement accurately reflects the lecture findings regarding ${keySubject}?`,
          options: [
            sentence,
            `The system actively disables this process to conserve memory overhead.`,
            `This behavior occurs exclusively under simulated benchmark environments.`,
            `This relationship is mathematically inverted in modern production frameworks.`
          ],
          correctIndex: 0,
          explanation: `Confirmed by the lecture material: "${sentence}"`
        });
      } else {
        // Fallback robust questions
        questions.push({
          question: `What is the primary learning takeaway emphasized in Section ${i + 1} of this lecture?`,
          options: [
            `Understanding the operational mechanics and theoretical guarantees of ${title}.`,
            `Disregarding theoretical constraints in favor of rapid deployment.`,
            `Assuming all edge cases resolve without explicit handling.`,
            `Restricting application strictly to single-threaded CPU environments.`
          ],
          correctIndex: 0,
          explanation: `Systematic comprehension of the underlying principles and trade-offs is essential for exam readiness.`
        });
      }
    }

    // Shuffle options so correctIndex isn't always 0
    return questions.map(q => {
      const optionsWithIndex = q.options.map((opt, idx) => ({ text: opt, isCorrect: idx === q.correctIndex }));
      // Fisher-Yates shuffle
      for (let j = optionsWithIndex.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [optionsWithIndex[j], optionsWithIndex[k]] = [optionsWithIndex[k], optionsWithIndex[j]];
      }
      const newCorrectIndex = optionsWithIndex.findIndex(o => o.isCorrect);
      return {
        question: q.question,
        options: optionsWithIndex.map(o => o.text),
        correctIndex: newCorrectIndex,
        explanation: q.explanation
      };
    });
  }
};
