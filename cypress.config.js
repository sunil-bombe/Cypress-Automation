const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprocessor,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");
const report = require("multiple-cucumber-html-reporter");


function getCurrentDateAndTimestampString() {
  const now = new Date();

  // Get date components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(now.getDate()).padStart(2, '0');

  // Get time components
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  // Construct date and timestamp string
  const currentDateAndTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  return currentDateAndTimestamp;
}

function generateHTMLReport() {
  report.generate({
    jsonDir: "./cypress/cucumberReports",
    reportPath: "./cypress/cucumberReports/cucumber-html-report-"+getCurrentDateAndTimestampString(),
    metadata: {
      browser: {
        name: "chrome",
        version: "60",
      },
      device: "Local test machine",
      platform: {
        name: "Mac OS",
        version: "16.04",
      },
    },
    customData: {
      title: "Run info",
      data: [
        { label: "Project", value: "Custom project" },
        { label: "Release", value: "1.2.3" },
        { label: "Cycle", value: "B11221.34321" },
        { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
        { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
      ],
    },
  });
}

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", preprocessor(config));

  // on("after:run", (results) => {
  //  // generateHTMLReport();
  // });
  return config;
}

module.exports = defineConfig({
  pageLoadTimeout:360000,
  defaultCommandTimeout: 6000,
   requestTimeout:20000,
   responseTimeout: 60000,
   viewportHeight: 1080,
   viewportWidth: 1080,
   video: true,
   videoCompression: 40,
  projectId: "Cypress Cucumber Automation Framework POC",

  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      reportFilename: "index.html",
      quite: true,
      overwrite: true,
      html: true,
      json: true,
      excludePending: true,
    },
  },
  env: {
    QA: {
      url: "https://rahulshettyacademy.com",
      username: "",
      password: "",
    },
    DEV: {
      url: "https://rahulshettyacademy.com",
      username: "",
      password: "",
    },
    PROD: {
      url: "https://rahulshettyacademy.com",
      username: "",
      password: "",
    },
  },
  retries: {
    runMode: 1,
  },
  e2e: {
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/reports/screenshots",
    baseUrl: "https://flipkart.com",
    specPattern: "cypress/e2e/BDD/**/*.feature",
    setupNodeEvents,
  },
});
