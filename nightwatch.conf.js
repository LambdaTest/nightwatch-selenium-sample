

const capabilities = {
  'LT:Options': {
    "user": '${LT_USERNAME}',
    "accessKey": '${LT_ACCESS_KEY}',
    "build": "your build name",
    "platformName": "Windows 10",
    "selenium_version": "4.1.2",
    "seCdp": "true"
  }
}

const lambdatest = {
  selenium: {
    host: 'hub.lambdatest.com',
    port: 443
  }
}

module.exports = {
  src_folders: [],

  test_workers: {
    enabled: false,
    workers: 'auto',
  },

  webdriver: {
    keep_alive: true,
    timeout_options: {
      timeout: 60000,
      retry_attempts: 3
    }
  },

  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org'
    },

    "lambdatest.chrome": {
      ...lambdatest,
      desiredCapabilities: {
        browserName: 'chrome',
        ...capabilities
      }
    },
    "lambdatest.firefox": {
      ...lambdatest,
      desiredCapabilities: {
        browserName: 'firefox',
        platformName: 'windows 10',
        ...capabilities
      }
    },
    "lambdatest.edge": {
      ...lambdatest,
      desiredCapabilities: {
        browserName: 'Edge',
        ...capabilities
      }
    },
  },
  globals: {


    afterEach(browser, done) {

      if (browser.currentTest.results.failed) {
        browser.execute('lambda-status=failed');
      } else if (browser.currentTest.results.errors) {
        browser.execute('lambda-status=error');
      } else {
        browser.execute('lambda-status=passed');
      }
      done();
    }
  }
};