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
import lightBlue from "@material-ui/core/colors/lightBlue";
import xAxis from "react-vis/dist/plot/axis/x-axis";

const getColorGrafico = porcMulheresPartido => {
  return parseInt(porcMulheresPartido * 10) * 100;
};

const dataMulheres = [
  {
    _id: {
      sigla_partido: "PMB"
    },
    porcentagem_mulheres: 0.1373259052924791,
    total: 1795,
    total_mulheres: 785
  },
  {
    _id: {
      sigla_partido: "PSTU"
    },
    porcentagem_mulheres: 0.2783050847457627,
    total: 118,
    total_mulheres: 47
  },
  {
    _id: {
      sigla_partido: "PMED"
    },
    porcentagem_mulheres: 0.3883050847457627,
    total: 118,
    total_mulheres: 47
  },
  {
    _id: {
      sigla_partido: "PR"
    },
    porcentagem_mulheres: 0.4883050847457627,
    total: 118,
    total_mulheres: 47
  },
  {
    _id: {
      sigla_partido: "PMA"
    },
    porcentagem_mulheres: 0.583050847457627,
    total: 118,
    total_mulheres: 47
  },
  {
    _id: {
      sigla_partido: "PAK"
    },
    porcentagem_mulheres: 0.6883050847457627,
    total: 118,
    total_mulheres: 47
  },
  {
    _id: {
      sigla_partido: "PPP"
    },
    porcentagem_mulheres: 0.7883050847457627,
    total: 118,
    total_mulheres: 47
  },
  {
    _id: {
      sigla_partido: "PPPA"
    },
    porcentagem_mulheres: 0.8883050847457627,
    total: 118,
    total_mulheres: 47
  },
  {
    _id: {
      sigla_partido: "PPPaaa"
    },
    porcentagem_mulheres: 0.9883050847457627,
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
    const maisMulheres = [];
    const menosMulheres = [];
    dataMulheres.map(elem => {
      if (elem.porcentagem_mulheres < 0.5) {
        menosMulheres.push({
          x: elem._id.sigla_partido,
          y: -(1 - elem.porcentagem_mulheres),
          color: lightBlue[getColorGrafico(1 - elem.porcentagem_mulheres)],
          legenda: "Porcentagem de homens: " + (1 - elem.porcentagem_mulheres)
        });
      } else
        maisMulheres.push({
          x: elem._id.sigla_partido,
          y: -elem.porcentagem_mulheres,
          color: purple[getColorGrafico(elem.porcentagem_mulheres)],
          legenda: "Porcentagem de mulheres: " + elem.porcentagem_mulheres
        });
    });

    menosMulheres.sort((a, b) => {
      if (Math.abs(a.y) > Math.abs(b.y)) return 1;
      else if (Math.abs(a.y) < Math.abs(b.y)) return -1;
      else return 0;
    });

    maisMulheres.sort((a, b) => {
      if (Math.abs(a.y) > Math.abs(b.y)) return -1;
      else if (Math.abs(a.y) < Math.abs(b.y)) return 1;
      else return 0;
    });

    console.log(maisMulheres);
    console.log(menosMulheres);

    var finalData = [];

    maisMulheres.map(elem => {
      finalData.push(elem);
    });
    menosMulheres.map(elem => {
      finalData.push(elem);
    });

    return (
      <div className="GraficoBarras container">
        <div className="row">
          <div className="col">Texto Texto</div>
          <div className="col">
            <XYPlot width={400} height={400} xType="ordinal">
              <VerticalBarSeries
                colorType="literal"
                opacity={0.8}
                strokeWidth="500px"
                data={finalData}
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
                      " " +
                      this.state.value.legenda}
                  </div>
                </Hint>
              ) : null}
              <XAxis
                orientation="top"
                hideTicks
                style={{
                  line: { stroke: purple },
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
