// http://github.com/nodejitsu/node-http-proxy

// Required Modules
var fs = require('fs'),
  http = require('http'),
  https = require('https'),
  httpProxy = require('http-proxy');

// Proxy Settings
var optionsHTTPS = {
  https: {
    key: fs.readFileSync('/etc/apache2/ssl/amc.key.pem', 'utf8'),
    cert: fs.readFileSync('/etc/apache2/ssl/amc.crt.pem', 'utf8')
  },
  hostNameOnly: true,
  router: {
    'amc2.pori.tut.fi': '127.0.0.1:8080',
    'amc.pori.tut.fi': '127.0.0.1:8080',
    'magos.pori.tut.fi/editor/': '127.0.0.1:9001',
    'magos.pori.tut.fi/play/': '127.0.0.1:9003',
    'magos.pori.tut.fi': '127.0.0.1:8081'
  }
};

var optionsHTTP = {
  hostNameOnly: true,
  router: {
    'amc2.pori.tut.fi': '127.0.0.1:8080', // amc2 www-server
    'amc.pori.tut.fi': '127.0.0.1:8080', // amc www-server
    'amc.pori.tut.fi/editor/': '127.0.0.1:9001', // magos editor
    'magos.pori.tut.fi/play/': '127.0.0.1:9003', // magos game platform
    'magos.pori.tut.fi': '127.0.0.1:8081' // django
  }
};

var proxyHTTPServer = httpProxy.createServer(optionsHTTP);
proxyHTTPServer.listen(80);

var proxyHTTPSServer = httpProxy.createServer(optionsHTTPS);
proxyHTTPSServer.listen(443);
