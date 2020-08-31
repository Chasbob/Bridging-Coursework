import json
from django.test import TestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return str(refresh.access_token)

# Create your tests here.

class CVTest(TestCase):
    fixtures = ['fixtures.json']

    def login(self, client):
        client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

    def setUp(self):
        self.user = User.objects.get_by_natural_key(username='testuser')
        self.token = get_tokens_for_user(user=self.user)


    def test_get_types(self):
        client = APIClient()
        resp = client.get('/api/cv/types/')
        expected = [{'id': 1, 'name': 'Education'}, {'id': 2, 'name': 'Projects'}, {'id': 3, 'name': 'Work'}, {'id': 4, 'name': 'Volunteering'}]
        self.assertEqual(expected, resp.json())

    
    def test_get_empty(self):
        client = APIClient()
        resp = client.get(f"/api/cv/")
        content = json.loads(resp.content)
        self.assertEqual(len(content), 0)

    def test_create(self):
        client = APIClient()
        # login
        self.login(client)
        # post valid cv item
        resp = client.post(f"/api/cv/", {'title': 'title', 'icon': 'icon', 'location': 'location', 'description': 'description', 'category': 1}, format="json")
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        resp_json = resp.json()
        self.assertIn("id", resp_json)

        # clear login
        client.credentials()

        resp = client.get(f"/api/cv/")
        post_list = resp.json()
        self.assertEqual(len(post_list), 1)

        resp = client.get(f"/api/cv/{resp_json['id']}/")
        content = resp.json()
        self.assertIn("id", content)
        self.assertEqual(content, resp_json)

    def test_create_invalid_cat(self):
        client = APIClient()
        # login
        self.login(client)
        # post valid cv item
        resp = client.post(f"/api/cv/", {'title': 'title', 'icon': 'icon', 'location': 'location', 'description': 'description', 'category': 5}, format="json")
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_remove(self):
        client = APIClient()
        # login
        self.login(client)
        # post valid cv item
        resp = client.post(f"/api/cv/", {'title': 'title', 'icon': 'icon', 'location': 'location', 'description': 'description', 'category': 1}, format="json")
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        resp_json = resp.json()
        self.assertIn("id", resp_json)

        # clear login
        client.credentials()

        resp = client.get(f"/api/cv/")
        post_list = resp.json()
        self.assertEqual(len(post_list), 1)

        resp = client.get(f"/api/cv/{resp_json['id']}/")
        content = resp.json()
        self.assertIn("id", content)
        self.assertEqual(content, resp_json)

        self.login(client)
        rm_resp = client.delete(f"/api/cv/{resp_json['id']}/")
        self.assertEqual(rm_resp.status_code, status.HTTP_202_ACCEPTED)

    def test_put_item(self):
        client = APIClient()
        # login
        self.login(client)
        # post valid cv item
        resp = client.post(f"/api/cv/", {'title': 'title', 'icon': 'icon', 'location': 'location', 'description': 'description', 'category': 1}, format="json")
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        resp_json = resp.json()
        self.assertIn("id", resp_json)

        # clear login
        client.credentials()

        resp = client.get(f"/api/cv/")
        post_list = resp.json()
        self.assertEqual(len(post_list), 1)

        resp = client.get(f"/api/cv/{resp_json['id']}/")
        content = resp.json()
        self.assertIn("id", content)
        self.assertEqual(content, resp_json)

        # update the title and PUT the new data
        self.login(client)
        new_content = content
        new_content['title'] = 'new title'
        put_resp = client.put(f"/api/cv/{content['id']}/", new_content, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        # GET the new data and check it has changed
        resp = client.get(f"/api/cv/{resp_json['id']}/")
        new_content = resp.json()
        self.assertIn("id", new_content)
        self.assertNotEqual(content, resp_json)


