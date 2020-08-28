from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.firefox.webdriver import Options
from django.contrib.auth.models import User

class MySeleniumTests(StaticLiveServerTestCase):

    def setUp(self):
        user = User.objects.create(username='testuser')
        user.set_password('12345')
        user.save()
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        options = Options()
        options.set_headless(True)
        cls.selenium = WebDriver()
        cls.selenium.implicitly_wait(10)

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()

    def test_login(self):
        self.selenium.get(f'{self.live_server_url}/')
        self.selenium.find_element_by_name("login").click()
        username_input = self.selenium.find_element_by_name("username")
        username_input.send_keys('testuser')
        password_input = self.selenium.find_element_by_name("password")
        password_input.send_keys('12345')
        self.selenium.find_element_by_name('login-submit').click()
        logout_button = self.selenium.find_element_by_name('logout')
        self.assertIsNotNone(logout_button)
