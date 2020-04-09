# Nightwatch Tutorial

![LAMBDATEST Logo](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/Lambdatest-logo-e1586434547512.png) ![Nightwatch Logo](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/nightwatchh.png)

This tutorial will help you to automate your Nightwatch tests on LambdaTest online Selenium cloud grid. 

## Prerequisites for Nightwatch tutorial for Selenium and JavaScript


* **Node.js and 
Package Manager (npm)** : Install Node.js from [here](https://nodejs.org/en/#home-downloadhead) Or Install Node.js with [Homebrew](http://brew.sh/)
```
$ brew install node
```
Download [Selenium JavaScript bindings](http://www.seleniumhq.org/download/) from the official Selenium website.
Once you download the JavaScript bindings, extract the ZIP file which you’ve downloaded. After extracting the file, you need to add Selenium Java bindings which is a JAR file and all the dependent libraries to your classpath.

* **Installing Selenium Dependencies For Node.js**

Next step is to install Selenium dependencies for Node.js using npm. Here’s the command to run:
```npm i selenium-webdriver```

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
   
## Executing Nightwatch JavaScript Test

### Test Scenario 

The following sample code will run a test on LambdaTest Selenium Grid which will go to www.google.com and then type "LambdaTest" in the google search box. Then it will compare the title of the first search result with "LambdaTest - Google Search". If the result matches the described string, it will assert the value as pass else the test will be asserted as fail. 

The following test will run the following code on Chrome browser in your LambdaTest account. 

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
### Running the test for Nightwatch JS 

To execute the test, you'll need to navigate to the folder where <code>nightwatch-selenium-sample-master</code> is present. Here, you'll need to execute the following command using the command line: 

   * Linux/Mac 
    
   
    $ ./node_modules/.bin/nightwatch -e chrome tests
   
    
   * Windows
   
   
    $ node_modules\.bin\nightwatch -e chrome tests
   

Once you execute this command you'll get the following output in the command terminal:

![Output](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/nightwatch-output.png)

You will see the test result in the [Lambdatest Dashboard](https://automation.lambdatest.com)

The output in automation dashboard will look like this: 

![Automation Dashboard output](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/automation-output-nightwatch.png)

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

Since this is a common desired capaibilities used in parallel testing as well, hence we have different capabilities named as chrome, safari, firefox, and edge. However, when running the test above, we have run it only on chrome so the test ran on Windows 8, Chrome 71.0. But you can change the configuration using our LambdaTest Selenium Capability Generator by selecting the combination of your choice and copying the capabilities generated and pasting in your code. 

> Note: Don't forget to change your location as Javascript in the Selenium capability generator. 

## Running Parallel tests using Nightwatch JS 

We will use the same test script over different configuration to demonstrate parallel testing. Parallel testing with Nightwatch will help you to run multiple test cases simultaneously.

* **Parallel Test-** Here is JavaScript file to run Nightwatch Testing on a parallel environment i.e. different operating system (Windows 10 and Mac OS High Sierra) and different browsers (Chrome, Mozilla Firefox,Edge, and Safari).

To run a parallel test, you need to set the value of `test_workers` to true. Don't worry, we have already set the value to true, so you won't need to change anything. All you need to do is to run a new command in the base folder directory. 

We will use the same selenium capaibilities to run the parallel test, but with a change in the executing commmand. To run a parallel test, we'll need to run the following commands: 

* Linux/Mac

```$ ./node_modules/.bin/nightwatch -e chrome,edge,firefox tests```
 
* Windows

```$ node_modules\.bin\nightwatch -e chrome,edge,firefox tests```

The above command will run the test on chrome, edge, and firefox browsers in parallel at the specified configurations. After running the following command, you will get the given output in the command terminal: 
![Output command terminal](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/output-paralllel-nightwatch.png)

It will look like the following on the LambdaTest Automation dashboard

![Lambdatest automation dashboard](https://www.lambdatest.com/blog/wp-content/uploads/2020/04/automation-output-parallel-nightwatch.png)

Know how many parallel sessions are needed by using our [Concurrency Test Calculator](https://www.lambdatest.com/concurrency-calculator?ref=github)

###  Performing an automation test on your local hosted application| Local Testing 

To perform an automation test on a file or application hosted on your local environment or behind firewall, follow the given steps:

- Set tunnel value to `True` in test capabilities
So for example, if I have to run the above script for a locally hosted web-application then my capabilities class would be :

```"tunnel" : true;```

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
##### [Nightwatch Documentation](https://www.lambdatest.com/support/docs/nightwatch-with-selenium-running-nightwatch-automation-scripts-on-lambdatest-selenium-grid/)
