

const capabilities = {
  'LT:Options' : {
    "user" : '${LT_USERNAME}',
    "accessKey" : '${LT_ACCESS_KEY}',
    "build" : "your build name",
    "name" : "your test name",
    "platformName" : "Windows 10",
    "selenium_version" : "4.1.2",
    "seCdp" : "true"
  }
}

const lambdatest = {
  webdriver: {
      start_process: false
    },

    selenium: {
      host: 'hub.lambdatest.com',
      port: 443
    },

    desiredCapabilities: {
       browserName: 'chrome',
      ...capabilities
    }
}

module.exports = {
  src_folders: [],

  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org'
    },

    lambdatest:  {
        ...lambdatest
    },

    "lambdatest.chrome": {
      ...lambdatest,
      desiredCapabilities:{
          browserName: 'chrome',
          ...capabilities
      }
    },
    "lambdatest.firefox": {
      ...lambdatest,
      desiredCapabilities:{
          browserName: 'firefox',
          ...capabilities
      }
    },
    "lambdatest.edge": {
      ...lambdatest,
      desiredCapabilities:{
          browserName: 'Edge',
          ...capabilities
      }
    },
  },

  beforeEach(browser, done)  {
    // performing an async operation
    console.log('before each');
    setTimeout(function() {
      // finished async duties
      done();
    }, 100);
  },

  afterEach(browser, done) {
    // performing an async operation
    console.log('after each');
    setTimeout(function() {
      // finished async duties
      done();
    }, 200);
  },

   // Called right after the command .navigateTo() is finished
   async onBrowserNavigate(browser) {
    console.log(browser.currentTest);
    browser.execute('lambda-name='+browser.currentTest.name());
    return Promise.resolve();
  },

  // Called right before the command .quite() is finished
  async onBrowserQuit(browser) {
    console.log('on quite');
    return Promise.resolve();
  }

};