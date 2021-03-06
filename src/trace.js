const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
import fs from 'fs';
import rimraf from 'rimraf';
import logger from './logger';
import ProgressBar from 'progress';

let config = require(process.argv[2]);
let buildDir = process.argv[3];
let appName = config['app_name'];
let appId = config['app_id'];
let restApiKey = config['restapi_key'];
let masterKey = config['master_key'];
let classes = config['classes'];

fs.mkdirSync(buildDir + '/' + appName);

let bar = new ProgressBar('  Tracing [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 40,
    total: classes.length * 2 * 2
});

function count(endpoint, klass, env) {
  var output = buildDir + '/' + appName + '/' + klass + '.' + env + '.json';
  var cmd = ['curl',
      '-H', `"X-Parse-REST-API-Key: ${restApiKey}"`,
      '-H', `"X-Parse-Application-Id: ${appId}"`,
      '-G',
      `--data-urlencode`, `'count=1'`,
      '--data-urlencode', `'limit=0'`,
      endpoint + 'classes/' + klass
    ];
  let numOfClass = JSON.parse(execSync(cmd.join(' '), {
    stdio: [1]
  }).toString());
  bar.tick(1);
  return numOfClass.count;
}

/**
 * Trace the API provided by specific class in Parse
 * @param klass
 */
function trace(endpoint, klass, env, count) {
    var output = buildDir + '/' + appName + '/' + klass + '.' + env + '.json';
    var cmd = ['curl',
        '-H',
        '"X-Parse-REST-API-Key: ' + restApiKey + '"',
        '-H', '"X-Parse-Application-Id: ' + appId + '"',
        '-H', '"X-Parse-Master-Key: ' + masterKey + '"',
        '-G', '--data-urlencode',
        '\'order=objectId\'',
        '--data-urlencode',
        `'limit=${count}'`,
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
    trace(config['endpoint'], classes[i], 'local', count(config['endpoint'], classes[i], 'local'));
    trace(config['parse_endpoint'], classes[i], 'parse', count(config['endpoint'], classes[i], 'parse'));
}
