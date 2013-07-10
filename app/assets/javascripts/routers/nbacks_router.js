Nback.Routers.Nbacks = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl
  },

  routes: {
    "_=_": "index",
    "": "index",
    "instructions": "instructions"
  },

  index: function () {
    $(".nav").find("li").removeClass("active")
    $(".nav").find("#game-tab").addClass("active")
    var view = new Nback.Views.NbacksIndex();
    this.$rootEl.html(view.render().$el);
  },

  instructions: function () {
    $(".nav").find("li").removeClass("active")
    $(".nav").find("#instructions-tab").addClass("active")
    var view = new Nback.Views.NbacksInstructions();
    this.$rootEl.html(view.render().$el);
  }

});
