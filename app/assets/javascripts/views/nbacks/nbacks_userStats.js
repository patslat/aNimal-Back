Nback.Views.UserStats = Backbone.View.extend({
  template: JST["nbacks/userStats"],

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  buildSVG: function () {

    var margin = {top: 60, right: 20, bottom: 150, left: 150},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#FF8E59", "#6469FF", "#77CC57", "#FF0009", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("#user-stats-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("games.csv", function(error, data) {

      var performanceMeasures = d3.keys(data[0]).filter(function(key) {
        return (key !== "id") &&
        (key !== "updated_at") &&
        (key !== "created_at") &&
        (key !== "sequences") &&
        (key !== "user_id");
      });


      data.forEach(function(d) {
        d.performance = performanceMeasures.map(function(measure) { return {measure: measure, value: +d[measure]}; });
      });

      x0.domain(data.map(function(d) { return d.id; }));

      x1.domain(performanceMeasures).rangeRoundBands([0, x0.rangeBand()]);

      y.domain([0, 25]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("font-size", 50)
          .attr("y", 100)
          .attr("x", 400)
          .style("text-anchor", "end")
          .text("Games Played \u2192")


      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("font-size", 50)
          .attr("transform", "rotate(-90)")
          .attr("y", -100)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Correct Answers");

      var game = svg.selectAll(".id")
          .data(data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) {return "translate(" + x0(d.id) + ",0)"; });

      game.selectAll("rect")
          .data(function(d) { return d.performance; })
        .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.measure); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .style("fill", function(d) { return color(d.measure); });

      var legend = svg.selectAll(".legend")
          .data(performanceMeasures.slice().reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate("+ -i * 150 +",0)"; });

      legend.append("rect")
          .attr("x", 600)
          .attr("y", -40)
          .attr("width", 18)
          .attr("height", 18)
          .attr("id", "legend")
          .style("anchor", "start")
          .style("fill", color);

      legend.append("text")
          .attr("x", 620)
          .attr("y", -30)
          .attr("dy", ".35em")
          .text(function(d) { return d.replace(/_/, " "); });

    });
  }


})