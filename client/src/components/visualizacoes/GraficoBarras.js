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
      <div>
        <XYPlot width={300} height={300} xType="ordinal">
          <VerticalBarSeries
            fill={"blue"}
            stroke="blue"
            data={[
              { x: "pt", y: 10 },
              { x: "pmdb", y: 5 },
              { x: "psdb", y: 15 }
            ]}
          />
          <XAxis />
          <YAxis />
        </XYPlot>
      </div>
    );
  }
}
