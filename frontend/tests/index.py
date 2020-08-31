from .base import MySeleniumTests

class IndexTest(MySeleniumTests):
    fixtures = ['fixtures.json']

    def test_index_page(self):
        # get index page
        # self.selenium.get(f'{self.live_server_url}')
        title = self.selenium.find_element_by_tag_name('h1').text
        self.assertEqual('Charlie de Freitas', title)
        self.assertEqual(self.selenium.title, 'Important Things')
