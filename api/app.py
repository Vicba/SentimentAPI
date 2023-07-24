from flask import Flask, jsonify, request
from middleware import check_auth_token, add_cors_headers
from prisma import Prisma, register, Client


app = Flask(__name__)


app.before_request(check_auth_token)
# USAGE OF uWSGI ?????????????????????


## binary sentiment endpoints
@app.route("/binary-sentiment", methods=["POST"])
def binary_sentiment():
    request_data = request.get_json()
    text = request_data["text"]

    return jsonify({"text": text, "sentiment": "positive"})


## binary sentiment endpoints
@app.route("/fine-grained-sentiment", methods=["POST"])
def fine_grained():
    request_data = request.get_json()
    text = request_data["text"]

    return jsonify({"text": text, "sentiment": "neutral"})


## Emotions endpoints


# get emotions
@app.route("/get-all-emotions", methods=["GET"])
def get_emotions():
    return jsonify(
        {"emotions": ["happy", "sad", "angry", "fearful", "disgusted", "surprised"]}
    )


# get emotions from text
@app.route("/get-emotions", methods=["POST"])
def get_emotions_from_text():
    request_data = request.get_json()
    text = request_data["text"]

    return jsonify(
        {
            "text": text,
            "emotions": [
                {"sentiment": "happy", "score": 0.9},
                {"sentiment": "sad", "score": 0.1},
            ],
        }
    )


if __name__ == "__main__":
    app.run(port=8080, debug=True)
