Nback.Routers.Nbacks = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl
  },

  routes: {
    "": "index",
    "instructions": "instructions"
  },

  index: function () {
    var view = new Nback.Views.NbacksIndex();
    this.$rootEl.html(view.render().$el);
  },

  instructions: function () {
    var view = new Nback.Views.NbacksInstructions();
    this.$rootEl.html(view.render().$el);
  }

});
