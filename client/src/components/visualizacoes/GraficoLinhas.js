import React, { Component } from 'react'
import './../../App.css'
import { select } from 'd3-selection'
import { max, min } from 'd3-array'
import { axisBottom, axisLeft } from 'd3-axis'
import * as d3 from "d3";

const margin = {top: 80, right: 20, bottom: 30, left: 50};
const width = 500 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

class LineChart extends Component {
  
  constructor(props){
    super(props)
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
  
    const x = d3.scaleTime().range([0, width]);
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
        d.Imports = +d.Imports;
        d.Exports = +d.Exports;
      });
    
      // sort years ascending
      data.sort(function(a, b){
        return a["Date"]-b["Date"];
      })
    
      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.Date; }));
      y.domain([0, d3.max(data, function(d) {
        return Math.max(d.Imports, d.Exports); })]);
      
      const dataIn2009 = data.filter(function (elem) {
        return elem.Date === 2009;
      });
      
      var dataMax = max(dataIn2009, function(d) { return Math.max(d.Imports, d.Exports); });
      var dataMin = min(dataIn2009, function(d) { return Math.min(d.Imports, d.Exports); });
      
      // Add the valueline path.
      select(node)
        .append("path")
        .data([data])
        .attr("class", "line-linechart")
        .attr("d", valueline);
    
      // Add the valueline path.
      select(node)
        .append("path")
        .data([data])
        .attr("class", "line-linechart")
        .attr("d", valueline2);
    
      // Add the X Axis
      select(node)
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x));
    
      // Add the Y Axis
      select(node)
        .append("g")
        .call(axisLeft(y));
      
      select(node)
        .append("line")
        .attr("x1", x(2009))
        .attr("y1", y(0))
        .attr("x2", x(2009))
        .attr("y2", y(dataMax))
        .style("stroke-width", 2)
        .style("stroke", "white")
        .style("fill", "none");
    
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