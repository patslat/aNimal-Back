Nback.Views.NbacksIndex = Backbone.View.extend({

  initialize: function () {

  },

  template: JST['nbacks/index'],

  events: {
    "click #start": "play",
  },

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  play: function () {
    var self = this
    var game = new Nback.Models.Nback();
    var sequence = game.generateSequence();

    (function gameLoop (i) {
      self._bindInputs();

      var block = sequence[i - 1][0];
      var sound = sequence[i - 1][1];

      setTimeout(function () {
        $.playSound("sounds/" + sound + ".mp3")
        $("#block-" + block).toggleClass("light");
      }, 1000)
      setTimeout(function () {
        $("#block-" + block).toggleClass("light");
        self._unbindInputs();
        if (--i) gameLoop(i);
      }, 2000)

    })(sequence.length)

  },

  _bindInputs: function () {
    _.bindAll(this)
    $(document).on("keypress", this._registerResponse)
  },

  _unbindInputs: function () {
    $(document).off('keypress', this._registerResponse);
  },


  _registerResponse: function (event) {
    this._giveFeedback(event.keyCode)
  },

  _giveFeedback: function (key) {
    // a === 97; l === 108
    if (key === 97) {
      this._indicate($("#location-indicator"))
    } else if (key === 108) {
      this._indicate($("#auditory-indicator"))
    }
  },

  _indicate: function ($el) {
    $el.toggleClass("light");
    setTimeout( function () {
      $el.toggleClass("light")
    }, 200);
  },

});
