console.log('Adding Build Timestamp...');

const replace = require('replace-in-file');
const moment = require('moment');

const buildTimestamp = moment().format('MM/DD/YYYY hh:mm:ss');
console.log('buildTimestamp', buildTimestamp);

const options = {
  files: [
    'src/environments/environment.ts',
    'src/environments/environment.prod.ts',
    'src/environments/environment.dev.ts',
  ],
  from: /buildTimestamp: '(.*)'/g,
  to: "buildTimestamp: '" + buildTimestamp + "'",
  allowEmptyPaths: false,
};
try {
  let changedFiles = replace.sync(options);
  console.log('changedFiles', changedFiles);
  console.log('Build timestamp is set to: ' + buildTimestamp);
} catch (error) {
  console.error('Error occurred:', error);
  throw error
}
