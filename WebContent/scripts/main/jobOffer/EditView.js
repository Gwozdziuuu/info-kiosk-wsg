ik.main.jobOffer.EditView = treelad.Class.create({

  init: function (cfg) {
    treelad.Class.extend(this, treelad.Class.extend({
    }, cfg));
    this.render();
  },

  render: function() {
    var t = this;

    var editView = $_element({
      $_tag: "div",
      $_append: "Edit"
    });
    t.inside.update(editView);
  }

});
