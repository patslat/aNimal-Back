Nback.Views.NbacksIndex = Backbone.View.extend({

  initialize: function () {
    this.game = new Nback.Models.Nback();
  },

  template: JST['nbacks/index'],

  events: {
    "click #start": "play",
  },

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  play: function (n) {
    var self = this
    this.game.n = n || 1
    this.game.generateSequences();

    (function gameLoop (i) {
      self.game.response = [false, false];

      self._bindInputs();

      var block = self.game.sequences[i - 1][0];
      var sound = self.game.sequences[i - 1][1];

      setTimeout(function () {
        $.playSound("sounds/" + sound + ".mp3");
        $("#block-" + block).toggleClass("light");
      }, 1000)
      setTimeout(function () {
        $("#block-" + block).toggleClass("light");
        self._unbindInputs();

        self.game.endPass(i - 1)

        if (--i) {
          gameLoop(i)
        } else {
          if (self.game.wonRound()) {
            console.log("Winner Winner Chicken Dinner");
            self.play(n + 1);
          } else {
            console.log("You lost at n = " + this.game.n);
          }
        }
      }, 2000)

    })(this.game.sequences.length);
  },

  _bindInputs: function () {
    _.bindAll(this);
    $(document).on("keypress", this._registerResponse);
  },

  _unbindInputs: function () {
    $(document).off('keypress', this._registerResponse);
  },


  _registerResponse: function (event) {
    this._giveFeedback(event.keyCode);
  },

  _giveFeedback: function (key) {
    // auditory === 97; visual === 108
    if (key === 97) {
      this.game.currentResponse[1] = true;
      this._indicate($("#location-indicator"));
    } else if (key === 108) {
      this.game.currentResponse[0] = true;
      this._indicate($("#auditory-indicator"));
    }
  },

  _indicate: function ($el) {
    $el.toggleClass("light");
    setTimeout( function () {
      $el.toggleClass("light")
    }, 200);
  },

});
