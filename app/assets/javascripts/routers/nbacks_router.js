Nback.Routers.Nbacks = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl
  },

  routes: {
    "": "index"
  },

  index: function () {
    var view = new Nback.Views.NbacksIndex();
    this.$rootEl.html(view.render().$el);
  }

});
