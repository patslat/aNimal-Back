Nback.Models.Nback = Backbone.Model.extend({

  initialize: function () {
    this.n = 0;
    this.sequences = [];
    this.currentResponse = [false, false];
    this.accuracy = [];
  },

  startRound: function (n) {
    this.n += 1;
    console.log("STARTING")
    console.log(this.n)
    this._generateSequences();
    this.accuracy = [];
    this.currentResponse = [false, false];
  },

  _generateSequences: function () {
    this.sequences = [];
    var blocks = [];
    var sounds = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (var i = 0; i < 20; i++) {
      var block = Math.floor(Math.random() * 8);
      var sound = sounds[Math.floor(Math.random() * 8)];

      this.sequences.push([block, sound]);
    }
  },

  endPass: function (i) {
    var correct = this._getCorrectInput(i);
    var response = this.currentResponse;
    this.accuracy.push(
      (correct[0] === response[0]) && (correct[1] === response[1])
    )
  },

  wonRound: function () {
    var accuracy =
      _(this.accuracy).select(function (acc) {
        if (acc) return acc;
      }).length;
      console.log("ACCURACY")
      console.log(accuracy)
      console.log(this.sequences.length)

    return (accuracy / this.sequences.length > .75);
  },

  _getCorrectInput: function (i) {
    if ((i + this.n) < this.sequences.length) {
      var currentVisual = this.sequences[i][0];
      var currentAuditory = this.sequences[i][1];

      var nbackVisual = this.sequences[i + this.n][0];
      var nbackAuditory = this.sequences[i + this.n][1];
    }
    return [
      (currentVisual === nbackVisual),
      (currentAuditory === nbackAuditory)
    ];

  }

});
