import React, { Component } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  Hint,
  DecorativeAxis
} from "react-vis";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import xAxis from "react-vis/dist/plot/axis/x-axis";

const getColorGrafico = nVotos => {
  let saturacao = nVotos % 100;
  let corFinal;

  if (saturacao === 0) {
    return nVotos;
  } else if (saturacao < 50) {
    return 50;
  } else {
    corFinal = nVotos / 100;
    if (corFinal > 900) {
      return 900;
    } else {
      return Math.round(corFinal) * 100;
    }
  }
};

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

const tipStyle = {
  display: "flex",
  color: "#fff",
  background: purple[800],
  alignItems: "center",
  padding: "2px"
};

const boxStyle = { height: "2px", width: "2px" };

function buildValue(value) {
  return value;
}

export default class GraficoBarras extends Component {
  constructor(props) {
    super(props);
    this.state = { value: false };
  }
  render() {
    const dataPlot = dataMulheres.map(elem => {
      return {
        x: elem._id.sigla_partido,
        y: -elem.total_mulheres,
        color: purple[getColorGrafico(elem.total_mulheres)]
      };
    });

    return (
      <div className="GraficoBarras container">
        <div className="row">
          <div className="col">Texto Texto</div>
          <div className="col">
            <XYPlot width={400} height={400} xType="ordinal">
              <VerticalBarSeries
                width={50}
                colorType="literal"
                stroke="blue"
                data={dataPlot}
                onValueMouseOver={v =>
                  this.setState({ value: v.x && v.y ? v : false })
                }
                onSeriesMouseOut={() => this.setState({ value: false })}
              />
              {this.state.value ? (
                <Hint value={buildValue(this.state.value)}>
                  <div style={tipStyle}>
                    <div style={{ ...boxStyle }} />
                    {"Partido: " +
                      this.state.value.x +
                      " Total de mulheres: " +
                      this.state.value.y * -1}
                  </div>
                </Hint>
              ) : null}
              <XAxis
                orientation="top"
                title="<- Partidos que contém mais mulheres VS Partidos que contém mais homens ->"
                hideTicks
                style={{
                  line: { stroke: "#ADDDE1" },
                  ticks: { stroke: "#ADDDE1" },
                  text: {
                    stroke: "none",
                    fill: "#6b6b76",
                    fontWeight: 600
                  }
                }}
              />
            </XYPlot>
          </div>
        </div>
      </div>
    );
  }
}
