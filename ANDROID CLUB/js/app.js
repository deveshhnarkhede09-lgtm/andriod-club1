/**
 * StudyFlow AI - Main Application Controller
 * Google for Developers x Hack2Skill x Android Club, VIT Bhopal
 */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    inputMode: 'upload', // 'upload' | 'paste'
    currentFile: null,
    extractedDoc: null,
    subject: 'cs',
    studyGoal: 'exam',
    studyMode: 'exam',
    quizCount: 5,
    results: null,
    currentTab: 'notes',
    
    // Quiz state
    quiz: {
      currentIndex: 0,
      userAnswers: {}, // index -> chosenOptionIndex
      score: 0,
      isCompleted: false
    },

    // Flashcard state
    flashcards: {
      currentIndex: 0,
      isFlipped: false
    },

    // 5. Achievement Badges State (Purely visual)
    achievements: {
      'revision-ready': false,
      'fast-learner': false,
      'quiz-master': false,
      'exam-ready': false
    },
    quizStartTime: null
  };

  // DOM Elements
  const elements = {
    // Mode toggles
    modeUploadBtn: document.getElementById('mode-upload-btn'),
    modePasteBtn: document.getElementById('mode-paste-btn'),
    uploadZoneContainer: document.getElementById('upload-zone-container'),
    pasteContainer: document.getElementById('paste-container'),
    dropzone: document.getElementById('dropzone'),
    fileInput: document.getElementById('file-input'),
    fileSelectedCard: document.getElementById('file-selected-card'),
    selectedFileName: document.getElementById('selected-file-name'),
    selectedFileSize: document.getElementById('selected-file-size'),
    removeFileBtn: document.getElementById('remove-file-btn'),
    lectureTextarea: document.getElementById('lecture-textarea'),
    charCount: document.getElementById('char-count'),

    // Presets
    presetChips: document.querySelectorAll('.preset-chip'),

    // Personalization
    subjectChips: document.querySelectorAll('.subject-chip'),
    goalChips: document.querySelectorAll('.goal-chip'),
    quizCountChips: document.querySelectorAll('.count-chip'),

    // Primary Action
    generateBtn: document.getElementById('generate-btn'),

    // Processing Elements
    processingCard: document.getElementById('processing-card'),
    processingMainTitle: document.getElementById('processing-main-title'),
    aiBlocksDisplay: document.getElementById('ai-blocks-display'),
    aiPercentNumber: document.getElementById('ai-percent-number'),
    aiFluidBar: document.getElementById('ai-fluid-bar'),
    taskConcepts: document.getElementById('task-concepts'),
    taskDefinitions: document.getElementById('task-definitions'),
    taskQuiz: document.getElementById('task-quiz'),

    // Results & Workspace
    workspaceResults: document.getElementById('workspace-results'),
    inputStageCard: document.getElementById('input-stage-card'),
    resultsTitle: document.getElementById('results-doc-title'),
    statReadTime: document.getElementById('stat-read-time'),
    statQuestions: document.getElementById('stat-questions'),
    statSubjectBadge: document.getElementById('stat-subject-badge'),
    resetBtn: document.getElementById('reset-btn'),
    exportTriggerBtn: document.getElementById('export-trigger-btn'),

    // Tabs
    tabNotesBtn: document.getElementById('tab-notes-btn'),
    tabQuizBtn: document.getElementById('tab-quiz-btn'),
    tabFlashcardsBtn: document.getElementById('tab-flashcards-btn'),
    paneNotes: document.getElementById('pane-notes'),
    paneQuiz: document.getElementById('pane-quiz'),
    paneFlashcards: document.getElementById('pane-flashcards'),

    // Tab 1: Notes Elements
    tldrText: document.getElementById('tldr-text'),
    notesSectionsList: document.getElementById('notes-sections-list'),
    calloutsList: document.getElementById('callouts-list'),
    checklistContainer: document.getElementById('checklist-container'),

    // Tab 2: Quiz Elements
    quizWrapper: document.getElementById('quiz-wrapper'),
    quizProgressFill: document.getElementById('quiz-progress-fill'),
    quizIndexBadge: document.getElementById('quiz-index-badge'),
    quizLiveScore: document.getElementById('quiz-live-score'),
    quizQuestionText: document.getElementById('quiz-question-text'),
    quizOptionsList: document.getElementById('quiz-options-list'),
    quizExplanationCard: document.getElementById('quiz-explanation-card'),
    quizExplanationHeader: document.getElementById('quiz-explanation-header'),
    quizExplanationBody: document.getElementById('quiz-explanation-body'),
    quizPrevBtn: document.getElementById('quiz-prev-btn'),
    quizNextBtn: document.getElementById('quiz-next-btn'),
    quizFinishedCard: document.getElementById('quiz-finished-card'),
    finishedScoreNum: document.getElementById('finished-score-num'),
    finishedScoreTotal: document.getElementById('finished-score-total'),
    finishedResultTitle: document.getElementById('finished-result-title'),
    finishedResultFeedback: document.getElementById('finished-result-feedback'),
    retakeQuizBtn: document.getElementById('retake-quiz-btn'),

    // Tab 3: Flashcards Elements
    flashcardCurrentNum: document.getElementById('flashcard-current-num'),
    flashcardTotalNum: document.getElementById('flashcard-total-num'),
    flashcardInner: document.getElementById('flashcard-inner'),
    flashcardTerm: document.getElementById('flashcard-term'),
    flashcardDef: document.getElementById('flashcard-def'),
    flashcardFlipBtn: document.getElementById('flashcard-flip-btn'),
    flashcardPrevBtn: document.getElementById('flashcard-prev-btn'),
    flashcardNextBtn: document.getElementById('flashcard-next-btn'),

    // Theme toggle
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIcon: document.getElementById('theme-icon'),
    themeBtnLight: document.getElementById('theme-btn-light'),
    themeBtnDark: document.getElementById('theme-btn-dark'),
    themeSegmentedSwitch: document.getElementById('theme-segmented-switch'),

    // Modals
    exportModal: document.getElementById('export-modal'),
    closeExportBtn: document.getElementById('close-export-btn'),
    exportPdfBtn: document.getElementById('export-pdf-btn'),
    exportMdBtn: document.getElementById('export-md-btn'),
    exportJsonBtn: document.getElementById('export-json-btn'),
    exportCopyBtn: document.getElementById('export-copy-btn'),

    settingsModal: document.getElementById('settings-modal'),
    openSettingsBtn: document.getElementById('open-settings-btn'),
    closeSettingsBtn: document.getElementById('close-settings-btn'),
    geminiKeyInput: document.getElementById('gemini-key-input'),
    saveKeyBtn: document.getElementById('save-key-btn'),
    clearKeyBtn: document.getElementById('clear-key-btn'),
    engineStatusBadge: document.getElementById('engine-status-badge'),

    toastContainer: document.getElementById('toast-container')
  };

  // Day / Night Theme Controller
  function applyTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-mode');
      if (elements.themeBtnLight) {
        elements.themeBtnLight.classList.add('active');
        elements.themeBtnLight.setAttribute('aria-checked', 'true');
      }
      if (elements.themeBtnDark) {
        elements.themeBtnDark.classList.remove('active');
        elements.themeBtnDark.setAttribute('aria-checked', 'false');
      }
      if (elements.themeIcon) {
        elements.themeIcon.setAttribute('data-lucide', 'moon');
      }
      if (elements.themeToggleBtn) {
        elements.themeToggleBtn.title = 'Switch to Dark Mode';
      }
    } else {
      document.body.classList.remove('light-mode');
      if (elements.themeBtnDark) {
        elements.themeBtnDark.classList.add('active');
        elements.themeBtnDark.setAttribute('aria-checked', 'true');
      }
      if (elements.themeBtnLight) {
        elements.themeBtnLight.classList.remove('active');
        elements.themeBtnLight.setAttribute('aria-checked', 'false');
      }
      if (elements.themeIcon) {
        elements.themeIcon.setAttribute('data-lucide', 'sun');
      }
      if (elements.themeToggleBtn) {
        elements.themeToggleBtn.title = 'Switch to Light Mode';
      }
    }
    localStorage.setItem('studyflow_theme', isLight ? 'light' : 'dark');
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Initialize theme (default to Dark AI Dashboard for impressive demo impact)
  const savedTheme = localStorage.getItem('studyflow_theme');
  const initialThemeIsLight = savedTheme === 'light';
  applyTheme(initialThemeIsLight);

  if (elements.themeBtnLight) {
    elements.themeBtnLight.addEventListener('click', () => {
      applyTheme(true);
      showToast('Switched to Light Mode ☀️');
    });
  }

  if (elements.themeBtnDark) {
    elements.themeBtnDark.addEventListener('click', () => {
      applyTheme(false);
      showToast('Switched to Dark AI Dashboard 🌙');
    });
  }

  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = document.body.classList.contains('light-mode');
      applyTheme(!isCurrentlyLight);
      showToast(!isCurrentlyLight ? 'Switched to Light Mode ☀️' : 'Switched to Dark AI Dashboard 🌙');
    });
  }

  // Initialize Lucide Icons if loaded
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Load saved Gemini API Key
  const savedKey = localStorage.getItem('studyflow_gemini_key');
  if (savedKey) {
    elements.geminiKeyInput.value = savedKey;
    updateEngineBadge(true);
  } else {
    updateEngineBadge(false);
  }

  function updateEngineBadge(hasKey) {
    if (hasKey) {
      elements.engineStatusBadge.innerHTML = `<span class="pill pill-cyan"><i data-lucide="zap" style="width:12px;height:12px;"></i> Google Gemini Active</span>`;
    } else {
      elements.engineStatusBadge.innerHTML = `<span class="pill pill-indigo"><i data-lucide="cpu" style="width:12px;height:12px;"></i> Built-in Intelligent Engine</span>`;
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // Toast Notification
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-triangle' : 'info';
    toast.innerHTML = `
      <i data-lucide="${iconName}" style="color: ${type === 'success' ? '#10B981' : type === 'error' ? '#F43F5E' : '#38BDF8'}; width:18px;height:18px;"></i>
      <span>${message}</span>
    `;
    elements.toastContainer.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Input Mode Switching (Upload vs Paste)
  elements.modeUploadBtn.addEventListener('click', () => {
    state.inputMode = 'upload';
    elements.modeUploadBtn.classList.add('active');
    elements.modePasteBtn.classList.remove('active');
    elements.uploadZoneContainer.style.display = 'block';
    elements.pasteContainer.classList.remove('active');
  });

  elements.modePasteBtn.addEventListener('click', () => {
    state.inputMode = 'paste';
    elements.modePasteBtn.classList.add('active');
    elements.modeUploadBtn.classList.remove('active');
    elements.uploadZoneContainer.style.display = 'none';
    elements.pasteContainer.classList.add('active');
  });

  // Character counter
  elements.lectureTextarea.addEventListener('input', () => {
    const count = elements.lectureTextarea.value.length;
    elements.charCount.textContent = `${count.toLocaleString()} characters`;
  });

  // Multi-Format Configurations (PDF, DOCX, PPTX, TXT, MD)
  const FORMAT_CONFIGS = {
    pdf: {
      format: 'pdf',
      badgeColor: '#E11D48',
      strokeColor: 'rgba(244, 63, 94, 0.45)',
      cornerFill: 'rgba(244, 63, 94, 0.3)',
      glowColor: 'rgba(225, 29, 72, 0.35)',
      miniIcon: '📄',
      presetKey: 'physics',
      defaultFile: 'Physics_Chapter_3.pdf'
    },
    docx: {
      format: 'docx',
      badgeColor: '#2563EB',
      strokeColor: 'rgba(59, 130, 246, 0.45)',
      cornerFill: 'rgba(59, 130, 246, 0.3)',
      glowColor: 'rgba(37, 99, 235, 0.35)',
      miniIcon: '📘',
      presetKey: 'docx',
      defaultFile: 'Literature_Essay_Draft.docx'
    },
    pptx: {
      format: 'pptx',
      badgeColor: '#EA580C',
      strokeColor: 'rgba(249, 115, 22, 0.45)',
      cornerFill: 'rgba(249, 115, 22, 0.3)',
      glowColor: 'rgba(234, 88, 12, 0.35)',
      miniIcon: '📙',
      presetKey: 'pptx',
      defaultFile: 'Biology_Lecture_Slides.pptx'
    },
    txt: {
      format: 'txt',
      badgeColor: '#059669',
      strokeColor: 'rgba(16, 185, 129, 0.45)',
      cornerFill: 'rgba(16, 185, 129, 0.3)',
      glowColor: 'rgba(5, 150, 105, 0.35)',
      miniIcon: '📗',
      presetKey: 'txt',
      defaultFile: 'Economics_Transcript.txt'
    },
    md: {
      format: 'md',
      badgeColor: '#7C3AED',
      strokeColor: 'rgba(139, 92, 246, 0.45)',
      cornerFill: 'rgba(139, 92, 246, 0.3)',
      glowColor: 'rgba(124, 58, 237, 0.35)',
      miniIcon: '📝',
      presetKey: 'md',
      defaultFile: 'Operating_Systems_Notes.md'
    }
  };

  function updateDropzoneFormat(fmt) {
    const cleanFmt = (fmt || 'pdf').toLowerCase().replace('.', '');
    const config = FORMAT_CONFIGS[cleanFmt] || FORMAT_CONFIGS.pdf;

    const badgeRect = document.getElementById('format-svg-badge-rect');
    const badgeText = document.getElementById('format-svg-badge-text');
    const svgBody = document.getElementById('format-svg-body');
    const svgCorner = document.getElementById('format-svg-corner');
    const iconGlow = document.getElementById('dropzone-icon-glow');
    const dropTitle = document.getElementById('dropzone-title');

    if (badgeRect) badgeRect.setAttribute('fill', config.badgeColor);
    if (badgeText) {
      badgeText.textContent = config.format.toUpperCase();
      badgeText.setAttribute('font-size', config.format.length > 3 ? '10' : '12');
    }
    if (svgBody) svgBody.setAttribute('stroke', config.strokeColor);
    if (svgCorner) {
      svgCorner.setAttribute('fill', config.cornerFill);
      svgCorner.setAttribute('stroke', config.strokeColor);
    }
    if (iconGlow) {
      iconGlow.style.background = `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`;
    }
    if (dropTitle) {
      dropTitle.textContent = `Drop your lecture ${config.format.toUpperCase()} here, or browse`;
    }

    const badges = document.querySelectorAll('#supported-formats-bar .format-badge');
    badges.forEach(b => {
      b.classList.toggle('active-format', b.getAttribute('data-format') === config.format);
    });

    const miniIconEl = document.getElementById('selected-file-mini-icon');
    if (miniIconEl) miniIconEl.textContent = config.miniIcon;
  }

  // Preset loader
  function loadPreset(presetKey) {
    const presetData = ACADEMIC_PRESETS[presetKey];
    if (!presetData) return;

    // Detect format from preset
    const ext = presetData.title.split('.').pop().toLowerCase();
    updateDropzoneFormat(ext);

    state.extractedDoc = {
      title: presetData.title,
      text: presetData.rawContent,
      format: ext
    };
    state.subject = presetData.subject;

    elements.subjectChips.forEach(sc => {
      sc.classList.toggle('active', sc.getAttribute('data-subject') === presetData.subject);
    });

    // Show file selected card with glowing checkmark
    elements.selectedFileName.innerHTML = `<span class="file-check-badge">✓</span> ${presetData.title}`;
    elements.selectedFileSize.textContent = `${presetData.courseCode} • ${presetData.domainLabel} • Ready to Synthesize`;
    elements.fileSelectedCard.classList.add('active');

    elements.lectureTextarea.value = presetData.rawContent;
    elements.charCount.textContent = `${presetData.rawContent.length.toLocaleString()} characters`;

    showToast(`✓ ${presetData.title} ready!`, 'success');
  }

  // Presets selector buttons
  elements.presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const presetKey = chip.getAttribute('data-preset');
      loadPreset(presetKey);
    });
  });

  // Supported formats badges (Clicking switches format & loads sample)
  const formatBadges = document.querySelectorAll('#supported-formats-bar .format-badge');
  formatBadges.forEach(badge => {
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      const fmt = badge.getAttribute('data-format');
      updateDropzoneFormat(fmt);
      const config = FORMAT_CONFIGS[fmt];
      if (config && config.presetKey) {
        loadPreset(config.presetKey);
      }
    });
  });

  // File Dropzone interactions
  elements.dropzone.addEventListener('click', () => elements.fileInput.click());

  ['dragenter', 'dragover'].forEach(eventName => {
    elements.dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      elements.dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    elements.dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      elements.dropzone.classList.remove('dragover');
    });
  });

  elements.dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  });

  elements.fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  });

  elements.removeFileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.currentFile = null;
    state.extractedDoc = null;
    elements.fileInput.value = '';
    elements.fileSelectedCard.classList.remove('active');
    showToast('File removed');
  });

  async function handleFileSelected(file) {
    state.currentFile = file;
    const ext = file.name.split('.').pop().toLowerCase();
    updateDropzoneFormat(ext);

    elements.selectedFileName.innerHTML = `<span class="file-check-badge">✓</span> ${file.name}`;
    elements.selectedFileSize.textContent = `${(file.size / 1024).toFixed(1)} KB • Reading ${ext.toUpperCase()} stream...`;
    elements.fileSelectedCard.classList.add('active');

    try {
      showToast(`Extracting text from ${file.name}...`);
      const extracted = await DocumentExtractor.extractFromFile(file, (p) => {
        elements.selectedFileSize.textContent = `${(file.size / 1024).toFixed(1)} KB • ${p.status}`;
      });
      state.extractedDoc = extracted;
      elements.selectedFileName.innerHTML = `<span class="file-check-badge">✓</span> ${file.name}`;
      elements.selectedFileSize.textContent = `${(file.size / 1024).toFixed(1)} KB • ${extracted.pageCount} section(s) • Ready to Synthesize`;
      showToast(`✓ ${file.name} ready!`, 'success');
    } catch (err) {
      console.error(err);
      showToast(`Extraction failed: ${err.message}`, 'error');
      elements.selectedFileSize.textContent = `Error reading file.`;
    }
  }

  // Personalization chip selections
  elements.subjectChips.forEach(chip => {
    chip.addEventListener('click', () => {
      elements.subjectChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.subject = chip.getAttribute('data-subject');
    });
  });

  // AI Study Mode Selector (Quick Revision | Exam Preparation | Last-Minute Revision)
  const studyModeCards = document.querySelectorAll('.study-mode-card');
  const activeModePill = document.getElementById('active-mode-pill');

  const STUDY_MODES = {
    quick: {
      id: 'quick',
      label: 'Quick Revision',
      emoji: '📖',
      subtitle: 'very short notes',
      pillText: '📖 Quick Revision Active'
    },
    exam: {
      id: 'exam',
      label: 'Exam Preparation',
      emoji: '🧠',
      subtitle: 'detailed important points',
      pillText: '🧠 Exam Preparation Active'
    },
    lastminute: {
      id: 'lastminute',
      label: 'Last-Minute Revision',
      emoji: '🎯',
      subtitle: 'only the most important information',
      pillText: '🎯 Last-Minute Revision Active'
    }
  };

  studyModeCards.forEach(card => {
    card.addEventListener('click', () => {
      const modeKey = card.getAttribute('data-mode') || 'exam';
      setStudyMode(modeKey);
    });
  });

  function setStudyMode(modeKey) {
    const modeConfig = STUDY_MODES[modeKey] || STUDY_MODES.exam;
    state.studyMode = modeConfig.id;
    state.studyGoal = modeConfig.id;

    studyModeCards.forEach(c => {
      const isCurrent = c.getAttribute('data-mode') === modeConfig.id;
      c.classList.toggle('active', isCurrent);
      const indicator = c.querySelector('.mode-check-indicator');
      if (indicator) indicator.textContent = isCurrent ? '✓' : '';
    });

    if (activeModePill) {
      activeModePill.textContent = modeConfig.pillText;
    }

    showToast(`AI Study Mode: ${modeConfig.emoji} ${modeConfig.label} (${modeConfig.subtitle})`);
  }

  elements.quizCountChips.forEach(chip => {
    chip.addEventListener('click', () => {
      elements.quizCountChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.quizCount = parseInt(chip.getAttribute('data-count'), 10);
    });
  });

  // Primary Action: Generate Notes & Quiz
  elements.generateBtn.addEventListener('click', async () => {
    let textToProcess = '';
    let docTitle = 'Lecture Material';

    if (state.inputMode === 'upload') {
      if (!state.extractedDoc) {
        showToast('Please upload a lecture file or select one of the 1-click presets above!', 'error');
        return;
      }
      textToProcess = state.extractedDoc.text;
      docTitle = state.extractedDoc.title;
    } else {
      textToProcess = elements.lectureTextarea.value.trim();
      if (!textToProcess || textToProcess.length < 50) {
        showToast('Please paste at least a few sentences of lecture notes to synthesize.', 'error');
        return;
      }
      docTitle = 'Pasted Lecture Notes';
    }

    // Begin visual processing
    elements.inputStageCard.style.display = 'none';
    elements.processingCard.classList.add('active');
    updateProcessingProgress(15, 0);

    try {
      // Check if it matches a preset for instantaneous rich load when offline
      const matchedPreset = Object.values(ACADEMIC_PRESETS).find(p => p.title === docTitle);
      let results;

      if (matchedPreset && !localStorage.getItem('studyflow_gemini_key')) {
        // Step 1: Extracting important concepts
        updateProcessingProgress(28, 0);
        await new Promise(r => setTimeout(r, 450));
        
        // Step 2: Identifying definitions
        updateProcessingProgress(55, 1);
        await new Promise(r => setTimeout(r, 500));

        // Step 3: Preparing exam questions (hits exact 78% with ███████████░░░)
        updateProcessingProgress(78, 2);
        await new Promise(r => setTimeout(r, 650));

        // Finalize 100%
        updateProcessingProgress(100, 3);
        await new Promise(r => setTimeout(r, 400));

        let customizedKeyConcepts = matchedPreset.keyConcepts;
        let customizedTldr = matchedPreset.tldr;
        let customizedCallouts = matchedPreset.callouts;

        if (state.studyMode === 'quick') {
          // Quick Revision: very short notes
          customizedTldr = `⚡ Quick Revision: ` + matchedPreset.tldr.split('. ').slice(0, 2).join('. ') + '.';
          customizedKeyConcepts = matchedPreset.keyConcepts.map(c => ({
            title: c.title,
            points: c.points.slice(0, 2).map(p => p.length > 95 ? p.slice(0, 92) + '...' : p)
          }));
          customizedCallouts = matchedPreset.callouts.slice(0, 1);
        } else if (state.studyMode === 'lastminute') {
          // Last-Minute Revision: only the most important information
          customizedTldr = `🎯 Last-Minute Revision: ` + matchedPreset.tldr.split('. ').slice(0, 2).join('. ') + '.';
          customizedKeyConcepts = matchedPreset.keyConcepts.map(c => ({
            title: `🔥 Must-Know: ${c.title}`,
            points: [c.points[0], c.points[c.points.length - 1]]
          }));
          customizedCallouts = matchedPreset.callouts.filter(co => co.type === 'warning' || co.type === 'formula');
        }

        results = {
          tldr: customizedTldr,
          keyConcepts: customizedKeyConcepts,
          callouts: customizedCallouts,
          checklist: matchedPreset.checklist,
          quiz: matchedPreset.quiz.slice(0, state.quizCount),
          flashcards: matchedPreset.flashcards
        };
      } else {
        // AI Engine synthesis
        updateProcessingProgress(25, 0);
        results = await AIEngine.processLecture({
          rawText: textToProcess,
          title: docTitle,
          subject: state.subject,
          studyGoal: state.studyGoal,
          quizCount: state.quizCount,
          onStatus: (status) => {
            if (status.includes('Extracting') || status.includes('Analyzing text')) {
              updateProcessingProgress(35, 0);
            } else if (status.includes('definitions') || status.includes('Synthesizing')) {
              updateProcessingProgress(58, 1);
            } else if (status.includes('Generating') || status.includes('quiz') || status.includes('adaptive')) {
              updateProcessingProgress(78, 2);
            }
          }
        });
        updateProcessingProgress(100, 3);
        await new Promise(r => setTimeout(r, 350));
      }

      state.results = results;
      renderWorkspace(docTitle, results);

      // Hide processing, show workspace
      elements.processingCard.classList.remove('active');
      elements.workspaceResults.classList.add('active');
      window.scrollTo({ top: elements.workspaceResults.offsetTop - 80, behavior: 'smooth' });
      showToast('Revision workspace generated successfully!', 'success');

    } catch (err) {
      console.error(err);
      elements.processingCard.classList.remove('active');
      elements.inputStageCard.style.display = 'block';
      showToast(`Synthesis failed: ${err.message}`, 'error');
    }
  });

  function updateProcessingProgress(percent, activeTaskIndex) {
    const totalBlocks = 14;
    const filled = Math.round((percent / 100) * totalBlocks);
    const empty = Math.max(0, totalBlocks - filled);
    const blockStr = '█'.repeat(filled) + '░'.repeat(empty);

    if (elements.aiBlocksDisplay) {
      elements.aiBlocksDisplay.textContent = blockStr;
    }
    if (elements.aiPercentNumber) {
      elements.aiPercentNumber.textContent = `${percent}%`;
    }
    if (elements.aiFluidBar) {
      elements.aiFluidBar.style.width = `${percent}%`;
    }

    const tasks = [
      elements.taskConcepts,
      elements.taskDefinitions,
      elements.taskQuiz
    ];

    tasks.forEach((taskEl, idx) => {
      if (!taskEl) return;
      const iconSpan = taskEl.querySelector('.task-status-icon');
      if (idx < activeTaskIndex) {
        taskEl.className = 'processing-task-item done';
        if (iconSpan) iconSpan.innerHTML = '<span class="task-check">✓</span>';
      } else if (idx === activeTaskIndex) {
        taskEl.className = 'processing-task-item active';
        if (iconSpan) iconSpan.innerHTML = '<span class="task-spinner"></span>';
      } else {
        taskEl.className = 'processing-task-item';
        if (iconSpan) iconSpan.innerHTML = '<span class="task-dot"></span>';
      }
    });
  }

  // Reset to create another flow
  elements.resetBtn.addEventListener('click', () => {
    switchTab('notes');
    elements.workspaceResults.classList.remove('active');
    elements.inputStageCard.style.display = 'block';
    window.scrollTo({ top: elements.inputStageCard.offsetTop - 100, behavior: 'smooth' });
  });

  // Workspace Navigation Tabs
  elements.tabNotesBtn.addEventListener('click', () => switchTab('notes'));
  elements.tabQuizBtn.addEventListener('click', () => switchTab('quiz'));
  elements.tabFlashcardsBtn.addEventListener('click', () => switchTab('flashcards'));

  function switchTab(tab) {
    state.currentTab = tab;
    elements.tabNotesBtn.classList.toggle('active', tab === 'notes');
    elements.tabQuizBtn.classList.toggle('active', tab === 'quiz');
    elements.tabFlashcardsBtn.classList.toggle('active', tab === 'flashcards');

    elements.paneNotes.classList.toggle('active', tab === 'notes');
    elements.paneQuiz.classList.toggle('active', tab === 'quiz');
    elements.paneFlashcards.classList.toggle('active', tab === 'flashcards');
  }

  // Render Full Workspace
  function renderWorkspace(title, data) {
    // Header Stats
    elements.resultsTitle.textContent = title;
    elements.statQuestions.textContent = `${data.quiz?.length || 5} Practice Questions`;
    elements.statSubjectBadge.textContent = state.subject.toUpperCase();

    const statModeBadge = document.getElementById('stat-mode-badge');
    if (statModeBadge) {
      const modeMap = {
        quick: '📖 Quick Revision',
        exam: '🧠 Exam Preparation',
        lastminute: '🎯 Last-Minute Revision'
      };
      statModeBadge.textContent = modeMap[state.studyMode] || '🧠 Exam Preparation';
    }

    // Est. reading time (approx 150 wpm for notes)
    const wordCount = (data.tldr + JSON.stringify(data.keyConcepts)).split(/\s+/).length;
    const estTime = Math.max(2, Math.ceil(wordCount / 180));
    elements.statReadTime.textContent = `${estTime} min read`;

    // Tab 1: Render Revision Notes
    elements.tldrText.textContent = data.tldr || 'No summary available.';

    // Concept Sections
    elements.notesSectionsList.innerHTML = '';
    (data.keyConcepts || []).forEach((concept) => {
      const card = document.createElement('div');
      card.className = 'note-section-card';
      
      const bulletsHtml = (concept.points || []).map(pt => `
        <li class="bullet-point-item">
          <span class="bullet-dot"></span>
          <span>${pt}</span>
        </li>
      `).join('');

      card.innerHTML = `
        <h3 class="section-card-title">
          <i data-lucide="book-open" style="color: #818CF8; width: 18px; height: 18px;"></i>
          ${concept.title}
        </h3>
        <ul class="bullet-points-list">
          ${bulletsHtml}
        </ul>
      `;
      elements.notesSectionsList.appendChild(card);
    });

    // Callouts
    elements.calloutsList.innerHTML = '';
    (data.callouts || []).forEach(callout => {
      const box = document.createElement('div');
      box.className = `callout-box ${callout.type || 'definition'}`;
      const iconName = callout.type === 'formula' ? 'function-square' : callout.type === 'warning' ? 'alert-triangle' : 'lightbulb';
      box.innerHTML = `
        <div class="callout-title">
          <i data-lucide="${iconName}" style="width: 16px; height: 16px;"></i>
          ${callout.title}
        </div>
        <div class="callout-content">${callout.content}</div>
      `;
      elements.calloutsList.appendChild(box);
    });

    // Cornell Checklist
    elements.checklistContainer.innerHTML = '';
    (data.checklist || []).forEach((item, idx) => {
      const checkItem = document.createElement('label');
      checkItem.className = 'checklist-item';
      checkItem.innerHTML = `
        <input type="checkbox" class="checklist-checkbox" id="check-${idx}">
        <span class="checklist-label">${item}</span>
      `;
      elements.checklistContainer.appendChild(checkItem);
    });

    // Tab 2: Render Quiz
    initQuiz(data.quiz || []);

    // Tab 3: Render Flashcards
    initFlashcards(data.flashcards || []);

    // Re-create lucide icons for newly injected elements
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Unlock 📚 Revision Ready badge upon successful synthesis
    unlockBadge('revision-ready');
  }

  // ==========================================================================
  // 5. Achievement Badges System (Purely Visual)
  // ==========================================================================
  const BADGES = {
    'revision-ready': {
      key: 'revision-ready',
      id: 'badge-revision-ready',
      icon: '📚',
      title: 'Revision Ready',
      criteria: 'notes generated',
      desc: 'AI notes synthesized & ready for recall'
    },
    'fast-learner': {
      key: 'fast-learner',
      id: 'badge-fast-learner',
      icon: '🔥',
      title: 'Fast Learner',
      criteria: 'completed quickly',
      desc: 'Completed quiz challenge with rapid focus'
    },
    'quiz-master': {
      key: 'quiz-master',
      id: 'badge-quiz-master',
      icon: '🏆',
      title: 'Quiz Master',
      criteria: '5/5',
      desc: 'Scored 100% on the interactive practice quiz'
    },
    'exam-ready': {
      key: 'exam-ready',
      id: 'badge-exam-ready',
      icon: '🎯',
      title: 'Exam Ready',
      criteria: 'completed revision + quiz',
      desc: 'Full revision and quiz completion mastered'
    }
  };

  function unlockBadge(badgeKey) {
    const badge = BADGES[badgeKey];
    if (!badge) return;
    if (state.achievements[badgeKey]) return; // already unlocked

    state.achievements[badgeKey] = true;

    // Visual update on the shelf badge card
    const card = document.getElementById(badge.id);
    if (card) {
      card.classList.add('unlocked');
      const pill = card.querySelector('.badge-status-pill');
      if (pill) pill.textContent = 'UNLOCKED ✓';
    }

    // Update count indicator in header
    const totalUnlocked = Object.values(state.achievements).filter(Boolean).length;
    const countBadge = document.getElementById('achievements-count-badge');
    if (countBadge) {
      countBadge.textContent = `${totalUnlocked} / 4 Unlocked`;
    }

    // Update quiz completion screen badges row if active
    updateQuizEarnedBadgesUI();

    showToast(`Achievement Unlocked! ${badge.icon} ${badge.title} (${badge.criteria})`, 'success');
    triggerConfetti();
  }

  function updateQuizEarnedBadgesUI() {
    const row = document.getElementById('earned-badges-row');
    if (!row) return;
    row.innerHTML = '';
    Object.keys(BADGES).forEach(key => {
      const b = BADGES[key];
      const isUnlocked = state.achievements[key];
      const chip = document.createElement('div');
      chip.className = `earned-badge-chip ${isUnlocked ? 'unlocked' : 'locked'}`;
      chip.innerHTML = `
        <span class="badge-chip-icon">${b.icon}</span>
        <span class="badge-chip-name">${b.title}</span>
        <span class="badge-chip-status">${isUnlocked ? '✓' : '🔒'}</span>
      `;
      row.appendChild(chip);
    });
  }

  // ==========================================================================
  // Interactive Quiz Controller
  // ==========================================================================
  function initQuiz(quizQuestions) {
    state.quizStartTime = Date.now();
    state.quiz = {
      questions: quizQuestions,
      currentIndex: 0,
      userAnswers: {},
      score: 0,
      isCompleted: false
    };

    elements.quizFinishedCard.classList.remove('active');
    elements.quizCard = document.querySelector('.quiz-card');
    elements.quizCard.style.display = 'block';

    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    const q = state.quiz.questions[state.quiz.currentIndex];
    if (!q) return;

    const total = state.quiz.questions.length;
    const currNum = state.quiz.currentIndex + 1;

    // Progress
    elements.quizProgressFill.style.width = `${(currNum / total) * 100}%`;
    elements.quizIndexBadge.textContent = `Question ${currNum} of ${total}`;
    elements.quizLiveScore.textContent = `Score: ${state.quiz.score}/${total}`;

    // Question
    elements.quizQuestionText.textContent = q.question;

    // Options
    elements.quizOptionsList.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    const chosen = state.quiz.userAnswers[state.quiz.currentIndex];
    const isAnswered = chosen !== undefined;

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      if (isAnswered) {
        btn.classList.add('locked');
        if (optIdx === q.correctIndex) {
          btn.classList.add('correct');
        } else if (optIdx === chosen) {
          btn.classList.add('incorrect');
        }
      }

      btn.innerHTML = `
        <span class="option-letter">${letters[optIdx]}</span>
        <span>${optText}</span>
      `;

      btn.addEventListener('click', () => {
        if (state.quiz.userAnswers[state.quiz.currentIndex] === undefined) {
          handleOptionSelected(optIdx);
        }
      });

      elements.quizOptionsList.appendChild(btn);
    });

    // Explanation
    if (isAnswered) {
      elements.quizExplanationCard.classList.add('active');
      const isCorrect = chosen === q.correctIndex;
      elements.quizExplanationHeader.className = `explanation-header ${isCorrect ? 'correct' : 'incorrect'}`;
      elements.quizExplanationHeader.innerHTML = `
        <i data-lucide="${isCorrect ? 'check-circle' : 'x-circle'}" style="width:16px;height:16px;"></i>
        <span>${isCorrect ? 'Correct! High-Yield Takeaway:' : 'Incorrect. Key Concept Review:'}</span>
      `;
      elements.quizExplanationBody.textContent = q.explanation;
    } else {
      elements.quizExplanationCard.classList.remove('active');
    }

    // Navigation buttons
    elements.quizPrevBtn.style.visibility = state.quiz.currentIndex > 0 ? 'visible' : 'hidden';
    elements.quizNextBtn.textContent = (currNum === total) ? 'Finish Quiz' : 'Next Question';
    elements.quizNextBtn.disabled = !isAnswered;

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function handleOptionSelected(optIdx) {
    const q = state.quiz.questions[state.quiz.currentIndex];
    state.quiz.userAnswers[state.quiz.currentIndex] = optIdx;

    if (optIdx === q.correctIndex) {
      state.quiz.score++;
      showToast('Correct answer! +1 Score', 'success');
    } else {
      showToast('Incorrect option selected.', 'error');
    }

    renderCurrentQuestion();
  }

  elements.quizPrevBtn.addEventListener('click', () => {
    if (state.quiz.currentIndex > 0) {
      state.quiz.currentIndex--;
      renderCurrentQuestion();
    }
  });

  elements.quizNextBtn.addEventListener('click', () => {
    if (state.quiz.currentIndex < state.quiz.questions.length - 1) {
      state.quiz.currentIndex++;
      renderCurrentQuestion();
    } else {
      finishQuiz();
    }
  });

  function finishQuiz() {
    state.quiz.isCompleted = true;
    elements.quizCard.style.display = 'none';
    elements.quizFinishedCard.classList.add('active');

    const total = state.quiz.questions.length;
    const score = state.quiz.score;
    const percentage = Math.round((score / total) * 100);

    elements.finishedScoreNum.textContent = score;
    elements.finishedScoreTotal.textContent = `/${total}`;

    // Achievement Badge Evaluations
    // 1. 🏆 Quiz Master — 5/5 or 100% on quiz
    if (score === total && total >= 3) {
      unlockBadge('quiz-master');
    }

    // 2. 🔥 Fast Learner — completed quickly (under 75 seconds)
    const elapsedSeconds = (Date.now() - (state.quizStartTime || Date.now())) / 1000;
    if (elapsedSeconds <= 75) {
      unlockBadge('fast-learner');
    }

    // 3. 🎯 Exam Ready — completed revision + quiz
    if (state.achievements['revision-ready']) {
      unlockBadge('exam-ready');
    }

    // Refresh earned badges chips inside the quiz finish card
    updateQuizEarnedBadgesUI();

    if (percentage >= 80) {
      elements.finishedResultTitle.textContent = "Exam Ready! Outstanding.";
      elements.finishedResultFeedback.textContent = "You demonstrated strong conceptual retention of the core principles. Great work!";
      triggerConfetti();
    } else if (percentage >= 50) {
      elements.finishedResultTitle.textContent = "Solid Understanding!";
      elements.finishedResultFeedback.textContent = "Good retention. Review the highlighted callouts and Cornell checklist to master edge cases.";
    } else {
      elements.finishedResultTitle.textContent = "Review Recommended";
      elements.finishedResultFeedback.textContent = "Take another pass at the high-yield revision notes and flashcards before re-attempting.";
    }
  }

  elements.retakeQuizBtn.addEventListener('click', () => {
    initQuiz(state.results.quiz);
  });

  function triggerConfetti() {
    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#38BDF8', '#10B981', '#F59E0B']
      });
    }
  }

  // ==========================================================================
  // Flashcards Active Recall Deck
  // ==========================================================================
  function initFlashcards(cards) {
    state.flashcards = {
      deck: cards || [],
      currentIndex: 0,
      isFlipped: false
    };

    renderCurrentFlashcard();
  }

  function renderCurrentFlashcard() {
    const deck = state.flashcards.deck;
    if (!deck || deck.length === 0) return;

    const card = deck[state.flashcards.currentIndex];
    elements.flashcardCurrentNum.textContent = state.flashcards.currentIndex + 1;
    elements.flashcardTotalNum.textContent = deck.length;

    elements.flashcardTerm.textContent = card.term;
    elements.flashcardDef.textContent = card.def;

    // Reset flip
    state.flashcards.isFlipped = false;
    elements.flashcardInner.classList.remove('flipped');

    elements.flashcardPrevBtn.disabled = state.flashcards.currentIndex === 0;
    elements.flashcardNextBtn.disabled = state.flashcards.currentIndex === deck.length - 1;
  }

  function flipCard() {
    state.flashcards.isFlipped = !state.flashcards.isFlipped;
    elements.flashcardInner.classList.toggle('flipped', state.flashcards.isFlipped);
  }

  elements.flashcardInner.addEventListener('click', flipCard);
  elements.flashcardFlipBtn.addEventListener('click', flipCard);

  elements.flashcardPrevBtn.addEventListener('click', () => {
    if (state.flashcards.currentIndex > 0) {
      state.flashcards.currentIndex--;
      renderCurrentFlashcard();
    }
  });

  elements.flashcardNextBtn.addEventListener('click', () => {
    if (state.flashcards.currentIndex < state.flashcards.deck.length - 1) {
      state.flashcards.currentIndex++;
      renderCurrentFlashcard();
    }
  });

  // ==========================================================================
  // 16. Beautiful PDF Export - Professional AI Revision Sheet Populator
  // ==========================================================================
  function populateRevisionSheet() {
    if (!state.results) return;

    // Header metadata
    const docTitle = elements.resultsTitle.textContent || 'Engineering Mathematics';
    const sheetDocTitle = document.getElementById('sheet-doc-title');
    if (sheetDocTitle) sheetDocTitle.textContent = docTitle;

    const subjectMap = {
      cs: 'Computer Science & Software',
      bio: 'Biology & Medical Sciences',
      eng: 'Engineering Mathematics & Physics',
      business: 'Business, Finance & Economics',
      humanities: 'Law, Humanities & Ethics'
    };
    const sheetSubject = document.getElementById('sheet-subject-val');
    if (sheetSubject) {
      sheetSubject.textContent = subjectMap[state.subject] || state.subject.toUpperCase();
    }

    const modeMap = {
      quick: '📖 Quick Revision',
      exam: '🧠 Exam Preparation',
      lastminute: '🎯 Last-Minute Revision'
    };
    const sheetMode = document.getElementById('sheet-mode-val');
    if (sheetMode) {
      sheetMode.textContent = modeMap[state.studyMode] || '🧠 Exam Preparation';
    }

    const sheetDate = document.getElementById('sheet-date-val');
    if (sheetDate) {
      const now = new Date();
      sheetDate.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // TL;DR Executive Summary
    const sheetTldr = document.getElementById('sheet-tldr-text');
    if (sheetTldr) {
      sheetTldr.textContent = state.results.tldr || 'High-yield conceptual summary generated by StudyFlow AI.';
    }

    // 1. ⭐ KEY CONCEPTS
    const conceptsContainer = document.getElementById('sheet-concepts-list');
    if (conceptsContainer) {
      conceptsContainer.innerHTML = '';
      const concepts = state.results.keyConcepts || [];
      if (concepts.length > 0) {
        concepts.forEach(c => {
          const item = document.createElement('div');
          item.className = 'sheet-bullet-item';
          const firstPoint = (c.points && c.points.length > 0) ? c.points[0] : '';
          item.innerHTML = `<strong>${c.title}:</strong> ${firstPoint}`;
          conceptsContainer.appendChild(item);
          if (c.points && c.points.length > 1) {
            const item2 = document.createElement('div');
            item2.className = 'sheet-bullet-item';
            item2.innerHTML = `${c.points[1]}`;
            conceptsContainer.appendChild(item2);
          }
        });
      } else {
        conceptsContainer.innerHTML = '<div class="sheet-bullet-item">Core theoretical principles synthesized for immediate active recall.</div>';
      }
    }

    // 2. 📌 DEFINITIONS
    const defsContainer = document.getElementById('sheet-definitions-list');
    if (defsContainer) {
      defsContainer.innerHTML = '';
      const defCallouts = (state.results.callouts || []).filter(c => c.type === 'definition');
      const flashcards = state.results.flashcards || [];

      if (defCallouts.length > 0) {
        defCallouts.forEach(d => {
          const el = document.createElement('div');
          el.className = 'sheet-def-item';
          el.innerHTML = `<span class="sheet-def-term">${d.title}: </span><span class="sheet-def-desc">${d.content}</span>`;
          defsContainer.appendChild(el);
        });
      }
      
      // Supplement with flashcard definitions if needed
      if (defsContainer.children.length < 3 && flashcards.length > 0) {
        flashcards.slice(0, 3 - defsContainer.children.length).forEach(fc => {
          const el = document.createElement('div');
          el.className = 'sheet-def-item';
          el.innerHTML = `<span class="sheet-def-term">${fc.term}: </span><span class="sheet-def-desc">${fc.def}</span>`;
          defsContainer.appendChild(el);
        });
      }
    }

    // 3. 🧮 IMPORTANT FORMULAS
    const formulasContainer = document.getElementById('sheet-formulas-list');
    if (formulasContainer) {
      formulasContainer.innerHTML = '';
      const formulaCallouts = (state.results.callouts || []).filter(c => c.type === 'formula');
      
      if (formulaCallouts.length > 0) {
        formulaCallouts.forEach(f => {
          const el = document.createElement('div');
          el.className = 'sheet-formula-box';
          el.innerHTML = `
            <div class="sheet-formula-title">${f.title}</div>
            <div class="sheet-formula-code">${f.content}</div>
          `;
          formulasContainer.appendChild(el);
        });
      } else {
        // Fallback for domains without explicit formula callout
        const el = document.createElement('div');
        el.className = 'sheet-formula-box';
        el.innerHTML = `
          <div class="sheet-formula-title">Core Governing Principle & Efficiency Relation</div>
          <div class="sheet-formula-code">T(n) = O(log n) • Efficiency η = (Useful Output) / (Total Energy Input)</div>
        `;
        formulasContainer.appendChild(el);
      }
    }

    // 4. 🎯 EXAM FOCUS
    const examContainer = document.getElementById('sheet-exam-list');
    if (examContainer) {
      examContainer.innerHTML = '';
      const warningCallouts = (state.results.callouts || []).filter(c => c.type === 'warning');
      const checklist = state.results.checklist || [];

      if (warningCallouts.length > 0) {
        warningCallouts.forEach(w => {
          const el = document.createElement('div');
          el.className = 'sheet-trap-box';
          el.innerHTML = `<strong>⚠️ ${w.title}:</strong> ${w.content}`;
          examContainer.appendChild(el);
        });
      }

      // Add high-yield Cornell recall check questions
      if (checklist.length > 0) {
        checklist.slice(0, 3).forEach((item, idx) => {
          const el = document.createElement('div');
          el.className = 'sheet-bullet-item';
          el.innerHTML = `<strong>Focus Q${idx + 1}:</strong> ${item}`;
          examContainer.appendChild(el);
        });
      }
    }
  }

  // ==========================================================================
  // Export & Sharing (Bonus Criteria)
  // ==========================================================================
  elements.exportTriggerBtn.addEventListener('click', () => {
    elements.exportModal.classList.add('active');
  });

  elements.closeExportBtn.addEventListener('click', () => {
    elements.exportModal.classList.remove('active');
  });

  // Export: PDF Print (Professional AI Revision Sheet)
  elements.exportPdfBtn.addEventListener('click', () => {
    populateRevisionSheet();
    elements.exportModal.classList.remove('active');
    showToast('Preparing AI Revision Sheet PDF...', 'info');
    setTimeout(() => {
      window.print();
    }, 280);
  });

  // Export: Markdown (.md)
  elements.exportMdBtn.addEventListener('click', () => {
    if (!state.results) return;
    const docTitle = elements.resultsTitle.textContent;
    let md = `# ${docTitle}\n*Generated by StudyFlow AI (Google for Developers x Hack2Skill x Android Club, VIT Bhopal)*\n\n`;
    md += `## TL;DR Summary\n${state.results.tldr}\n\n`;
    md += `## Key Concepts & Revision Notes\n`;
    (state.results.keyConcepts || []).forEach(kc => {
      md += `\n### ${kc.title}\n`;
      (kc.points || []).forEach(pt => md += `- ${pt}\n`);
    });
    md += `\n## High-Yield Callouts\n`;
    (state.results.callouts || []).forEach(co => {
      md += `> **${co.title}** (${co.type})\n> ${co.content}\n\n`;
    });
    md += `\n## Cornell Active Recall Checklist\n`;
    (state.results.checklist || []).forEach(cl => {
      md += `- [ ] ${cl}\n`;
    });
    md += `\n## Practice Quiz Questions\n`;
    (state.results.quiz || []).forEach((q, idx) => {
      md += `\n**Q${idx + 1}: ${q.question}**\n`;
      q.options.forEach((opt, oIdx) => {
        md += `  ${String.fromCharCode(65 + oIdx)}. ${opt}\n`;
      });
      md += `*Correct Answer: ${String.fromCharCode(65 + q.correctIndex)}*\n*Explanation: ${q.explanation}*\n`;
    });

    downloadBlob(md, `${docTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_notes.md`, 'text/markdown');
    elements.exportModal.classList.remove('active');
    showToast('Downloaded Markdown revision notes!', 'success');
  });

  // Export: Quiz JSON
  elements.exportJsonBtn.addEventListener('click', () => {
    if (!state.results || !state.results.quiz) return;
    const jsonStr = JSON.stringify({
      title: elements.resultsTitle.textContent,
      exportedAt: new Date().toISOString(),
      quiz: state.results.quiz
    }, null, 2);
    downloadBlob(jsonStr, `quiz_${Date.now()}.json`, 'application/json');
    elements.exportModal.classList.remove('active');
    showToast('Downloaded Quiz JSON!', 'success');
  });

  // Export: Copy to Clipboard
  elements.exportCopyBtn.addEventListener('click', async () => {
    if (!state.results) return;
    const summaryText = `📚 ${elements.resultsTitle.textContent}\n\nSummary:\n${state.results.tldr}\n\nKey Concepts:\n${(state.results.keyConcepts || []).map(k => '• ' + k.title).join('\n')}\n\nGenerated with StudyFlow AI`;
    try {
      await navigator.clipboard.writeText(summaryText);
      elements.exportModal.classList.remove('active');
      showToast('Summary copied to clipboard!', 'success');
    } catch (e) {
      showToast('Clipboard access denied.', 'error');
    }
  });

  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ==========================================================================
  // Settings Modal (Google Gemini API Key)
  // ==========================================================================
  elements.openSettingsBtn.addEventListener('click', () => {
    elements.settingsModal.classList.add('active');
  });

  elements.closeSettingsBtn.addEventListener('click', () => {
    elements.settingsModal.classList.remove('active');
  });

  elements.saveKeyBtn.addEventListener('click', () => {
    const key = elements.geminiKeyInput.value.trim();
    if (key) {
      localStorage.setItem('studyflow_gemini_key', key);
      updateEngineBadge(true);
      showToast('Google Gemini API Key saved!', 'success');
    } else {
      localStorage.removeItem('studyflow_gemini_key');
      updateEngineBadge(false);
      showToast('API Key cleared. Using built-in engine.', 'info');
    }
    elements.settingsModal.classList.remove('active');
  });

  elements.clearKeyBtn.addEventListener('click', () => {
    elements.geminiKeyInput.value = '';
    localStorage.removeItem('studyflow_gemini_key');
    updateEngineBadge(false);
    showToast('API Key removed. Switched to offline intelligent engine.', 'info');
    elements.settingsModal.classList.remove('active');
  });

  // ==========================================================================
  // Animated Background: Stars & Cosmic Particles
  // ==========================================================================
  function initStarsCanvas() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const starCount = Math.min(110, Math.max(60, Math.floor(width / 14)));
    const stars = [];

    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(192, 132, 252, ', // purple
      'rgba(56, 189, 248, ',  // sky
      'rgba(165, 180, 252, '  // indigo
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.45 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        vy: -(Math.random() * 0.22 + 0.05),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let tick = 0;

    function renderStars() {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      stars.forEach(star => {
        star.y += star.vy;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        const alpha = Math.max(
          0.05,
          Math.min(1, star.baseAlpha + Math.sin(tick * star.twinkleSpeed + star.twinklePhase) * 0.35)
        );

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color + alpha + ')';
        if (star.radius > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(192, 132, 252, 0.7)';
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      requestAnimationFrame(renderStars);
    }

    renderStars();
  }

  initStarsCanvas();

  // Auto-preload default academic preset so the user can immediately synthesize or test
  loadPreset('physics');
});
