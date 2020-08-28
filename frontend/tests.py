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
class MySeleniumTests(StaticLiveServerTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        options = Options()
        options.set_headless(True)
        if os.getenv('WEBDRIVER_HOST'):
            cls.selenium = webdriver.Remote(
                command_executor=os.getenv('WEBDRIVER_HOST'),
                options=options)
        else:
            cls.selenium = WebDriver(options=options)
        cls.selenium.implicitly_wait(10)
        cls.timeout = 2
        user = User.objects.create(username='testuser')
        user.set_password('12345')
        user.save()


    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()

    def do_logout(self):
        try:
            logout_button = self.selenium.find_element_by_name('logout')
            logout_button.click()
        except Exception as e:
            pass


    def do_login(self):
        self.selenium.find_element_by_name("login").click()
        username_input = self.selenium.find_element_by_name("username")
        username_input.send_keys('testuser')
        password_input = self.selenium.find_element_by_name("password")
        password_input.send_keys('12345')
        self.selenium.find_element_by_name('login-submit').click()


    def create_new_post(self, title, text):
        title_input = self.selenium.find_element_by_name("title")
        title_input.send_keys(title)
        text_input = self.selenium.find_element_by_name("text")
        text_input.send_keys(text)
        self.selenium.find_element_by_name('post-submit').click()


    def test_login(self):
        self.do_login()

        logout_button = self.selenium.find_element_by_name('logout')
        self.assertIsNotNone(logout_button)


    def test_admin_access(self):
        self.selenium.get(f'{self.live_server_url}/admin/blog')
        self.assertNotEqual(self.selenium.title, 'Important Things - Admin: Blog')

        self.do_login()

        self.selenium.get(f'{self.live_server_url}/admin/blog')
        self.assertEqual(self.selenium.title, 'Important Things - Admin: Blog')


    def test_get_blog(self):
        self.selenium.get(f'{self.live_server_url}/blog')
        self.assertEqual(self.selenium.title, 'Important Things - Blog')


    def test_get_cv(self):
        self.selenium.get(f'{self.live_server_url}/cv')
        self.assertEqual(self.selenium.title, 'Important Things - CV')

    def test_add_post(self):
        self.selenium.get(f'{self.live_server_url}')
        self.do_login()

        self.selenium.get(f'{self.live_server_url}/admin/blog')
        self.selenium.find_element_by_name('post-new').click()
        self.create_new_post(title='title', text='text')
        title = self.selenium.find_element(By.XPATH, '//p[@class="card-header-title"]')
        self.assertEqual(title.text, 'title')
