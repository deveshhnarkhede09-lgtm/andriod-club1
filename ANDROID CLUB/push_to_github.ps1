# StudyFlow AI - Quick GitHub Push Helper Script
param(
    [string]$RepoUrl = ""
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   StudyFlow AI - Export to GitHub Helper Script          " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Ensure git is in PATH for this session
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Git is not found in PATH." -ForegroundColor Red
    Exit 1
}

# Check git user configuration
$userName = git config user.name
$userEmail = git config user.email

if (-not $userName) {
    $inputName = Read-Host "Enter your Git Name (e.g. Devesh)"
    if ($inputName) {
        git config user.name "$inputName"
    } else {
        git config user.name "Devesh"
    }
}

if (-not $userEmail) {
    $inputEmail = Read-Host "Enter your GitHub Email (e.g. devesh@example.com)"
    if ($inputEmail) {
        git config user.email "$inputEmail"
    } else {
        git config user.email "devesh@users.noreply.github.com"
    }
}

# Add all files
Write-Host "`nStaging files for commit..." -ForegroundColor Yellow
git add .

# Check if commit is needed
$status = git status --porcelain
if ($status) {
    git commit -m "feat: setup Flask backend, GitHub export, and Vercel serverless deployment"
    Write-Host "Committed changes to 'main' branch successfully!" -ForegroundColor Green
} else {
    Write-Host "Working tree clean. Nothing to commit." -ForegroundColor Green
}

# Ask for Remote URL if not provided
if (-not $RepoUrl) {
    Write-Host "`nTo push to GitHub, please create a new empty repository at https://github.com/new" -ForegroundColor Cyan
    $RepoUrl = Read-Host "Enter your GitHub Repository URL (e.g. https://github.com/USERNAME/REPO.git)"
}

if ($RepoUrl) {
    # Remove origin if it already exists
    git remote remove origin 2>$null
    git remote add origin $RepoUrl
    Write-Host "Remote 'origin' set to: $RepoUrl" -ForegroundColor Green
    
    Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
    git branch -M main
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nSUCCESS! Your project has been exported to GitHub!" -ForegroundColor Green
        Write-Host "You can now import it directly on Vercel at: https://vercel.com/new" -ForegroundColor Cyan
    } else {
        Write-Host "`nPush failed. Check your GitHub authentication or repository permissions." -ForegroundColor Red
    }
} else {
    Write-Host "`nNo repository URL provided. When ready, run:" -ForegroundColor Yellow
    Write-Host "  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    Write-Host "  git push -u origin main"
}
