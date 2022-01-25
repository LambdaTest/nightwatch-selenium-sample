# Nightwatch Tutorial

![LAMBDATEST Logo](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/Lambdatest-logo-e1586434547512.png) ![Nightwatch Logo](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/nightwatchh.png)
This tutorial will help you to automate your Nightwatch tests on LambdaTest online Selenium cloud grid.

## Prerequisites

1. Install npm.

```
sudo apt install npm
```

2. Install NodeJS.

```
sudo apt install nodejs
```

## Steps to Run your First Test

Step 1. Clone the Nightwatch Selenium Repository.

```
git clone https://github.com/LambdaTest/nightwatch-selenium-sample.git
```

Step 2. Inside mightwatch-selenium-sample, export the Lambda-test Credentials. You can get these from your automation dashboard.

<p align="center">
   <b>For Linux/macOS:</b>

```
export LT_USERNAME="YOUR_USERNAME"
export LT_ACCESS_KEY="YOUR ACCESS KEY"
```

<p align="center">
   <b>For Windows:</b>

```
set LT_USERNAME="YOUR_USERNAME"
set LT_ACCESS_KEY="YOUR ACCESS KEY"
```

Step 3. Inside mightwatch-selenium-sample folder install necessary packages.

```
cd mocha-selenium-sample
npm i
```

Step 4. To run your First Test.

```
npm run single
```

## See the Results

You can check your test results on the [Automation Dashboard](https://automation.lambdatest.com/build).
![Automation Testing Logs](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/automation-output-nightwatch.png)

## Executing Nightwatch test Parallely.

1. Will use the same test script over different configration to demonstarte parallel testing. Parallel testing with Mocha will help you to run multiple test cases simultaneously.

```
npm run parallel
```

## Understanding googleTest.js

1. Importing necessary packages, and cofiguring Lambdatest credentials.

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
```

2. Next, we write our test to open google.com and search Lambdatest on it. Then we compare if the heading of the search matchs the expected output.

```
module.exports = {
  "@tags": ["test"],
  Google: function(client) {
    client
      .url("https://www.google.com/ncr")
      .waitForElementPresent("body", 1000)
      .setValue("input[name=q]", "LambdaTest\n") // Write Lambdatest in the search input box.
      .pause(1000)
      .assert.title("LambdaTest - Google Search") // Set title.
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
            client.pause(1000)
            done();
          }
        }
      );
    } else {
      console.log("Test Run Successfully!");
      client.pause(1000)
      done();
    }
  }
};
```

### LambdaTest Selenium Desired Capabilities

Since, now we have a first script ready. Let us specify the selenium capabilities to run the script on LambdaTest cloud-based Selenium Grid. LambdaTest provides a [capability generator](https://www.lambdatest.com/capabilities-generator/) to the capabilities in all the major languages. All you need to do is to select the OS, Resolution, Browser, Version and the code will be generated. You can just copy it and paste it in your code. In the above example, we have used the following Selenium capabilities which are mentioned in "nightwatch.json" file inside the repo.

```
 "desiredCapabilities": {
        "build": "Nightwatch-Selenium-Sample",
        "visual": true,
        "video": true,
        "console": true,
        "network": true
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "platform": "Windows 8",
        "browserName": "chrome",
        "version": "71.0"
      }
    },
    "safari": {
      "desiredCapabilities": {
        "platform": "macos 10.13",
        "browserName": "safari",
        "version": "11.0"
      }
    },
    "firefox": {
      "desiredCapabilities": {
        "platform": "win10",
        "browserName": "firefox",
        "version": "60"
      }
    },
    "edge": {
      "desiredCapabilities": {
        "platform": "Windows 10",
        "browserName": "MicrosoftEdge",
        "version": "17.0"
      }
    }
```

> Note: Don't forget to change your location as Javascript in the Selenium capability generator.

![Output command terminal](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/output-paralllel-nightwatch.png)

### Performing an automation test on your local hosted application| Local Testing

To perform an automation test on a file or application hosted on your local environment or behind firewall, follow the given steps:

- Set tunnel value to `True` in test capabilities
  So for example, if I have to run the above script for a locally hosted web-application then my capabilities class would be :

`"tunnel" : true;`

> OS specific instructions to download and setup tunnel binary can be found at the following links.
>
> - [Windows](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Windows)
> - [Mac](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+MacOS)
> - [Linux](https://www.lambdatest.com/support/docs/display/TD/Local+Testing+For+Linux)

### Important Note:

---

- Some Safari & IE browsers, doesn't support automatic resolution of the URL string "localhost". Therefore if you test on URLs like "http://localhost/" or "http://localhost:8080" etc, you would get an error in these browsers. A possible solution is to use "localhost.lambdatest.com" or replace the string "localhost" with machine IP address. For example if you wanted to test "http://localhost/dashboard" or, and your machine IP is 192.168.2.6 you can instead test on "http://192.168.2.6/dashboard" or "http://localhost.lambdatest.com/dashboard".

## About LambdaTest

[LambdaTest](https://www.lambdatest.com/) is a cloud based selenium grid infrastructure that can help you run automated cross browser compatibility tests on 2000+ different browser and operating system environments. LambdaTest supports all programming languages and frameworks that are supported with Selenium, and have easy integrations with all popular CI/CD platforms. It's a perfect solution to bring your [selenium automation testing](https://www.lambdatest.com/selenium-automation) to cloud based infrastructure that not only helps you increase your test coverage over multiple desktop and mobile browsers, but also allows you to cut down your test execution time by running tests on parallel.

### Resources

##### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)

##### [Nightwatch Documentation](https://www.lambdatest.com/support/docs/nightwatch-with-selenium-running-nightwatch-automation-scripts-on-lambdatest-selenium-grid/)
