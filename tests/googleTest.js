var https = require('https');

module.exports = {

    '@tags': ['test'],

    'Google': function(client) {
        client
            .url('https://www.google.com/ncr')
            .waitForElementVisible('body', 10000)
            .setValue('input[type=text]', 'LambdaTest\n')
            .pause(1000)
            .assert.title('LambdaTest - Google Search')
            .end();
    },

    afterEach: function(client, done) {
        setTimeout(function() {
            done();
        }, 1000);
    }
};
