from flask import Flask, request, jsonify
import requests
from __utils.email_utils import connect_to_email, fetch_emails
from __utils.db_mgmt import save_to_database


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


@app.route("/api/scrape-email", methods=["POST"])
def scrape_email():
    try:
        # Get JSON data from request
        data = request.json
        username = data.get("username")
        password = data.get("password")
        imap_server = data.get("imap_server")
        num_emails = data.get("num_emails", 10)  # Default to fetching 10 emails if not provided

        if not username or not password or not imap_server:
            return jsonify({"success": False, "error": "Missing required parameters"}), 400

        # Connect to email
        imap = connect_to_email(username, password, imap_server)

        # Fetch emails
        emails_data = fetch_emails(imap, num_emails)

        # Save raw emails_data to a .txt file for testing
        with open("raw_emails_data.txt", "w", encoding="utf-8") as f:
            f.write(str(emails_data))

        # Save emails to database
        result = save_to_database(emails_data)

        if result["success"]:
            return jsonify({"success": True, "message": result["message"]}), 200
        else:
            return jsonify({"success": False, "error": result["error"]}), 500

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True)

