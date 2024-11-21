import unittest
from app import create_app, db

class AuthTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()

    def test_signup(self):
        response = self.client.post('/auth/signup', json={"username": "test", "email": "test@example.com", "password": "password"})
        self.assertEqual(response.status_code, 201)

    def test_login(self):
        self.client.post('/auth/signup', json={"username": "test", "email": "test@example.com", "password": "password"})
        response = self.client.post('/auth/login', json={"email": "test@example.com", "password": "password"})
        self.assertEqual(response.status_code, 200)
