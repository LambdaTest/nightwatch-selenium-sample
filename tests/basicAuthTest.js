

describe('sample with basic auth', function () {
    before(browser => browser
        .registerBasicAuth('lambda', 'lambdatest123')
        .navigateTo('https://ww.lambdatest.com/')
    );

    it('basic auth validation', function (browser) {

        browser.expect.element('header').to.be.visible;

    });
});

browser
