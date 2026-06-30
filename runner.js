#!/usr/bin/env node
const child_process = require('child_process');

console.log("Execute commands");

// Wrap the logic in an async function to use 'await'
async function runCommands() {
  await executeCommand("npx cypress run --env tags='@regression' --headed --browser chrome");
  await executeCommand("node cucumber-html-report.js");
}

async function executeCommand(commandString) {
  console.log("executing the command:" + commandString);
  
  // Split the commandString into an array of command and arguments
  const [command, ...args] = commandString.split(' ');

  // Use spawnSync to execute the command synchronously
  const result = child_process.spawnSync(command, args, {
    env: process.env,
    stdio: 'inherit', // Redirect child's stdio to the parent
    shell: true, // Use shell for command execution
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
}

// Call the async function to run the commands
runCommands();
