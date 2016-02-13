var fs = require('fs');
var loading = require('loading-indicator');
var logger = require('./logger');
var config = require('../config/api.json');
const child_process = require('child_process');

var appName = config['app_name'];
var appId = config['app_id'];
var restApiKey = config['restapi_key'];
var masterKey = config['master_key'];
var classes = config['classes'];

fs.mkdirSync('./build/' + appName);

/**
 * Trace the API provided by specific class in Parse
 * @param klass
 */
function trace(endpoint, klass, isParse) {
    var output = isParse ? './build/' + appName + '/' + klass + '.parse.json' : './build/' + appName + '/' + klass + '.local.json';
    var cmd = ['curl',
    //'--trace',
    //'-',
    '-H', '"X-Parse-REST-API-Key: ' + restApiKey + '"', '-H', '"X-Parse-Application-Id: ' + appId + '"', '-H', '"X-Parse-Master-Key: ' + masterKey + '"', '-G', '--data-urlencode', '\'order=objectId\'', '--data-urlencode', '\'limit=100\'', endpoint + 'classes/' + klass,
    //'|',
    //'./node_modules/.bin/curl-trace-parser',
    // '--blueprint',
    '>', output];
    var timer = loading.start('Tracing... ' + klass);
    logger.debug(cmd);
    child_process.execSync(cmd.join(' '), {});
    logger.info(klass + ' has been finished');
    loading.stop(timer);
}

for (var i = 0; i < classes.length; i++) {
    // Trace all APIs provided target parse server.
    trace(config['endpoint'], classes[i], false);
    trace(config['parse_endpoint'], classes[i], true);
}