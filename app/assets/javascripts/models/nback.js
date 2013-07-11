Nback.Models.Nback = Backbone.Model.extend({

  initialize: function () {
    this.n = 1;
    this.sequences = [];
    this.currentResponse = [false, false];
    // accuracy is an array of pairs of booleans
    // representing [visual correct?, auditory correct?]
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

    this.accuracy.push(
      [correct[0] === response[0], correct[1] === response[1]]
    )

    this.currentResponse = [false, false]
  },

  wonRound: function () {
    return (this.getAccuracy() > .8);
  },

  getStats: function () {
    return {
      game: {
        overall_correct: this.overallCorrect(),
        visual_correct: this.visualCorrect(),
        auditory_correct: this.auditoryCorrect(),
        sequences: this.sequences.length
      }
    }
  },

  getAccuracy: function () {
    var accuracy = this.overallCorrect();
    return (accuracy / this.sequences.length);
  },

  overallCorrect: function () {
    var correctCount =
      _(this.accuracy).select(function (acc) {
        // count as correct if both visual and auditory are true
        if (acc[0] && acc[1]) return acc;
      }).length;
    return correctCount;
  },

  overallMiss: function () {
    var missCount = (this.sequences.length - this.overallCorrect());
    return missCount;
  },

  visualCorrect: function () {
    var correctCount =
      _(this.accuracy).select(function (acc) {
        if (acc[0]) return acc;
      }).length;
    return correctCount;
  },

  visualMiss: function () {
    var missCount = (this.sequences.length - this.visualCorrect());
    return missCount;
  },

  auditoryCorrect: function () {
    var correctCount =
      _(this.accuracy).select(function (acc) {
        if (acc[1]) return acc;
      }).length;
    return correctCount;
  },

  auditoryMiss: function () {
    var missCount = (this.sequences.length - this.auditoryCorrect());
    return missCount;
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