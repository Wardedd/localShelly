const { exec, execSync } = require("child_process");
const EventEmitter = require("events");

const execute = (commands, isAsync, callback) => {
  if (!commands) return "Make sure to insert a command";

  if (isAsync) return executeAsync(commands, callback);
  else {
    return executeSync(commands);
  }
};

const executeSync = commands => {
  let output = [];
  for (let i = 0; i < commands.length; i++) {
    let command = commands[i];
    let soutput; //single output
    try {
      output.push((execSync(command) + "").trim()); // adding "" to execsync turns the buffer returned by execSync into a string
    } catch (e) {
      output.push("command error");
    }
  }
  return output;
};

const executeAsync = (commands, callback) => {
  let result = [];
  commands.forEach((command, index) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        result.push(stderr);
        return;
      }
      result.push(stdout);
      if (index === commands.length - 1) callback(result);
    });
  });
};

module.exports.executeSync = executeSync;
module.exports.executeAsync = executeAsync;
