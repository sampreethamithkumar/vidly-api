const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {

  winston.handleException(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.file({
      filename: "logerfile.log",
    })
  );

  process.on("uncaughtRejection", (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logerfile.log" });
  winston.add(winstone.transports.MongoDB, { db: "mongodb://localhost/vidly" });
};
