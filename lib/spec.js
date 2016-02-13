'use strict';

var _AssertClass = require('./AssertClass.js');

var fs = require('fs');
var assert = require('assert');
var loading = require('loading-indicator');
var logger = require('./logger');
var config = require('../config/api.json');
var child_process = require('child_process');

var appName = config['app_name'];
var classes = config['classes'];

for (var i = 0; i < classes.length; i++) {
    var klass = classes[i];
    var local = require('../build/' + appName + '/' + klass + '.local.json');
    var parse = require('../build/' + appName + '/' + klass + '.parse.json');
    assert.equal(local.results.length, parse.results.length);
    for (var i = 0; i < local.results.length; i++) {
        _AssertClass.AssertClass.verify(local.results[i], parse.results[i]);
    }
}