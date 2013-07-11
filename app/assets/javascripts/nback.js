window.Nback = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl) {
    new Nback.Routers.Nbacks($rootEl);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Nback.initialize($("#content"));
  $("#alerts").delay(2000).fadeOut("slow");
});
