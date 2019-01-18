module.exports = (function(settings) {
  console.log(settings["test_settings"]["default"]["username"])

  if (process.env.LAMBDATEST_USERNAME) {
    settings["test_settings"]["default"]["username"] = process.env.LAMBDATEST_USERNAME;
  }

  if (process.env.LAMBDATEST_ACCESS_KEY) {
    settings["test_settings"]["default"]["access_key"] = process.env.LAMBDATEST_ACCESS_KEY;
  }

  if (process.env.SELENIUM_HOST) {
    settings.selenium.host = process.env.SELENIUM_HOST;
  }
  if (process.env.SELENIUM_PORT) {
    settings.selenium.host = process.env.SELENIUM_PORT;
  }
  return settings;
})(require('./nightwatch.json'));
