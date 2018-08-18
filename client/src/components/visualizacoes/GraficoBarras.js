import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries
} from "react-vis";

import React, { Component } from "react";

export default class GraficoBarras extends Component {
  render() {
    return (
      <div className="GraficoBarras container">
        <div className="row">
          <div className="col">Texto Texto</div>
          <div className="col">
            <XYPlot width={400} height={400} xType="ordinal">
              <VerticalBarSeries
                fill="blue"
                line="black"
                stroke="blue"
                data={[
                  { x: "pt", y: -10 },
                  { x: "pmdb", y: -5 },
                  { x: "psdb", y: -15 }
                ]}
              />
              <XAxis />
              <YAxis />
            </XYPlot>
          </div>
        </div>
      </div>
    );
  }
}
