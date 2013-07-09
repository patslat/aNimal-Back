window.Nback = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl) {
    new Nback.routers.Nbacks($rootEl);
  }
};

$(document).ready(function(){
  Nback.initialize($("#content"));
});
