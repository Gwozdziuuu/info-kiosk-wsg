var packageDataFile = require.main.require('./package.json');

var sanitizeUtil = require.main.require('./src/Utils/SanitizeFilename');
const fse = require('fs-extra');

module.exports = function(router, mongoose) {

  router.route('/addOffer').post(function(req, res) {
    var offer = req.body;
    var data = JSON.stringify(offer);
    var title = sanitizeUtil(offer.title);
    if (fse.existsSync('JobOffers/' + offer.category + '/' + title + ".json")) {
      res.json({
        "error": 1,
        "description": "Oferta o podanym tytule jest już w systemie"
      });
    } else {
      fse.outputFileSync('JobOffers/' + offer.category + '/' + title + ".json", data);
      res.json({
        "error": 0,
        "description": "Oferta została poprawnie dodana"
      });
    }
  });

  router.route('/editOffer').post(function(req, res) {
    var offer = req.body;
    var data = JSON.stringify(offer);
    var title = sanitizeUtil(offer.title);
    fse.outputFileSync('JobOffers/' + offer.category + '/' + title + ".json", data);
    res.json("edited");
  });

  router.route('/removeOffer').post(function(req, res) {
    var category = req.body.category;
    var offers = req.body.offers;
    for (var i in offers) {
      fse.removeSync('JobOffers/' + category + '/' + sanitizeUtil(offers[i]) + '.json');
    }
    res.json("removed");
  });

}
