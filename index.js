const fs = require('fs');
const { execSync } = require('child_process');

// Define the file to write to
const filePath = './logs.txt';

// Function to write a line to the file
function writeToFile() {
  const line = `New line added at ${new Date().toISOString()}\n`;
  try {
    fs.appendFileSync(filePath, line);
    console.log('Line written to file.');
  } catch (err) {
    console.error('Error writing to file:', err);
  }
}

// Function to commit changes to Git
function commitAndPush() {
  try {
    // Add changes to Git
    execSync('git add .');
    console.log('Changes staged for commit.');

    // Commit changes with a message
    execSync('git commit -m "Automated commit: Added new line"');
    console.log('Changes committed.');

    // Push to remote repository
    execSync('git push');
    console.log('Changes pushed to remote repository.');
  } catch (err) {
    console.error('Error during git operations:', err);
  }
}

// Function to perform the task
function performTask() {
  writeToFile();
  commitAndPush();
}

// Schedule the task to run 4-7 times a day
const minInterval = 1000 * 60 * 60 * 3; // 3 hours in milliseconds
const maxInterval = 1000 * 60 * 60 * 5; // 5 hours in milliseconds

// Random interval between 4-7 hours
const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

// Execute the task immediately
performTask();

// Set interval to run periodically
setInterval(() => {
  performTask();
}, interval);

console.log('Script is running. The task will execute periodically.');
