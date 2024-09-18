from flask import Flask, render_template, request, jsonify, Blueprint
from .chat import get_response
import nltk

# Download 'punkt' at app startup if not already downloaded
nltk.download('punkt', quiet=True)
nltk.download('punkt_tab')
chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route("/predict", methods=["POST"])
def predict():
     text = request.get_json().get('message')
     responce = get_response(text)
     message = {"answer": responce}
     return jsonify(message)
 

    
     