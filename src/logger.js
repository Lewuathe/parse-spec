var winston = require('winston');

var logger = new winston.Logger({
    transports: [new winston.transports.Console({
        level: 'info'
    }), new winston.transports.File({
        filename: 'trace.log',
        level: 'info'
    })]
});

module.exports = logger;