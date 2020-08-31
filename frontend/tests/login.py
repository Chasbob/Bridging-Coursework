from .base import MySeleniumTests
from selenium.common.exceptions import NoSuchElementException
from time import sleep
from selenium.webdriver.common.by import By
import json

class Login(MySeleniumTests):

    def test_login(self):
        self.do_login(username='testuser',password='12345')
        sleep(1)
        # check that login form has gone
        with self.assertRaises(NoSuchElementException):
            self.selenium.find_element_by_name("username")
        with self.assertRaises(NoSuchElementException):
            self.selenium.find_element_by_name("password")
        # check that login button has gone
        with self.assertRaises(NoSuchElementException):
            self.selenium.find_element_by_name("login")
    
    def test_bad_login(self):
        self.do_logout()
        self.selenium.get(f'{self.live_server_url}')
        self.do_login(username='fakeuser', password='12345')
        with self.assertRaises(NoSuchElementException):
            self.selenium.find_element_by_class_name('is-hidden')



    def test_logout(self):
        # set token to simulate login
        self.selenium.execute_script(f"window.localStorage.setItem('token', '{self.token}');")
        self.selenium.get(f'{self.live_server_url}')
        sleep(5)
        with self.assertRaises(NoSuchElementException):
            self.selenium.find_element_by_name("login")
        logout_button = self.selenium.find_element_by_name('logout')
        logout_button.click()
        with self.assertRaises(NoSuchElementException):
            self.selenium.find_element_by_name("logout")
        self.selenium.find_element_by_name("login")