#mpesa_integrations.py
import requests
import base64
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

class MpesaAPI:
    def __init__(self):
        self.consumer_key = os.getenv('MPESA_CONSUMER_KEY')
        self.consumer_secret = os.getenv('MPESA_CONSUMER_SECRET')
        self.passkey = os.getenv('MPESA_PASSKEY')
        self.shortcode = os.getenv('MPESA_SHORTCODE')
        self.base_url = "https://sandbox.safaricom.co.ke"
        self.access_token = self.generate_access_token()
    
    def generate_access_token(self):
        """Generate OAuth access token"""
        try:
            auth = base64.b64encode(f"{self.consumer_key}:{self.consumer_secret}".encode()).decode()
            headers = {'Authorization': f'Basic {auth}'}
            
            response = requests.get(
                f"{self.base_url}/oauth/v1/generate?grant_type=client_credentials",
                headers=headers
            )
            
            if response.status_code == 200:
                return response.json()['access_token']
            else:
                raise Exception(f"Error generating access token: {response.text}")
                
        except Exception as e:
            raise Exception(f"Failed to generate access token: {str(e)}")

    def generate_password(self):
        """Generate password for the STK push"""
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        password_str = f"{self.shortcode}{self.passkey}{timestamp}"
        password = base64.b64encode(password_str.encode()).decode()
        return password, timestamp

    def initiate_stk_push(self, phone_number, amount, reference, description):
        """Initiate STK push payment"""
        try:
            password, timestamp = self.generate_password()
            
            headers = {
                'Authorization': f'Bearer {self.access_token}',
                'Content-Type': 'application/json'
            }
            
            payload = {
                "BusinessShortCode": self.shortcode,
                "Password": password,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": int(amount),
                "PartyA": phone_number,  # Customer phone number
                "PartyB": self.shortcode,
                "PhoneNumber": phone_number,
                "CallBackURL": "https://your-domain.com/mpesa/callback",  # Replace with your callback URL
                "AccountReference": reference,
                "TransactionDesc": description
            }
            
            response = requests.post(
                f"{self.base_url}/mpesa/stkpush/v1/processrequest",
                json=payload,
                headers=headers
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(f"STK push failed: {response.text}")
                
        except Exception as e:
            raise Exception(f"Failed to initiate STK push: {str(e)}")

    def check_payment_status(self, checkout_request_id):
        """Check the status of a payment"""
        try:
            password, timestamp = self.generate_password()
            
            headers = {
                'Authorization': f'Bearer {self.access_token}',
                'Content-Type': 'application/json'
            }
            
            payload = {
                "BusinessShortCode": self.shortcode,
                "Password": password,
                "Timestamp": timestamp,
                "CheckoutRequestID": checkout_request_id
            }
            
            response = requests.post(
                f"{self.base_url}/mpesa/stkpushquery/v1/query",
                json=payload,
                headers=headers
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(f"Status check failed: {response.text}")
                
        except Exception as e:
            raise Exception(f"Failed to check payment status: {str(e)}")

# Example usage in your Flask/Django/FastAPI application:
def process_payment_view(request):
    try:
        mpesa = MpesaAPI()
        
        # Get these values from your request/form
        phone_number = "254XXXXXXXXX"  # Must be in format 254XXXXXXXXX
        amount = 1000  # Amount in Kenyan Shillings
        reference = "ORDER123"  # Your unique order reference
        description = "Payment for Order 123"
        
        response = mpesa.initiate_stk_push(
            phone_number=phone_number,
            amount=amount,
            reference=reference,
            description=description
        )
        
        # Store the CheckoutRequestID for later status check
        checkout_request_id = response.get('CheckoutRequestID')
        
        return {"success": True, "message": "STK push initiated", "data": response}
        
    except Exception as e:
        return {"success": False, "message": str(e)}

# Callback handler example
def mpesa_callback_view(request):
    """Handle M-Pesa callback"""
    try:
        # Get the callback data
        callback_data = request.json()
        
        # Process the callback data
        # Example: Update your order status, database records, etc.
        
        return {"success": True}
        
    except Exception as e:
        return {"success": False, "message": str(e)}