import React, { Component } from 'react'
import './../../App.css'
import { select } from 'd3-selection'
import { max, min } from 'd3-array'
import { axisBottom } from 'd3-axis'
import * as d3 from "d3";

const margin = {top: 40, right: 10, bottom: 40, left: 10};
// const margin = {top: 20, right: 80, bottom: 30, left: 100};
const width = 500 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

class LineChart extends Component {
  
  constructor(props){
    super(props);
    this.createLineChart = this.createLineChart.bind(this)
  }

  componentDidMount() {
    this.createLineChart()
  }

  componentDidUpdate() {
    this.createLineChart()
  }

  createLineChart() {
    const node = this.node;
    
    const chart =  select(node)
      .attr('viewBox', '150 0 '+(width + margin.left)+' '+(height + margin.top + margin.bottom))
      .attr('width', '90%');
    
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
  
    const valueline = d3.line()
      .x(function(d) { return x(d.Date); })
      .y(function(d) { return y(d.Imports); });
  
    const valueline2 = d3.line()
      .x(function(d) { return x(d.Date); })
      .y(function(d) { return y(d.Exports); });
    
    function draw(mData, country) {
      
      var data = mData[country];
    
      // format the data
      data.forEach(function(d) {
        d.Date = +d.Date;
        d.Imports = +d.Imports;
        d.Exports = +d.Exports;
      });
    
      // sort years ascending
      data.sort(function(a, b){
        return a["Date"]-b["Date"];
      });
    
      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.Date; }));
      y.domain([0, d3.max(data, function(d) {
        return Math.max(d.Imports, d.Exports); })]);
      
      const dataIn2009 = data.filter(function (elem) {
        return elem.Date === 2009;
      });
      
      var dataMax = max(dataIn2009, function(d) { return Math.max(d.Imports, d.Exports); });
      var dataMin = min(dataIn2009, function(d) { return Math.min(d.Imports, d.Exports); });
      
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
        .attr("class", "line-linechart")
        .attr("d", valueline2);
  
      g.append("line")
        .attr("x1", x(2009))
        .attr("y1", y(0))
        .attr("x2", x(2009))
        .attr("y2", y(dataMax))
        .style("stroke-dasharray", ("3, 3"))
        .style("stroke-width", 2)
        .style("stroke", "white")
        .style("fill", "none");
        
      g.append("g")
        .attr("class", "axis axis--x axisWhite")
        .attr("transform", "translate(0, " + height + ")")
        .call(axisBottom(x).ticks(10));
      
      g.append("g")
        .attr("class", "axis axis--y axisWhite")
        .call(d3.axisLeft(y).ticks(10).tickFormat(function(data) { return parseInt(data / 1000) + "k"; }))
        .attr("fill", "#fff")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .text("Population)");
      
      // text label for the x axis
      // select(node)
      //   .append("text")
      //   .attr("transform",
      //     "translate(" + (width/2) + " ," +
      //     (height + margin.top + 20) + ")")
      //   .style("text-anchor", "middle")
      //   .text("Date");
  
      // text label for the y axis
      // select(node)
      //   .append("text")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", 0 - margin.left)
      //   .attr("x",0 - (height / 2))
      //   .attr("dy", "1em")
      //   .style("text-anchor", "middle")
      //   .text("Value");
      
    }
  
    draw(this.props.data, "Afghanistan");
  }
  render() {
    return <svg ref={node => this.node = node}
                width={width} height={height}>
    </svg>
  }
}
export default LineChart