from .base import MySeleniumTests
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.webelement import FirefoxWebElement
from time import sleep
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BlogTest(MySeleniumTests):


    def create_new_post(self, title, text):
        self.selenium.find_element_by_name('post-new').click()
        title_input = self.selenium.find_element_by_name("title")
        title_input.send_keys(title)
        text_input = self.selenium.find_element_by_name("text")
        text_input.send_keys(text)
        self.selenium.find_element_by_name('post-submit').click()


    # get the blog index
    def test_get_blogs(self):
        self.selenium.get(f'{self.live_server_url}/blog/')
        self.assertTrue(self.selenium.title, 'Important Things - Blog')


    # add a blog post
    def test_add_blog(self):
        # login 
        self.do_login()
        self.selenium.get(f'{self.live_server_url}/admin/blog/')
        self.assertTrue(self.selenium.title, 'Important Things - Admin: Blog')
        self.create_new_post(title='Title', text='nothing')
        # find link to view new post
        self.selenium.find_element_by_xpath('//a[@href="/blog/1"]')
        self.do_logout()
        self.selenium.get(f'{self.live_server_url}/blog/')
        self.assertTrue(self.selenium.title, 'Important Things - Blog')
        post_view = self.selenium.find_element_by_link_text('Title')
        self.selenium.get(post_view.get_attribute('href'))
        title = self.selenium.find_element_by_class_name('title')
        self.assertEqual('Title', title.text)


    # edit a blog post
    def test_edit_post(self):
        # self.test_add_blog()
        self.do_login()
        self.selenium.get(f'{self.live_server_url}/admin/blog/')
        self.assertTrue(self.selenium.title, 'Important Things - Admin: Blog')
        self.create_new_post(title='Title', text='nothing')
        # find link to view new post
        self.selenium.get(f'{self.live_server_url}/admin/blog/')
        self.selenium.find_element_by_xpath('//div[@class="grid-item"]//a[contains(text(), "Edit")]').click()
        title_input = self.selenium.find_element_by_name("title")
        title_input.send_keys('2')
        self.selenium.find_element_by_name('post-submit').click()
        self.selenium.find_element_by_xpath('//div[@class="grid-item"]//a[contains(text(), "View")]').click()

    def test_remove_post(self):
        self.do_login()
        self.selenium.get(f'{self.live_server_url}/admin/blog/')
        self.assertTrue(self.selenium.title, 'Important Things - Admin: Blog')
        self.create_new_post(title='Title', text='nothing')
        self.selenium.get(f'{self.live_server_url}/admin/blog/')
        self.selenium.find_element_by_xpath('//div[@class="dropdown-trigger"]').click()
        self.selenium.find_element_by_xpath('//div//a[contains(text(), "Delete")]').click()

# delete a blog post
