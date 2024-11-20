# payments/routes.py
from flask import request, jsonify
from app import app
from app.mpesa_integrations import MpesaAPI

@app.route('/initiate-payment', methods=['POST'])
def initiate_payment():
    try:
        data = request.json
        mpesa = MpesaAPI()
        response = mpesa.initiate_stk_push(
            phone_number=data['phone_number'],
            amount=data['amount'],
            reference=data['reference'],
            description=data['description']
        )
        return jsonify({"success": True, "data": response})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/mpesa-callback', methods=['POST'])
def mpesa_callback():
    try:
        callback_data = request.json
        # Process callback data
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400