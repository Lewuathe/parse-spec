"use strict";

import assert from 'assert';
import colors from 'colors';
import logger from './logger';

export class AssertClass {
    constructor() {}

    static verify(class1, class2) {
        for (let k of Object.keys(class1)) {
            try {
                assert.deepEqual(class1[k], class2[k]);
            } catch (e) {
                logger.warn('Error '.red + ' ' + class1[k] + '!=' + class2[k]);
            }
            //console.log('okay'.green + ' ' + class1[k] + '=' + class2[k]);
        }
    }
}
