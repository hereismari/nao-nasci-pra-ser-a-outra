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
  DecorativeAxis,
  makeWidthFlexible
} from "react-vis";

import PropTypes from "prop-types";

import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import purple from "@material-ui/core/colors/purple";
import lightBlue from "@material-ui/core/colors/lightBlue";
import xAxis from "react-vis/dist/plot/axis/x-axis";
import axios from "axios";
import classnames from "classnames";

const getColorGrafico = porcMulheresPartido => {
  return parseInt(porcMulheresPartido * 10) * 100;
};

const MARGIN = {
  left: 10,
  right: 10,
  bottom: 80,
  top: 60
};

const API_DADOS_2014 =
  "http://naoaoutra.herokuapp.com/partidos/participacao/mulheres?ano_eleicao=2014";

const API_DADOS_2016 =
  "http://naoaoutra.herokuapp.com/partidos/participacao/mulheres?ano_eleicao=2016";

const tipStyle = {
  display: "flex",
  color: "#fff",
  background: "#000",
  alignItems: "right",
  padding: "2px"
};

const boxStyle = { height: "2px", width: "2px" };

function buildValue(value) {
  return value;
}

export default class GraficoBarras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      filterAno: "2016",
      dados2016: [],
      dados2014: [],
      isLoading: false,
      dados: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get(API_DADOS_2014)
      .then(res => res.data)
      .then(data => this.setState({ dados2014: data }))
      .catch(err => console.log(err));

    axios
      .get(API_DADOS_2016)
      .then(res => res.data)
      .then(data =>
        this.setState({ dados: data, dados2016: data, isLoading: false })
      )
      .catch(err => console.log(err));
  }

  filtraPorAno(e) {
    e.preventDefault();
    if (e.target.id === "2014") {
      this.setState({ dados: this.state.dados2014 });
    } else if (e.target.id === "2016") {
      this.setState({ dados: this.state.dados2016 });
    }
    this.setState({ filterAno: e.target.id });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextState.filterAno !== this.state.filterAno ||
  //     nextState.dados.length !== this.state.dados.length
  //   );
  // }

  render() {
    const maisMulheres = [];
    const menosMulheres = [];

    if (this.state.isLoading || this.state.dados.length === 0) {
      return <div>Loadgin</div>;
    }

    console.log(this.state.dados);

    const partidos = this.state.dados.map(elem => elem._id.sigla_partido);

    this.state.dados.map(elem => {
      if (elem.porcentagem_mulheres < 0.5) {
        menosMulheres.push({
          x: elem._id.sigla_partido,
          y: -(1 - elem.porcentagem_mulheres),
          color: blue[getColorGrafico(1 - elem.porcentagem_mulheres)],
          legenda:
            "Porcentagem de homens: " +
            Math.round((1 - elem.porcentagem_mulheres) * 100) +
            "%"
        });
      } else
        maisMulheres.push({
          x: elem._id.sigla_partido,
          y: -elem.porcentagem_mulheres,
          color: pink[getColorGrafico(elem.porcentagem_mulheres)],
          legenda:
            "Porcentagem de mulheres: " +
            Math.round(elem.porcentagem_mulheres * 100) +
            "%"
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

    var finalData = [];

    maisMulheres.map(elem => {
      finalData.push(elem);
    });
    menosMulheres.map(elem => {
      finalData.push(elem);
    });

    const barChart = ({ width }) => (
      <XYPlot width={width} height={400} margin={MARGIN} xType="ordinal">
        <XAxis
          orientation="top"
          hideLine
          tickValues={partidos}
          style={{
            line: { stroke: purple },
            text: {
              stroke: "white",
              fill: "white",
              fontWeight: 100
            }
          }}
        />
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
            <div style={tipStyle} className="texto-termometro">
              <div style={{ ...boxStyle }} />
              {this.state.value.legenda}
            </div>
          </Hint>
        ) : null}
      </XYPlot>
    );
    barChart.propTypes = {
      width: PropTypes.number,
      measurements: PropTypes.array
    };

    const FlexibleBarChart = makeWidthFlexible(barChart);

    const filter = this.state.filterAno === "2014";
    console.log(filter);

    return (
      <div className="GraficoBarras">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-xs-12 col-lg-12 texto-termometro text-center">
            <div
              className={classnames("btn btn-dark", {
                "btn-light": true
              })}
              onClick={this.filtraPorAno.bind(this)}
              style={{ margin: 2 }}
              id={2014}
            >
              2014
            </div>
            <div
              className="btn btn-dark"
              onClick={this.filtraPorAno.bind(this)}
              id={2016}
              style={{ margin: 2 }}
            >
              2016
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-1 col-2 col-sm-2 col-md-2 col-xs-2 col-lg-2 texto-termometro">
            % Mulheres
          </div>
          <div className="col-2 col-sm-2 col-md-2 col-xs-2 offset-md-7 offset-7 offset-sm-7 offset-xs-7 offset-lg-7 texto-termometro">
            % Homens
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-xs-12 col-lg-12">
          <div className="termometro">.</div>
          <FlexibleBarChart />
        </div>
      </div>
    );
  }
}
