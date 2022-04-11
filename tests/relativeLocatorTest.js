describe('sample with relative locators', function () {
    before(browser => browser.navigateTo('https://archive.org/account/login'));
    
    it('locates password input', function (browser) {
      const passwordElement = locateWith(By.tagName('input')).below(By.css('input[type=email]'));
  
      browser
        .waitForElementVisible(passwordElement)
        .expect.element(passwordElement).to.be.an('input');
  
      browser.expect.element(passwordElement).attribute('type').equal('password');
    });
  });