import React, { Component } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries
} from "react-vis";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";

const dataMulheres = [
  {
    _id: {
      sigla_partido: "PMB"
    },
    porcentagem_mulheres: 0.4373259052924791,
    total: 1795,
    total_mulheres: 785
  },
  {
    _id: {
      sigla_partido: "PSTU"
    },
    porcentagem_mulheres: 0.3983050847457627,
    total: 118,
    total_mulheres: 47
  }
];

export default class GraficoBarras extends Component {
  render() {
    const dataPlot = dataMulheres.map(elem => {
      console.log(elem);
      return {
        x: elem._id.sigla_partido,
        y: elem.total_mulheres,
        color: purple[900]
      };
    });

    return (
      <div className="GraficoBarras container">
        <div className="row">
          <div className="col">Texto Texto</div>
          <div className="col">
            <XYPlot width={400} height={400} xType="ordinal">
              <VerticalBarSeries
                colorType="literal"
                stroke="blue"
                data={dataPlot}
                onSeriesMouseOver={() => console.log(dataPlot)}
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
