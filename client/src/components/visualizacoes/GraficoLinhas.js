import React, { Component } from "react";
import "./../../App.css";
import { select } from "d3-selection";
import { max, min } from "d3-array";
import { axisBottom } from "d3-axis";
import * as d3 from "d3";
import axios from "axios";

const margin = { top: 40, right: 10, bottom: 40, left: 10 };
const width = 600 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const API_DADOS = "http://naoaoutra.herokuapp.com/historico";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.createLineChart = this.createLineChart.bind(this);
    this.state = { isLoading: false, dados: [] };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(API_DADOS)
      .then(res => res.data)
      .then(data => {
        const presidentialElections = data.filter(function (d) {
          return (d.ano_eleicao - 2000) % 4 === 0;
        });
        this.setState({ dados: presidentialElections })
      })
      .catch(err => console.log(err));
    this.createLineChart();
  }

  componentDidUpdate() {
    this.createLineChart();
  }

  createLineChart() {
    const node = this.node;

    const chart = select(node)
      .attr("viewBox", "0 0 " + (width + margin.left) + " " + (height + margin.top + margin.bottom))
      .attr("width", "90%");

    const parseTime = d3.timeParse("%Y");
    
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const valueline = d3
      .line()
      .x(function(d) {
        return x(d.ano_eleicao);
      })
      .y(function(d) {
        return y(d.total_candidate_fem);
      });

    const valueline2 = d3
      .line()
      .x(function(d) {
        return x(d.ano_eleicao);
      })
      .y(function(d) {
        return y(d.total_ghosts_fem);
      });

    function draw(mData) {
      const data = mData;
      
      data.forEach(function(d) {
        d.ano_eleicao = parseTime(d.ano_eleicao);
        d.total_candidate_fem = +d.total_candidate_fem;
        d.total_ghosts_fem = +d.total_ghosts_fem;
      });

      // sort years ascending
      data.sort(function(a, b) {
        return a["Date"] - b["Date"];
      });
  
      const dataMax = d3.max(data, function(d) {
        return Math.max(d.total_candidate_fem, d.total_ghosts_fem);
      });
      
      // Scale the range of the data
      x.domain(
        d3.extent(data, function(d) {
          return d.ano_eleicao;
        })
      );
      
      y.domain([
        0,
        dataMax,
      ]);
      
      const g = chart
        .append("g")
        .attr("transform", "translate(" + 30 + ", " + 30 + ")");

      // Add the valueline path.
      g.append("path")
        .data([data])
        .attr("class", "line-linechart")
        .attr("d", valueline);

      // Add the valueline path.
      g.append("path")
        .data([data])
        .attr("class", "line-linechart-gaxis")
        .attr("d", valueline2);

      const parsedYear2009 = parseTime("2009");
      g.append("line")
        .attr("x1", x(parsedYear2009))
        .attr("y1", y(0))
        .attr("x2", x(parsedYear2009))
        .attr("y2", y(dataMax))
        .style("stroke-dasharray", "3, 3")
        .style("stroke-width", 2)
        .style("stroke", "#fff43c")
        .style("fill", "none");

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0, " + height + ")")
        .call(axisBottom(x).ticks(6));

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10).tickFormat(function(data) {return parseInt(data / 1000) + "k";}))
        .attr("fill", "#fff")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("text-anchor", "end")
        .attr("font-size", "23px")
        .attr("fill", "white")
        .text("Candidatas)");
  
      g.append("g")
        .attr("class", "axis axis--y gaxis")
        .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(y).tickSize(0).tickFormat(""))
        .attr("fill", "#FF9B27")
        .append("text")
        .attr("transform", "rotate(270)")
        .attr("y", 10)
        .attr("x", -height + 105)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Candidatas fanstamas");
    }
    
    draw(this.state.dados);
  }
  
  render() {
    return (
      <svg ref={node => (this.node = node)} width={width} height={height} />
    );
  }
}
export default LineChart;
