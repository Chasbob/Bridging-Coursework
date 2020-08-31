import os
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.contrib.auth.models import User

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.firefox.webdriver import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By

from time import sleep
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return str(refresh.access_token)

class MySeleniumTests(StaticLiveServerTestCase):
    fixtures = ['fixtures.json']
    selenium: WebDriver

    def do_logout(self):
        try:
            logout_button = self.selenium.find_element_by_name('logout')
            logout_button.click()
        except Exception as e:
            pass
    
    def do_login(self, username='testuser',password='12345'):
        self.selenium.find_element_by_name("login").click()
        username_input = self.selenium.find_element_by_name("username")
        username_input.send_keys(username)
        password_input = self.selenium.find_element_by_name("password")
        password_input.send_keys(password)
        self.selenium.find_element_by_name('login-submit').click()
        sleep(1)


    def setUp(self):
        super().setUp()
        self.user = User.objects.get_by_natural_key(username='testuser')
        self.token = get_tokens_for_user(user=self.user)
        self.selenium.get(f'{self.live_server_url}')
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.options = Options()
        cls.options.set_headless(True)
        if os.getenv('WEBDRIVER_HOST'):
            cls.selenium = webdriver.Remote(
                command_executor=os.getenv('WEBDRIVER_HOST'),
                options=cls.options)
        else:
            cls.selenium = WebDriver(options=cls.options)
        cls.selenium.implicitly_wait(1)
        cls.timeout = 2


    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()
