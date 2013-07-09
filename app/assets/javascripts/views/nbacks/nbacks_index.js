Nback.Views.NbacksIndex = Backbone.View.extend({

  template: JST['nbacks/index'],

  render: function () {
    this.$el.html(template());

    return this;
  }

});
