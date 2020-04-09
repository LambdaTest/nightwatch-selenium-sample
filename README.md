# Nightwatch Tutorial

![LAMBDATEST Logo](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/Lambdatest-logo-e1586434547512.png) ![Nightwatch Logo](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/nightwatchh.png)

This tutorial will help you to automate your Nightwatch tests on LambdaTest online Selenium cloud grid. 

## Prerequisites for Nightwatch tutorial for Selenium and JavaScript


* **Node.js and 
Package Manager (npm)** : Install Node.js from [here](https://nodejs.org/en/#home-downloadhead) Or Install Node.js with [Homebrew](http://brew.sh/)
```
$ brew install node
```

* **LambdaTest Credentials**
   * Set LambdaTest username and access key in environment variables. It can be obtained from [LambdaTest Automation Dashboard](https://automation.lambdatest.com/)    
    example:
   - For linux/mac
    ```
    export LT_USERNAME="YOUR_USERNAME"
    export LT_ACCESS_KEY="YOUR ACCESS KEY"

    ```
    - For Windows
    ```
    set LT_USERNAME="YOUR_USERNAME"
    set LT_ACCESS_KEY="YOUR ACCESS KEY"

    ```
    
## Setup for Running the Nightwatch test
   * Clone the github repo in your local browser using ```git clone https://github.com/LambdaTest/nightwatch-selenium-sample.git``` or download it directly from [here](https://github.com/LambdaTest/nightwatch-selenium-sample/archive/master.zip)
   * Navigate to the folder in which you have cloned or downloaded the repo and install dependencies by using `npm install`
   * In the same navigated folder, download the nightwatch dependency files by using the command `npm install nightwatch`. 
   
## Executing Protractor JavaScript Test

### Test Scenario 

The following sample code will run a test on LambdaTest Selenium Grid which will go to www.google.com and then type "LambdaTest" in the google search box. Then it will compare the title of the first search result with "LambdaTest - Google Search". If the result matches the described string, it will assert the value as pass else the test will be asserted as fail. 

To execute the test, you'll need to navigate to the folder where <code>nightwatch-selenium-sample-master</code> is present. Here, you'll need to execute the following command using the command line 

    ** Linux/Mac
    
    ```
    $ ./node_modules/.bin/nightwatch -e chrome tests
    ```
    
   ** Windows
    ```
    $ node_modules\.bin\nightwatch -e chrome tests
    ```

Once you execute the above command, it'll run the following code on Chrome browser in your LambdaTest account. 

```
var https = require("https");
var lambdaRestClient = require("@lambdatest/node-rest-client");
var lambdaCredentials = {
  username: process.env.LT_USERNAME,
  accessKey: process.env.LT_ACCESS_KEY
};
var lambdaAutomationClient = lambdaRestClient.AutomationClient(
  lambdaCredentials
);
module.exports = {
  "@tags": ["test"],
  Google: function(client) {
    client
      .url("https://www.google.com/ncr")
      .waitForElementVisible("body", 10000)
      .setValue("input[type=text]", "LambdaTest\n")
      .pause(1000)
      .assert.title("LambdaTest - Google Search")
      .end();
  },
  after: function(browser) {
    console.log("Closing down...");
  },
  afterEach: function(client, done) {
    if (
      process.env.LT_USERNAME &&
      process.env.LT_ACCESS_KEY &&
      client.capabilities &&
      client.capabilities["webdriver.remote.sessionid"]
    ) {
      
      lambdaAutomationClient.updateSessionById(
        client.capabilities["webdriver.remote.sessionid"],
        { status_ind: client.currentTest.results.failed ? "failed" : "passed" },
        function(error, session) {
          console.log(error)
          if (!error) {
            client.pause(10000)
            done();
          }
        }
      );
    } else {
      client.pause(10000)
      done();
    }
  }
};

```

Once you execute this command you'll get the following output in the command terminal:

![Output](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/nightwatch-output.png)

You will see the test result in the [Lambdatest Dashboard](https://automation.lambdatest.com)

The output in automation dashboard will look like this: 

![Automation Dashboard output](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/automation-output-nightwatch.png)

### LambdaTest Selenium Capabilities 



###  Routing traffic through your local machine
- Set tunnel value to `True` in test capabilities
> OS specific instructions to download and setup tunnel binary can be found at the following links.
>    - [Windows](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Windows)
>    - [Mac](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+MacOS)
>    - [Linux](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Linux)

### Important Note:
---
- Some Safari & IE browsers, doesn't support automatic resolution of the URL string "localhost". Therefore if you test on URLs like "http://localhost/" or "http://localhost:8080" etc, you would get an error in these browsers. A possible solution is to use "localhost.lambdatest.com" or replace the string "localhost" with machine IP address. For example if you wanted to test "http://localhost/dashboard" or, and your machine IP is 192.168.2.6 you can instead test on "http://192.168.2.6/dashboard" or "http://localhost.lambdatest.com/dashboard".

## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.

### Resources

##### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)
