import fs from "fs";

if (process.env.NODE_ENV == "production") {
  let stdLogger = console.log;
  let stdError = console.error;

  var logFile = fs.createWriteStream("logs.log", { flags: "a" });

  console.log = function (...args: any) {
    stdLogger(args);

    if (logFile.writable) {
      logFile.write(JSON.stringify(args));
      logFile.write("\n");
    }
  };

  console.error = function (...args: any) {
    stdError(args);

    if (logFile.writable) {
      logFile.write(JSON.stringify(args));
      logFile.write("\n");
    }
  };
}
