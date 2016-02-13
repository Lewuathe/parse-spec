"use strict";

var assert = require('assert');
var logger = require('./logger');

export class AssertClass {
    constructor() {}

    static verify(class1, class2) {
        for (let k of Object.keys(class1)) {
            assert.deepEqual(class1[k], class2[k]);
        }

    }
}
