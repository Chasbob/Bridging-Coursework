from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken

# Create your tests here.

API_BASE = '/api/blog/'

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return str(refresh.access_token)


class BlogTests(APITestCase):
    fixtures = ['fixtures.json']


    def setUp(self):
        # Every test needs a client.
        self.user = User.objects.get_by_natural_key(username='testuser')
        self.token = get_tokens_for_user(user=self.user)
        self.client.credentials()
        # token = Token.objects.get_or_create(user=user)


    def test_get_all_posts(self):
        response = self.client.get(API_BASE, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_add_post(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(API_BASE,data={'author': 1, 'title': 'title', 'text': 'text' })
        self.assertLess(response.status_code, status.HTTP_300_MULTIPLE_CHOICES)
        self.assertEqual(1, len(self.client.get(API_BASE, format='json').json()))


    def test_post_auth(self):
        response = self.client.post(API_BASE, data={'author': 1, 'title': 'title', 'text': 'text'})
        self.assertEqual(response.status_code, 401)


    def test_post_fields_author(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(API_BASE, data={'title': 'title', 'text': 'text'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_post_fields_title(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(API_BASE, data={'author': 1, 'text': 'text'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_post_fields_text(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(API_BASE, data={'author': 1, 'title': 'title'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_post_fields(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(API_BASE, data={'author': 1, 'title': 'title', 'text': 'text'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    
    def test_get_by_pk(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(API_BASE, data={'author': 1, 'title': 'title', 'text': 'text'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        post_resp = response.json()
        self.client.credentials()
        response = self.client.get(f"{API_BASE}{post_resp['id']}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_resp = response.json()
        self.assertTrue(get_resp, post_resp)


    def test_get_by_title(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(API_BASE, data={'author': 1, 'title': 'title', 'text': 'text'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        post_resp = response.json()
        self.client.credentials()
        response = self.client.get(f"{API_BASE}{post_resp['title']}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_resp = response.json()
        self.assertTrue(get_resp, post_resp)

    def test_put_post(self):
        # CREATE post
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        data = {'author': 1, 'title': 'title', 'text': 'text'}
        response = self.client.post(API_BASE, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        post_resp = response.json()

        path = f"{API_BASE}{post_resp['id']}/"
        self.client.credentials()
        # GET post
        response = self.client.get(path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_resp = response.json()
        # compare get and post results
        self.assertTrue(get_resp, post_resp)

        # PUT new data
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        data['title'] = 'new title'
        data['text'] = 'new text'
        response = self.client.put(path, data=data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # GET updated post
        response = self.client.get(path)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_get_resp = response.json()
        self.assertNotEqual(get_resp, new_get_resp)
        self.assertEqual('new title', new_get_resp['title'])
        self.assertEqual('new text', new_get_resp['text'])


    def test_post_invalid_author(self):
        # CREATE post
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        data = {'author': 2, 'title': 'title', 'text': 'text'}
        response = self.client.post(API_BASE, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        post_resp = response.json()


    def test_delete_post(self):
        # CREATE post
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        data = {'author': 1, 'title': 'title', 'text': 'text'}
        response = self.client.post(API_BASE, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        post_resp = response.json()
        post_id = post_resp['id']

        path = f"{API_BASE}{post_id}/"
        # DELETE post
        response = self.client.delete(path)
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        # compare get and post results

        # GET deleted post
        self.client.credentials()
        response = self.client.get(path)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
