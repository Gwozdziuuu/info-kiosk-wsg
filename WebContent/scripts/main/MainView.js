importScript("scripts/main/$_package.js");

importScript("scripts/main/jobOffer/$_package.js");
importScript("scripts/main/jobOffer/AddView.js");
importScript("scripts/main/jobOffer/EditView.js");
importScript("scripts/main/jobOffer/RemoveView.js");

ik.main.MainView = treelad.Class.create({

  init: function (cfg) {
    treelad.Class.extend(this, treelad.Class.extend({
    }, cfg));

  },

  render: function() {
    var t = this;

    var nav = $_element({
      $_tag: "div",
      id: "nav",
      class: "container",
      $_append: [{
        $_tag: "br"
      }, {
        $_tag: "ul",
        class: "nav nav-pills nav-justified",
        $_append: [{
          $_tag: "li",
          class: "nav-item",
          $_append: [{
            $_tag: "a",
            class: "nav-link",
            style: "color: white",
            $_append: "Dodaj ofertę",
            $_on: {
              "click": function(e) {
                e.preventDefault()
                $(this).tab('show')
                var addView = new ik.main.jobOffer.AddView({
                  inside: t.inside.find("content"),
                });
              }
            }
          }]
        }/*, {
          $_tag: "li",
          class: "nav-item",
          $_append: [{
            $_tag: "a",
            class: "nav-link",
            style: "color: white",
            $_append: "Edytuj ofertę",
            $_on: {
              "click": function(e) {
                e.preventDefault()
                $(this).tab('show')
                var editView = new ik.main.jobOffer.EditView({
                  inside: t.inside.find("content"),
                });
              }
            }
          }]
        }*/, {
          $_tag: "li",
          class: "nav-item",
          $_append: [{
            $_tag: "a",
            class: "nav-link",
            style: "color: white",
            $_append: "Usuń ofertę",
            $_on: {
              "click": function(e) {
                e.preventDefault()
                $(this).tab('show')
                var removeView = new ik.main.jobOffer.RemoveView({
                  inside: t.inside.find("content"),
                });
              }
            }
          }]
        }]
      }]
    });

    var content = $_element({
      $_tag: "div",
      id: "content",
      class: "container fill",
      $_append: [{
        $_tag: "div",
        $_append: [{
          $_tag: "h1",
          style: "color: white; text-align: center;",
          $_append: "Strona umożliwiająca tworzenie/edytowanie/usuwanie ogłoszeń na urządzenia InfoKiosk WSG"
        }]
      }]
    })

    var wrapper = $_element({
      $_tag: "div",
      style: "height: 100vh",
      $_append: [nav.dom(), content.dom()]
    })

    t.inside.update(wrapper);
  },

});

$MAIN = new ik.main.MainView({
  inside: $_element(document.body),
});

$MAIN.render();
