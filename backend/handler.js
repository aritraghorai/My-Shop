const app = require('./dist/index');
const serverless = require('serverless-http');
module.exports.hello = serverless(app);
