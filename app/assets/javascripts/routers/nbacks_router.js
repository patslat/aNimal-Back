Nback.Routers.Nbacks = Backbone.Router.extend({
  initialize: function ($rootEl) {
    this.$rootEl = $rootEl
  },

  routes: {
    "_=_": "index",
    "": "index",
    "instructions": "instructions",
    "stats": "stats"
  },

  index: function () {
    this._updateNav("#game-tab")
    var view = new Nback.Views.NbacksIndex({ prompted: this.prompted });
    this.prompted = true;
    this.$rootEl.html(view.render().$el);
  },

  instructions: function () {
    this._updateNav("#instructions-tab")
    var view = new Nback.Views.NbacksInstructions();
    this.$rootEl.html(view.render().$el);
  },

  stats: function () {
    this._updateNav("#stats-tab")
    var view = new Nback.Views.UserStats();
    this.$rootEl.html(view.render().$el).promise().done(function () {
      view.buildSVG();
    });

  },

  _updateNav: function (newTab) {
    $(".nav").find("li").removeClass("active")
    $(".nav").find(newTab).addClass("active")
  }

});
