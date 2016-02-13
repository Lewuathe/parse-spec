const exec = require('child_process').exec;
import fs from 'fs';
import rimraf from 'rimraf';
import logger from './logger';
import ProgressBar from 'progress';

var config = require('../config/api.json');
var appName = config['app_name'];
var appId = config['app_id'];
var restApiKey = config['restapi_key'];
var masterKey = config['master_key'];
var classes = config['classes'];

rimraf.sync('./build/' + appName, {});
fs.mkdirSync('./build/' + appName);

var bar = new ProgressBar('  Tracing [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 40,
    total: classes.length * 2
});
/**
 * Trace the API provided by specific class in Parse
 * @param klass
 */
function trace(endpoint, klass, env) {
    var output = './build/' + appName + '/' + klass + '.' + env + '.json';
    var cmd = ['curl',
        '-H',
        '"X-Parse-REST-API-Key: ' + restApiKey + '"',
        '-H', '"X-Parse-Application-Id: ' + appId + '"',
        '-H', '"X-Parse-Master-Key: ' + masterKey + '"',
        '-G', '--data-urlencode',
        '\'order=objectId\'',
        '--data-urlencode',
        '\'limit=100\'',
        endpoint + 'classes/' + klass,
    '>', output];
    exec(cmd.join(' '), (err, stdout, stderr) => {
        if (err) {
            logger.error(err);
        }
        bar.tick(1);
    });
    //logger.info(klass + '(' + env + ') has been finished');
}


for (var i = 0; i < classes.length; i++) {
    // Trace all APIs provided target parse server.
    trace(config['endpoint'], classes[i], 'local');
    trace(config['parse_endpoint'], classes[i], 'parse');
}