Nback.Views.NbacksStats = Backbone.View.extend({

  template: JST['nbacks/stats'],

  render: function () {
    var content = this.template({
      model: this.model
    })

    this.$el.html(content);
    return this;
  }
})