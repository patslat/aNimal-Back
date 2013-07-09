Nback.Views.NbacksIndex = Backbone.View.extend({

  template: JST['nbacks/index'],

  events: {
    "click #start": "play"
  },

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  play: function () {
    var game = new Nback.Models.Nback();
    var sequence = game.generateSequence();

    (function gameLoop (i) {
      var block = sequence[i - 1][0];
      var sound = sequence[i - 1][1];

      setTimeout(function () {
        $.playSound("sounds/" + sound + ".mp3")
        $("#block-" + block).toggleClass("light");
      }, 1000)
      setTimeout(function () {
        $("#block-" + block).toggleClass("light");
        if (--i) gameLoop(i);
      }, 2000)

    })(sequence.length)
  }


});
