from flask import Flask
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Firebase
# Replace 'path/to/your/serviceAccountKey.json' with the actual path to your Firebase service account key


# import firebase_admin
# from firebase_admin import credentials

# cred = credentials.Certificate("path/to/serviceAccountKey.json")
# firebase_admin.initialize_app(cred)

cred_path = os.getenv('FIREBASE_CRED_PATH', 'serviceAccountKey.json')
cred = credentials.Certificate(cred_path)
initialize_app(cred)

db = firestore.client()

@app.route('/')
def home():
    return "Flask app connected to Firebase Firestore!"

@app.route('/add_user', methods=['POST'])
def add_user():
    # Add a sample user to Firestore
    doc_ref = db.collection('users').document('sample_user')
    doc_ref.set({
        'name': 'Sample User',
        'email': 'sample@example.com',
        'age': 25
    })
    return "Sample user added to Firestore"

@app.route('/get_user/<user_id>')
def get_user(user_id):
    # Retrieve a user from Firestore
    doc = db.collection('users').document(user_id).get()
    if doc.exists:
        return str(doc.to_dict())
    else:
        return "User not found", 404

if __name__ == '__main__':
    app.run(debug=True)