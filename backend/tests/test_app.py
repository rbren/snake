"""Basic tests for the Snake Game Flask application."""

import pytest
from app import app, high_scores


@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        # Clear high scores before each test
        high_scores.clear()
        yield client


def test_health_endpoint(client):
    """Test the health check endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "healthy"
    assert data["service"] == "Snake Backend"


def test_hello_endpoint(client):
    """Test the hello endpoint."""
    response = client.get("/api/hello")
    assert response.status_code == 200
    data = response.get_json()
    assert "message" in data
    assert data["message"] == "Hello from the Snake API!"


def test_root_endpoint(client):
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "Snake Game Backend!"
    assert data["status"] == "success"
    assert data["version"] == "1.0.0"


def test_get_high_scores_empty(client):
    """Test getting high scores when none exist."""
    response = client.get("/api/highscores")
    assert response.status_code == 200
    data = response.get_json()
    assert data["highScores"] == []


def test_save_high_score(client):
    """Test saving a high score."""
    score_data = {"score": 100, "playerName": "TestPlayer"}
    response = client.post("/api/highscores", json=score_data)
    assert response.status_code == 201
    data = response.get_json()
    assert data["message"] == "High score saved successfully"
    assert data["score"]["score"] == 100
    assert data["score"]["playerName"] == "TestPlayer"
    assert "date" in data["score"]
    assert "id" in data["score"]


def test_save_high_score_anonymous(client):
    """Test saving a high score without player name."""
    score_data = {"score": 50}
    response = client.post("/api/highscores", json=score_data)
    assert response.status_code == 201
    data = response.get_json()
    assert data["score"]["playerName"] == "Anonymous"


def test_save_high_score_invalid_data(client):
    """Test saving high score with invalid data."""
    # Missing score
    response = client.post("/api/highscores", json={})
    assert response.status_code == 400
    data = response.get_json()
    assert data["error"] == "Score is required"

    # Invalid score type
    response = client.post("/api/highscores", json={"score": "invalid"})
    assert response.status_code == 400
    data = response.get_json()
    assert data["error"] == "Invalid score"

    # Negative score
    response = client.post("/api/highscores", json={"score": -10})
    assert response.status_code == 400
    data = response.get_json()
    assert data["error"] == "Invalid score"


def test_get_high_scores_with_data(client):
    """Test getting high scores after saving some."""
    # Save multiple scores
    scores = [
        {"score": 100, "playerName": "Player1"},
        {"score": 200, "playerName": "Player2"},
        {"score": 50, "playerName": "Player3"},
    ]
    
    for score_data in scores:
        client.post("/api/highscores", json=score_data)
    
    # Get high scores
    response = client.get("/api/highscores")
    assert response.status_code == 200
    data = response.get_json()
    
    # Should be sorted by score descending
    high_scores_list = data["highScores"]
    assert len(high_scores_list) == 3
    assert high_scores_list[0]["score"] == 200
    assert high_scores_list[1]["score"] == 100
    assert high_scores_list[2]["score"] == 50


def test_high_scores_limit(client):
    """Test that only top 10 high scores are returned."""
    # Save 15 scores
    for i in range(15):
        score_data = {"score": i * 10, "playerName": f"Player{i}"}
        client.post("/api/highscores", json=score_data)
    
    # Get high scores
    response = client.get("/api/highscores")
    assert response.status_code == 200
    data = response.get_json()
    
    # Should return only top 10
    high_scores_list = data["highScores"]
    assert len(high_scores_list) == 10
    assert high_scores_list[0]["score"] == 140  # Highest score
