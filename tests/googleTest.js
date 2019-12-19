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
