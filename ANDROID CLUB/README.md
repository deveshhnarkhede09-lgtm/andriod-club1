# StudyFlow.ai ⚡

> **AI-Powered Student Revision & Practice Workspace**  
> *Built for Google for Developers × Hack2Skill × Android Club, VIT Bhopal (Track 01: AI Productivity & Automation)*

---

## 🌟 Overview

StudyFlow AI transforms complex lecture notes, PDFs, and syllabus topics into:
- **Concise Executive Summaries & Cheat Sheets**
- **Formula & Definition Extractors**
- **Exam-Style Practice Quizzes** with distractor explanations and real-time grading
- **Interactive Active-Recall Flashcards**
- **Study Timers & Focus Audio Ambient Generators**

Equipped with a dual-engine architecture:
1. **Google Gemini 1.5 Flash**: High-speed generative AI processing.
2. **Local Intelligent NLP Synthesizer**: Fallback engine that works 100% offline with zero external API dependencies.

---

## 🚀 Quickstart: Running Locally with Flask

### Prerequisites
- Python 3.9+ installed (`python --version`)
- Git installed

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. (Optional) Configure Gemini API Key
You can provide your Gemini key in the web UI settings modal, or set it in your environment:
```bash
# Windows PowerShell
$env:GEMINI_API_KEY="your_actual_gemini_api_key_here"

# Linux / macOS / Git Bash
export GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

### 3. Run the Flask Application
```bash
python app.py
```
Open your browser and navigate to:
👉 **[http://localhost:5000](http://localhost:5000)**

Health check endpoint:
👉 **[http://localhost:5000/api/health](http://localhost:5000/api/health)**

---

## 📤 How to Export & Push to GitHub

Git has been initialized on the `main` branch. To link this project to your GitHub account:

### Step 1: Create a New Repository on GitHub
1. Go to [https://github.com/new](https://github.com/new).
2. Set the repository name (e.g., `studyflow-ai` or `android-club-studyflow`).
3. Set visibility to **Public** or **Private**.
4. **Do NOT** check "Initialize with README", .gitignore, or license (these already exist in this project).
5. Click **Create repository**.

### Step 2: Push Your Local Code to GitHub
Copy and run these commands in your PowerShell or terminal:

```powershell
# Set your Git identity (if not already configured)
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Stage all files and create the initial commit
git add .
git commit -m "feat: Initial commit with Flask backend and Vercel deployment configuration"

# Link your remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to the main branch
git branch -M main
git push -u origin main
```

---

## ☁️ How to Deploy on Vercel

This repository is pre-configured with `vercel.json` and `api/index.py` for seamless Vercel Serverless Function deployment.

### Method 1: Deploy via Vercel Web Dashboard (Recommended)
1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and select your `studyflow-ai` repository.
3. In the project setup:
   - **Framework Preset**: Select **Other** (or leave default).
   - **Root Directory**: `./` (leave default).
4. (Optional) Expand **Environment Variables**:
   - Name: `GEMINI_API_KEY`
   - Value: `your_gemini_api_key`
5. Click **Deploy**.
6. In ~30 seconds, your site will be live at `https://your-project.vercel.app`!

### Method 2: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

---

## 📁 Project Structure

```
.
├── api/
│   └── index.py            # Vercel Serverless Python entrypoint
├── assets/
│   └── logo.svg            # App SVG branding & icons
├── css/
│   ├── style.css           # Core styling, variables, theme tokens
│   └── components.css      # Component design system & animations
├── js/
│   ├── ai-engine.js        # Gemini API client & Heuristic NLP engine
│   ├── app.js              # Application controller & state management
│   ├── pdf-reader.js       # In-browser client-side PDF text extraction
│   └── presets.js          # Demo presets (OS, ML, DSA, DBMS)
├── .gitignore              # Ignores temp files, caches, and env files
├── app.py                  # Flask web server & API proxy
├── index.html              # Modern, responsive single-page workspace
├── requirements.txt        # Python dependencies for local & Vercel
├── vercel.json             # Vercel routing & edge asset rules
└── README.md               # Documentation & deployment guide
```

---

## 🛠️ API Reference

- `GET /` : Serves the interactive StudyFlow AI web application.
- `GET /api/health` : Returns JSON status of the Flask backend and runtime environment.
- `POST /api/gemini` : Server-side proxy for Gemini API requests (keeps API keys protected).

---

## 👥 Hackathon Attribution

- **Track**: AI Productivity & Automation
- **Partners**: Google for Developers × Hack2Skill × Android Club, VIT Bhopal
