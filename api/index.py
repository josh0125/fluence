from flask import Flask
import requests
from flask import jsonify

app = Flask(__name__)


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/api/python/secret")
def secret():
    return "<p>Shhh! This is a surprise!</p>"


@app.route("/api/test-api", methods=["GET"])
def test_api():
    # Using JSONPlaceholder API for testing
    url = "https://jsonplaceholder.typicode.com/posts/1"
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify({"success": True, "data": response.json()})
    else:
        return jsonify({"success": False, "error": "Failed to access API"}), response.status_code
