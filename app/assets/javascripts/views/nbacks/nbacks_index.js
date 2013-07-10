Nback.Views.NbacksIndex = Backbone.View.extend({

  initialize: function () {
    this.game = new Nback.Models.Nback();
  },

  template: JST['nbacks/index'],

  events: {
    "click #start": "play",
    "click #show-stats": "displayStats",
    "click #close-stats": "closeStats"
  },

  render: function () {
    this.$el.html(this.template());
    this._renderStatus();
    return this;
  },

  play: function () {
    var self = this

    this.game.startRound();


    (function gameLoop (i) {
      self.game.response = [false, false];

      self._bindInputs();

      var block = self.game.sequences[i - 1][0];
      var sound = self.game.sequences[i - 1][1];
      // light and sound on
      setTimeout(function () {
        $.playSound("sounds/" + sound + ".mp3");
        $("#block-" + block).toggleClass("light");
      }, 10)

      // light and sound off
      setTimeout(function () {
        $("#block-" + block).toggleClass("light");
      }, 20)

      // time where input still allowed
      setTimeout(function () {
        self._unbindInputs();

        self.game.endPass(i - 1)

        if (--i) {
          gameLoop(i)
        } else {
          if (self.game.wonRound()) {
            self.game.n += 1;
            self._renderStatus();
            self._congratulate();
          } else {
            self.game.n = 1;
            self._renderStatus();
            self._fail();
          }
          self._statsLink();
          self._updateStats();
        }
      }, 30)

    })(this.game.sequences.length);
  },

  _renderStatus: function () {
    var status = "<h2>N = " + this.game.n + "</h2>";
    $(this.$el.find("#status")).html(status);
  },

  _congratulate: function () {
    var notice = "<div>You made it to the next level!</div>";
    $(this.$el.find("#status")).append(notice);
  },

  _fail: function () {
    var notice = "<div>You missed too many! Try again</div>";
    $(this.$el.find("#status")).append(notice);
  },

  _statsLink: function () {
    var btn = '<button id="show-stats" class="btn">See Stats</button>'
    $(this.$el.find("#status")).append(btn);
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
    // visual === 97; auditory === 108
    if (key === 97) {
      this.game.currentResponse[0] = true;
      this._indicate($("#location-indicator"));
    } else if (key === 108) {
      this.game.currentResponse[1] = true;
      this._indicate($("#auditory-indicator"));
    }
  },

  _indicate: function ($el) {
    $el.toggleClass("light");
    setTimeout( function () {
      $el.toggleClass("light")
    }, 200);
  },

  displayStats: function () {
    $(this.$el.find("#stats")).show("slow");
  },

  _updateStats: function () {
    var statsView = new Nback.Views.NbacksStats({
      model: this.game
    });
    $(this.$el.find("#stats")).html(statsView.render().$el);
  },

  closeStats: function () {
    $(this.$el.find("#stats")).hide("slow");
  },

});
