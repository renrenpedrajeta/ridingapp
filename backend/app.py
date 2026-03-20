from flask import Flask, request, jsonify
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

# =========================
# ✅ ADD USER
# =========================
@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json

    user_data = {
        "name": data.get("name"),
        "email": data.get("email"),
        "id": data.get("id"),
        "password": data.get("password"),
        "phone": data.get("phone"),
        "age": data.get("age"),
        "role": data.get("role"),
        "token": data.get("token")
    }

    # 🔥 Auto-generate ID
    user_ref = db.collection("users").add(user_data)
    user_doc_id = user_ref[1].id  # THIS is the real ID

    # ✅ Add riderDetails using generated ID
    if data.get("role") == "rider":
        rider_data = {
            "riderLicenseNumber": data.get("riderLicenseNumber"),
            "riderVehicle": data.get("riderVehicle"),
            "riderVerificationStatus": data.get("riderVerificationStatus"),
            "riderlicensePlate": data.get("riderlicensePlate")
        }

        db.collection("users") \
          .document(user_doc_id) \
          .collection("riderDetails") \
          .document("riderDetails") \
          .set(rider_data)

    return jsonify({
        "message": "User added successfully",
        "userId": user_doc_id  # return this to frontend
    })


# =========================
# ✏️ EDIT USER
# =========================
def edit_user():
    data = request.json
    user_id = data.get("userId")

    user_ref = db.collection("users").document(user_id)

    user_ref.update({
        "name": data.get("name"),
        "email": data.get("email"),
        "id": data.get("id"),
        "password": data.get("password"),
        "phone": data.get("phone"),
        "age": data.get("age"),
        "token": data.get("token"),
    })

    if data.get("role") == "rider":
        user_ref.collection("riderDetails") \
            .document("riderDetails") \
            .set({
                "riderLicenseNumber": data.get("riderLicenseNumber"),
                "riderVehicle": data.get("riderVehicle"),
                "riderVerificationStatus": data.get("riderVerificationStatus"),
                "riderlicensePlate": data.get("riderlicensePlate")
            }, merge=True)

    return jsonify({"message": "User updated"})


# =========================
# ❌ DELETE USER
# =========================
@app.route('/delete_user', methods=['POST'])
def delete_user():
    data = request.json
    user_id = data.get("userId")

    user_ref = db.collection("users").document(user_id)

    # delete subcollection
    rider_docs = user_ref.collection("riderDetails").stream()
    for doc in rider_docs:
        doc.reference.delete()

    user_ref.delete()

    return jsonify({"message": "User deleted"})





# @app.route('/add_user', methods=['POST'])
# def add_user():
#     # Add a sample user to Firestore
#     doc_ref = db.collection('users').document('sample_user')
#     doc_ref.set({
#         'name': 'Sample User',
#         'email': 'sample@example.com',
#         'age': 25
#     })
#     return "Sample user added to Firestore"

# deliveryFee
# 0
# (double)


# serviceFee
# 0
# (double)


# subTotal
# 0
# (double)


# total


@app.route('/add_order', methods=['POST'])
def order():
    data = request.json

    user_data = {
        "deliveryFee": data.get("deliveryFee"),
        "serviceFee": data.get("serviceFee"),
        "subTotal": data.get("subTotal"),
        "total": data.get("total")
    }

    # 🔥 Auto-generate ID
    user_ref = db.collection("customer_transaction").add(user_data)
    user_doc_id = user_ref[1].id  # THIS is the real ID

    return jsonify({
        "message": "Order added successfully",
        "userId": user_doc_id  # return this to frontend
    })

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