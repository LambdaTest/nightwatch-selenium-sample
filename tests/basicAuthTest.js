

describe('sample with basic auth', function () {
    before(browser => browser
        .registerBasicAuth('lambda', 'lambdatest123')
        .navigateTo('https://ww.lambdatest.com/')
        );

    it('basic auth validation', function (browser) {

        browser.getText('css selector', '#liveOnCloud > div > div > div > div:nth-child(2) > h2', function(result) {
            console.log('getText result', result.value);
          });

        

       

        // browser
        //     .waitForElementVisible(passwordElement)
        //     .expect.element(passwordElement).to.be.an('h2');

        // browser.expect.element(passwordElement).attribute('type').equal('submit');
    });
});

browser
