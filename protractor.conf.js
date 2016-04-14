// An example configuration file
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',

  chromeDriver: './node_modules/chromedriver/bin/chromedriver',
  
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    //'browserName': 'chrome'
    'browserName': 'firefox'    
  },

  // Spec patterns are relative to the configuration file location passed
  // to protractor (in this example conf.js).
  // They may include glob patterns.
  specs: ['tests/e2e/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
};