"""Basic tests for the Flask application."""

import pytest
from app import app


@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_health_endpoint(client):
    """Test the health check endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "healthy"


def test_hello_endpoint(client):
    """Test the hello endpoint."""
    response = client.get("/api/hello")
    assert response.status_code == 200
    data = response.get_json()
    assert "message" in data
    assert data["message"] == "Hello from the API!"
