var configOperations = require.main.require('./src/Core/Server/ConfigOperations');

module.exports = {

  onStartup: function() {
    configOperations.setupRESTWebService();
  }

}
