ik.main.jobOffer.RemoveView = treelad.Class.create({

  init: function (cfg) {
    treelad.Class.extend(this, treelad.Class.extend({
      selectedOffers: [],
      selectedCategory: ""
    }, cfg));
    this.render();
  },

  render: function() {
    var t = this;

    var removeView = $_element({
      $_tag: "form",
      id: "addForm",
      $_append: [{
        $_tag: "br"
      }, {
        $_tag: "div",
        class: "form-group",
        $_append: [{
          $_tag: "select",
          class: "form-control",
          id: "category",
          required: "true",
          $_append: [{
            $_tag: "option",
            $_append: "Wybierz kategorię",
          }, {
            $_tag: "option",
            $_append: "IT",
            $_on: {
              "click": function(e) {
                t.selectedCategory = "it";
                t.showOffers()
              }
            }
          }, {
            $_tag: "option",
            $_append: "Ochrona",
            $_on: {
              "click": function(e) {
                t.selectedCategory = "ochrona";
                t.showOffers()
              }
            }
          }, {
            $_tag: "option",
            $_append: "Produkcja",
            $_on: {
              "click": function(e) {
                t.selectedCategory = "produkcja";
                t.showOffers()
              }
            }
          }]
        }]
      }, {
        $_tag: "div",
        id: "offerContainer"
      }, {
        $_tag: "button",
        type: "button",
        class: "btn btn-primary",
        $_append: "Usuń ogłoszenia",
        $_on: {
          "click": function(e) {
            t.removeOffers();
          }
        }
      }]
    });
    t.inside.update(removeView);
  },

  showOffers: function() {
    var t = this;
    $.ajax({
      url: 'http://localhost:9001/api/getOffersByCategory?category=' + t.selectedCategory,
      type: 'get'
    })
    .then(function(data) {
      var jobCheckView = $_element({
        $_tag: "div",
        class: "form-group",
        $_append: [{
          $_tag: "label",
          class: "form-check-label",
          $_append: data.map(function(offer) {
            return {
              $_tag: "div",
              $_append: [{
                $_tag: "input",
                class: "form-check-input",
                type: "checkbox",
                value: offer.title,
                $_on: {
                  "click": function(e) {
                    if (this.checked) {
                      t.selectedOffers.push(this.value);
                    } else {
                      var index = t.selectedOffers.indexOf(this.value);
                      if (index > -1) {
                        t.selectedOffers.splice(index, 1);
                      }
                    }
                  }
                }
              }, {
                $_tag: "p",
                style: "color: white",
                $_append: offer.title
              }]
            };
          })
        }]
      })
      t.inside.find("offerContainer").update(jobCheckView);
    });
  },

  removeOffers: function() {
    var t = this;
    var model = {
      category: t.selectedCategory,
      offers: t.selectedOffers
    }
    $.ajax({
      url: 'http://localhost:9001/api/removeOffer',
      type: 'post',
      data: model
    })
    .then(function(data) {
      t.showOffers()
    });
  }

});
