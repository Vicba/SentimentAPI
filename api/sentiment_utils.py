
from nltk.corpus import stopwords
import re
from nltk.stem.snowball import SnowballStemmer
import pickle
from transformers import pipeline

# Load the saved binary and fine grained model
with open('../server/binary-fine-grained-sentiment/model/sentiment_model.pkl', 'rb') as f:
    binary_fine_grained_model = pickle.load(f)


# Load the saved label encoder
with open('../server/binary-fine-grained-sentiment/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

# Load the saved count vectorizer
with open('../server/binary-fine-grained-sentiment/count_vectorizer.pkl', 'rb') as f:
    count_vect = pickle.load(f)

# Load the saved tfidf transformer
with open('../server/binary-fine-grained-sentiment/tfidf_transformer.pkl', 'rb') as f:
    tfidf_transformer = pickle.load(f)

emotion_classifier = pipeline("text-classification",model='bhadresh-savani/distilbert-base-uncased-emotion', return_all_scores=True)


def text_sentiment_preprocessing(text, language, minWordLength, model, count_vect, tfidf_transformer, label_encoder):
	preprocessed_text = text_preprocessing(text, language, minWordLength)
	new_text_bag_of_words = count_vect.transform([preprocessed_text])
	new_text_tf = tfidf_transformer.transform(new_text_bag_of_words)

	predicted_sentiment = model.predict(new_text_tf)
	predicted_sentiment_label = label_encoder.inverse_transform(predicted_sentiment)

	predicted_probabilities = model.predict_proba(new_text_tf)
	prediction_amount = predicted_probabilities[0][predicted_sentiment[0]].round(2)

	return predicted_sentiment_label[0], prediction_amount


def text_preprocessing(text, language, minWordSize):
	# remove non-letters
	text = re.sub('[^a-zA-Z]', ' ', text)
	text = text.lower()
	words = text.split()

	# remove stop words
	stop_words = set(stopwords.words(language))
	text_no_stop_words = ' '
	words = [w for w in words if not w in stop_words]
	
	# remove words less than minWordSize
	words = [w for w in words if len(w) >= minWordSize]

	# keep 'not' and 'no' ... in stop words
	whitelist = ["n't", "not", "no"]
	for word in text.split():
		if word not in stop_words or word in whitelist:  
			text_no_stop_words = text_no_stop_words + word + ' '

	# stemming
	text_stemmer = ' '
	stemmer = SnowballStemmer(language)
	for w in text_no_stop_words.split():
		text_stemmer = text_stemmer + stemmer.stem(w) + ' '

	return text_no_stop_words


def get_binary_sentiment(text, language, minWordLength, model, count_vect, tfidf_transformer, label_encoder):
	
	predicted_label, predicted_amount = text_sentiment_preprocessing(text=text, language=language, minWordLength=minWordLength, model=model, count_vect=count_vect, tfidf_transformer=tfidf_transformer, label_encoder=label_encoder)

	result = {
		"text": text,
		"sentiment": predicted_label,
	}

	if predicted_label == "neutral":
		result["sentiment"] = "positive"

	return result

def get_fine_grained_sentiment(text, language, minWordLength, model, count_vect, tfidf_transformer, label_encoder):
	
	predicted_label, predicted_amount = text_sentiment_preprocessing(text=text, language=language, minWordLength=minWordLength, model=model, count_vect=count_vect, tfidf_transformer=tfidf_transformer, label_encoder=label_encoder)

	result = {
		"text": text,
		"sentiment": predicted_label,
		"score": predicted_amount
	}

	return result


def get_emotions(text):
	emotions = []
	
	emotion_prediction = emotion_classifier(text)

	for result in emotion_prediction[0]:
		emotions.append({
			"emotion": result["label"],
			"intensity": round(float(result["score"]), 3)
		})

	return {
        "text": text,
        "emotions": emotions
    }


def get_all_emotions():
	return {
			"emotions": [
				"surprise", "sadness", "joy", "love", "anger", "fear"
			]
	}
