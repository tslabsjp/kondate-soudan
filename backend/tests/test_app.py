import unittest
from app import app


class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_index(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn("ようこそ", response.get_json()["message"])

    def test_recipe(self):
        response = self.app.get('/api/recipe')
        self.assertEqual(response.status_code, 200)
        self.assertIn("menu", response.get_json())

if __name__ == '__main__':
    unittest.main()
