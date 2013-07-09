Nback.Views.NbacksInstructions = Backbone.View.extend({

  template: JST["nbacks/instructions"],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
})