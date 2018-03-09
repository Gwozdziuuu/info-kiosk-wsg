ik.main.jobOffer.AddView = treelad.Class.create({

  init: function (cfg) {
    treelad.Class.extend(this, treelad.Class.extend({
    }, cfg));
    this.render();
  },

  render: function() {
    var t = this;


    var addView = $_element({
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
            $_append: "IT"
          }, {
            $_tag: "option",
            $_append: "Ochrona"
          }, {
            $_tag: "option",
            $_append: "Produkcja"
          }]
        }]
      }, {
        $_tag: "div",
        class: "form-group",
        $_append: [{
          $_tag: "input",
          class: "form-control",
          id: "title",
          placeholder: "Tytuł",
          required: "true"
        }]
      }, {
        $_tag: "div",
        class: "form-group",
        $_append: [{
          $_tag: "input",
          class: "form-control",
          id: "email",
          placeholder: "Email",
          required: "true"
        }]
      }, {
        $_tag: "div",
        class: "form-group",
        $_append: [{
          $_tag: "textarea",
          class: "form-control",
          id: "description",
          rows: "5",
          placeholder: "Opis stanowiska",
          required: "true"
        }]
      }, {
        $_tag: "div",
        class: "form-group",
        $_append: [{
          $_tag: "input",
          class: "form-control",
          id: "salary",
          placeholder: "Wynagrodzenie",
          required: "true"
        }]
      }, {
        $_tag: "button",
        type: "button",
        class: "btn btn-primary",
        $_append: "Dodaj ogłoszenie",
        $_on: {
          "click": function(e) {
            t.addOffer();
          }
        }
      }]
    });
    t.inside.update(addView);
  },

  addOffer: function() {
    var t = this;

    var validate = true;
    var offer = {
      title: getValidated($("#title").val()),
      email: getValidated($("#email").val()),
      description: getValidated($("#description").val()),
      salary: getValidated($("#salary").val()),
      category: getValidated($("#category").val()),
    }


    if (validate) {
      $.ajax({
        url: 'http://localhost:9001/api/addOffer',
        type: 'post',
        data: offer
      })
      .then(function(data) {
        if (data.error == 1) {
          $.notify(
            {message: data.description},
            {type: 'danger'}
          );
        } else {
          $.notify(
            {message: data.description},
            {type: 'success'}
          );
        }
      });
    } else {
      $.notify(
        {message: 'Proszę wypełnić wymagane pola'},
        {type: 'warning'}
      );
    }

    function getValidated(value) {
      if (value == "") {
        validate = false;
      }
      return value;
    }
  }

});
