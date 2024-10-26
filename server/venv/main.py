from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from imblearn.over_sampling import SMOTE
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import VotingClassifier
from sklearn.metrics import accuracy_score, classification_report

# Initialize the Flask app
app = Flask(__name__)

# Load the trained model and vectorizer
model = joblib.load('ensemble_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')


# Define a prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data (should be in JSON format)
    data = request.json

    # Ensure the input data contains the key 'text'
    if 'text' not in data:
        return jsonify({"error": "No 'text' key in request data"}), 400

    # Extract the text to classify
    text = data['text']

    # Convert the text into a list if it's a single string
    if isinstance(text, str):
        text = [text]

    # Transform the input text using the loaded vectorizer
    text_tfidf = vectorizer.transform(text)

    # Predict probabilities using the ensemble model
    y_prob_ensemble = model.predict_proba(text_tfidf)

    # Adjust the threshold for class 0 (hate speech)
    threshold = 0.7  # Same as used during training
    y_pred_custom = []

    for prob in y_prob_ensemble:
        if prob[0] > threshold:
            y_pred_custom.append(0)  # Classify as hate speech (class 0)
        else:
            # Choose between class 1 and 2 based on which has the higher probability
            y_pred_custom.append(1 if prob[1] > prob[2] else 2)

    # Return the result as JSON
    return jsonify({"predictions": y_pred_custom})


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
