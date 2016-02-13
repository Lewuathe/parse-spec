'use strict';

var winston = require('winston');

var logger = new winston.Logger({
    transports: [new winston.transports.Console({
        level: 'debug'
    }), new winston.transports.File({
        filename: 'trace.log',
        level: 'info'
    })]
});

module.exports = logger;