from flask import Flask, jsonify, request
from sentiment_utils import get_binary_sentiment, get_fine_grained_sentiment, get_all_emotions, get_emotions, binary_fine_grained_model, count_vect, tfidf_transformer, label_encoder
# from middleware import check_auth_token, add_cors_headers


app = Flask(__name__)

"""
app.before_request(check_auth_token)
app.after_request(add_cors_headers)
# USAGE OF uWSGI ?????????????????????
"""

@app.route("/binary-sentiment", methods=["POST"])
def binary_sentiment():
	text = request.get_json()["text"]
        
	result = get_binary_sentiment(text=text, language="english", minWordLength=2, model=binary_fine_grained_model, count_vect=count_vect, tfidf_transformer=tfidf_transformer, label_encoder=label_encoder)

	return jsonify(result)


@app.route("/fine-grained-sentiment", methods=["POST"])
def fine_grained_sentiment():
	text = request.get_json()["text"]
      
	result = get_fine_grained_sentiment(text=text, language="english", minWordLength=2, model=binary_fine_grained_model, count_vect=count_vect, tfidf_transformer=tfidf_transformer, label_encoder=label_encoder)

	return jsonify(result)


@app.route("/get-emotions", methods=["POST"])
def emotions():
	text = request.get_json()["text"]
	result = get_emotions(text=text)
	return jsonify(result)


@app.route("/get-all-emotions", methods=["GET"])
def all_emotions():
	return jsonify(get_all_emotions())

if __name__ == "__main__":
    app.run(port=8080, debug=True)
