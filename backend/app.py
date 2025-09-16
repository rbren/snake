from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory storage for high scores (in production, use a database)
high_scores = []


@app.route("/")
def hello_world():
    return jsonify(
        {
            "message": "Snake Game Backend!",
            "status": "success",
            "version": "1.0.0",
        }
    )


@app.route("/api/health")
def health_check():
    return jsonify({"status": "healthy", "service": "Snake Backend"})


@app.route("/api/hello")
def api_hello():
    return jsonify({"message": "Hello from the Snake API!", "endpoint": "/api/hello"})


@app.route("/api/highscores", methods=["GET"])
def get_high_scores():
    """Get top 10 high scores"""
    sorted_scores = sorted(high_scores, key=lambda x: x["score"], reverse=True)
    return jsonify({"highScores": sorted_scores[:10]})


@app.route("/api/highscores", methods=["POST"])
def save_high_score():
    """Save a new high score"""
    try:
        data = request.get_json()

        if not data or "score" not in data:
            return jsonify({"error": "Score is required"}), 400

        score = data["score"]
        player_name = data.get("playerName", "Anonymous")

        if not isinstance(score, int) or score < 0:
            return jsonify({"error": "Invalid score"}), 400

        new_score = {
            "score": score,
            "playerName": player_name,
            "date": datetime.now().isoformat(),
            "id": len(high_scores) + 1,
        }

        high_scores.append(new_score)

        # Keep only top 100 scores to prevent memory issues
        if len(high_scores) > 100:
            sorted_scores = sorted(high_scores, key=lambda x: x["score"], reverse=True)
            high_scores.clear()
            high_scores.extend(sorted_scores[:100])

        # Check if this is a new record (before we added the current score)
        is_new_record = score > 0 and (
            len(high_scores) == 1  # First score ever
            or score >= max(s["score"] for s in high_scores if s["id"] != new_score["id"])
        )

        return (
            jsonify(
                {
                    "message": "High score saved successfully",
                    "score": new_score,
                    "isNewRecord": is_new_record,
                }
            ),
            201,
        )

    except Exception:
        return jsonify({"error": "Failed to save high score"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=False)
