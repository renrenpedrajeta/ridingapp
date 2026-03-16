# Flask Firebase App

This is a basic Flask application that connects to Google Firebase Firestore database.

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Set up Firebase:
   - Go to the Firebase Console (https://console.firebase.google.com/)
   - Create a new project or select an existing one.
   - Enable Firestore Database.
   - Go to Project Settings > Service Accounts.
   - Generate a new private key and download the JSON file.
   - Place the JSON file in the project directory (e.g., `serviceAccountKey.json`).

3. Update the credentials path in `app.py`:
   - Change `'path/to/your/serviceAccountKey.json'` to the actual path of your service account key file.
   - Alternatively, set the environment variable `FIREBASE_CRED_PATH` to the path.

## Running the App

Run the Flask app:
```
python app.py
```

The app will start on `http://127.0.0.1:5000/`

## API Endpoints

- `GET /`: Home page, confirms connection.
- `GET /add_user`: Adds a sample user to Firestore.
- `GET /get_user/<user_id>`: Retrieves a user by ID from Firestore.

## Troubleshooting

- Ensure the virtual environment is activated.
- Check that the service account key path is correct.
- Make sure Firestore is enabled in your Firebase project.
- If you encounter permission errors, verify the service account has the necessary permissions.