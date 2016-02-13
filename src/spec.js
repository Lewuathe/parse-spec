import fs from 'fs';
import assert from 'assert';
import colors from 'colors';
import logger from './logger';

var config = require('../config/api.json');

import { AssertClass } from './AssertClass.js';

var appName = config['app_name'];
var classes = config['classes'];

for (let klass of classes) {
    var local = require('../build/' + appName + '/' + klass + '.local.json');
    var parse = require('../build/' + appName + '/' + klass + '.parse.json');
    assert.equal(local.results.length, parse.results.length);
    for (var i = 0; i < local.results.length; i++) {
        AssertClass.verify(local.results[i], parse.results[i]);
    }
    console.log('OK: '.green + klass.underline);
}