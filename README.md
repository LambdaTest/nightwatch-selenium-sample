# NightWatch-lambdatest.com
##### [NightWatch Documentation](http://nightwatchjs.org/)
![LAMBDATEST Logo](http://labs.lambdatest.com/images/fills-copy.svg)


### Environment Setup

1. Global Dependencies
    * Install [Node.js](https://nodejs.org/en/)
    * Or Install Node.js with [Homebrew](http://brew.sh/)
    ```
    $ brew install node
    ```
2. lambdatest Credentials
    * In the terminal export your lambdatest Credentials as environmental variables:
    ```
    $ export LAMBDATEST_USERNAME=<your lambdatest username>
    $ export LAMBDATEST_ACCESS_KEY=<your lambdatest access_key>
    ```
3. Project Dependencies
    * Install Node modules
    ```
    $ npm install
    ```

### Running Tests

* Tests in Parallel:
    ```
    $ ./node_modules/.bin/nightwatch -e chrome,edge tests
    ```

You will see the test result in the [lambdatest Dashboard](https://automation.lambdatest.com)

### Resources

##### [SeleniumHQ Documentation](http://www.seleniumhq.org/docs/)
