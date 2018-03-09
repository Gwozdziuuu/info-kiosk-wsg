var fs = require("fs");
var express    = require('express');
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var path            = require("path");
var serveStatic = require('serve-static');

var packageDataFile = require.main.require('./package.json');

module.exports = {

  setupRESTWebService: function() {
    var app = express();
    var cors = require('cors');
    app.use(cors());
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(morgan('dev'));
    var router = express.Router();
    router.use(function(req, res, next) {
      next();
    });

    loadRestControllers(router, ['DataProvider', 'DataPublisher']);
    app.use('/api', router);
    logRegisteredServices(router);
    loadWebContent(app);
  }

}

function loadRestControllers(router, modules) {
  for (var name in modules) {
    fs.readdirSync(path.join(__dirname, '..', '..', modules[name], 'Controllers')).forEach(function(file) {
      require(path.join(__dirname, '..', '..', modules[name], 'Controllers', file))(router, mongoose);
    });
  }
}

function logRegisteredServices(router) {
  console.log("Registered REST methods:");
  router.stack.forEach(function(r) {
    if (r.route && r.route.path) {
      console.log(r.route.stack[0].method.toUpperCase() + " | " + r.route.path)
    }
  })
}

function loadWebContent(app) {
  app.use(serveStatic(path.join(__dirname, '..', '..', '..', '..'))).listen(packageDataFile.config.serverPort, function() {
    console.log('Server started on port: ' + packageDataFile.config.serverPort);
  });
}
