var packageDataFile = require.main.require('./package.json');

var sanitizeUtil = require.main.require('./src/Utils/SanitizeFilename');
const fse = require('fs-extra');
var fs = require('fs');

module.exports = function(router, mongoose) {

  router.route('/getOffersByCategory').get(function(req, res) {
    var offers = [];
    var category = req.query.category;
    try {
      fs.readdirSync(process.env.OPENSHIFT_DATA_DIR + 'JobOffers/' + category + '/').forEach(file => {
        offers.push(JSON.parse(fs.readFileSync(process.env.OPENSHIFT_DATA_DIR + 'JobOffers/' + category + '/' + file, 'utf8')));
      })
    } catch (err) {
      console.error("No category name: " + category)
    }
    res.json(offers);
  });

}
