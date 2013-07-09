Nback.Models.Nback = Backbone.Model.extend({

  generateSequence: function () {
    var sequences = [];
    var blocks = [];
    var sounds = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (var i = 0; i < 20; i++) {
      var block = Math.floor(Math.random() * 8);
      var sound = sounds[Math.floor(Math.random() * 8)];

      sequences.push([block, sound]);
    }

    return sequences;
  }

});
