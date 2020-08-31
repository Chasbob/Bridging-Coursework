from .base import MySeleniumTests
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.webelement import FirefoxWebElement
from time import sleep
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class CVTest(MySeleniumTests):


    def create_new_cv_item(self, title, description, location):
        self.selenium.find_element_by_name('item-new').click()
        title_input = self.selenium.find_element(By.XPATH, '//input[@name="title"]')
        title_input.send_keys(title)
        description_input = self.selenium.find_element(By.XPATH, '//textarea[@name="description"]')
        description_input.send_keys(description)
        location_input = self.selenium.find_element(By.XPATH, '//input[@name="location"]')
        location_input.send_keys(description)
        self.selenium.find_element_by_name('item-submit').click()


    # get the cv index
    def test_get_cv_item(self):
        self.selenium.get(f'{self.live_server_url}/cv/')
        self.assertTrue(self.selenium.title, 'Important Things - CV')


    # add a cv post
    def test_add_cv_item(self):
        # login 
        self.do_login()
        self.selenium.get(f'{self.live_server_url}/admin/cv/')
        self.assertTrue(self.selenium.title, 'Important Things - Admin: CV')
        self.create_new_cv_item(title='Title', description='nothing', location='here')
        # find link to view new post
        self.do_logout()
        self.selenium.get(f'{self.live_server_url}/cv/')
        self.assertTrue(self.selenium.title, 'Important Things - CV')
        title = self.selenium.find_element_by_class_name('card-header-title')
        self.assertEqual('Title', title.text)


    # edit a cv post
    def test_edit_cv_item(self):
        self.do_login()
        self.selenium.get(f'{self.live_server_url}/admin/cv/')
        self.assertTrue(self.selenium.title, 'Important Things - Admin: cv')
        self.create_new_cv_item(title='Title', description='nothing', location='here')
        # find link to view new post
        self.selenium.get(f'{self.live_server_url}/admin/cv/')
        self.selenium.find_element_by_xpath('//div[@class="grid-item"]//a[contains(text(), "Edit")]').click()
        title_input = self.selenium.find_element_by_name("title")
        title_input.send_keys('2')
        self.selenium.find_element_by_name('item-submit').click()


    def test_remove_cv_item(self):
        self.do_login()
        self.selenium.get(f'{self.live_server_url}/admin/cv/')
        self.assertTrue(self.selenium.title, 'Important Things - Admin: cv')
        self.create_new_cv_item(title='Title', description='nothing', location='here')
        self.selenium.get(f'{self.live_server_url}/admin/cv/')
        self.selenium.find_element_by_xpath('//div[@class="dropdown-trigger"]').click()
        self.selenium.find_element_by_xpath('//div//a[contains(text(), "Delete")]').click()

# delete a cv post
