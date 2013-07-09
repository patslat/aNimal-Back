Nback.Models.Nback = Backbone.Model.extend({

  initialize: function () {
    this.n = 1;
    this.sequences = [];
    this.currentResponse = [false, false];
    this.accuracy = [];
  },

  startRound: function (n) {
    this._generateSequences();
    this.accuracy = [];
    this.currentResponse = [false, false];
  },

  _generateSequences: function () {
    this.sequences = [];
    var blocks = [];
    //var sounds = ["A", "B", "C", "D", "E", "F", "G", "H"];
    var sounds = ["A", "B", "C", "D", "E", "F"];
    for (var i = 0; i < 20; i++) {
      var block = Math.floor(Math.random() * 8);
      var sound = sounds[Math.floor(Math.random() * sounds.length)];

      this.sequences.push([block, sound]);
    }
  },

  endPass: function (i) {
    var correct = this._getCorrectInput(i);
    var response = this.currentResponse;

    // console.log("END OF PASS THIS IS THE CORRECT")
    // console.log(correct)
    // console.log("this is what you said")
    // console.log(response)

    this.accuracy.push(
      (correct[0] === response[0]) && (correct[1] === response[1])
    )

    this.currentResponse = [false, false]
  },

  wonRound: function () {
    // console.log("END OF ROUND THIS IS THE ACCURACY")
    // console.log(this.getAccuracy())
    // console.log("by pass")
    // console.log(this.accuracy)
    return (this.getAccuracy() > .8);
  },

  getAccuracy: function () {
    var accuracy =
      _(this.accuracy).select(function (acc) {
        if (acc) return acc;
      }).length;

    return (accuracy / this.sequences.length);
  },

  _getCorrectInput: function (i) {
    if ((i + this.n) < this.sequences.length) {
      var currentVisual = this.sequences[i][0];
      var currentAuditory = this.sequences[i][1];

      var nbackVisual = this.sequences[i + this.n][0];
      var nbackAuditory = this.sequences[i + this.n][1];
      return [
        (currentVisual === nbackVisual),
        (currentAuditory === nbackAuditory)
      ];
    } else {
      return [false, false];
    }


  }

});
