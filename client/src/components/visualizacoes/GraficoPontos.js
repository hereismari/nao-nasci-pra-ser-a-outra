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

export default class GraficoPontos extends Component {
  render() {
    return (
      <div>
        <XYPlot width={300} height={300}>
          <XAxis />
          <YAxis />
          <MarkSeries
            className="mark-series-example"
            strokeWidth={2}
            opacity="0.8"
            sizeRange={[5, 15]}
            data={[
              { x: 1, y: 10, size: 30 },
              { x: 1.7, y: 12, size: 10 },
              { x: 2, y: 5, size: 1 },
              { x: 3, y: 15, size: 12 },
              { x: 2.5, y: 7, size: 4 }
            ]}
          />
        </XYPlot>
      </div>
    );
  }
}
