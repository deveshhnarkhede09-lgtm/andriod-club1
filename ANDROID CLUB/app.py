import os
import sys
import json
import urllib.request
import urllib.error
from flask import Flask, send_from_directory, jsonify, request

# Locate the base directory containing static files and index.html
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if os.path.exists(os.path.join(CURRENT_DIR, "index.html")):
    BASE_DIR = CURRENT_DIR
else:
    BASE_DIR = os.path.abspath(os.path.join(CURRENT_DIR, ".."))

app = Flask(
    __name__,
    static_folder=BASE_DIR,
    static_url_path=""
)

@app.route("/")
def home():
    """Serve the main StudyFlow AI web application."""
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint to verify Flask and serverless deployment status."""
    has_gemini_env = bool(os.environ.get("GEMINI_API_KEY"))
    return jsonify({
        "status": "online",
        "service": "StudyFlow AI Flask Service",
        "environment": "Vercel Serverless" if os.environ.get("VERCEL") else "Local Development",
        "has_server_gemini_key": has_gemini_env,
        "version": "1.0.0"
    })

@app.route("/api/gemini", methods=["POST"])
def proxy_gemini():
    """
    Optional server-side Gemini proxy to keep API keys secure in Vercel environment variables.
    Falls back gracefully if no key is configured on the server.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    req_data = request.get_json(silent=True) or {}
    
    # Allow client-provided key fallback if server has none configured
    if not api_key:
        api_key = req_data.get("apiKey")
        
    if not api_key:
        return jsonify({
            "error": "No Gemini API key available. Provide one in settings or set GEMINI_API_KEY in Vercel environment variables."
        }), 400

    prompt = req_data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "Prompt cannot be empty"}), 400

    model = req_data.get("model", "gemini-1.5-flash")
    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    payload = json.dumps({
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ],
        "generationConfig": {
            "temperature": 0.2,
            "responseMimeType": "application/json"
        }
    }).encode("utf-8")

    try:
        req = urllib.request.Request(
            endpoint,
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return jsonify(data)
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8") if e.fp else str(e)
        return jsonify({"error": f"Gemini API error: {e.code}", "details": err_msg}), e.code
    except Exception as e:
        return jsonify({"error": "Failed to connect to Gemini API", "details": str(e)}), 500

@app.route("/<path:path>")
def serve_static(path):
    """Serve static assets (CSS, JS, SVG, images) with fallback to index.html."""
    target = os.path.join(BASE_DIR, path)
    if os.path.isfile(target):
        return send_from_directory(BASE_DIR, path)
    return send_from_directory(BASE_DIR, "index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"=======================================================")
    print(f" StudyFlow AI - Flask Application Running")
    print(f" URL: http://127.0.0.1:{port} or http://localhost:{port}")
    print(f" Health Check: http://127.0.0.1:{port}/api/health")
    print(f"=======================================================")
    app.run(host="0.0.0.0", port=port, debug=True)
