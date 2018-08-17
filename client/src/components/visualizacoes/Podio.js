import React, { Component } from "react";
import NVD3Chart from "react-nvd3/dist/react-nvd3";

export default class Podio extends Component {
  constructor() {
    super();
    this.state = {
      className: "hidden"
    };
  }

  handleScroll() {
    console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 5) {
      this.setState({
        className: "show"
      });
    }
    if (document.documentElement.scrollTop > 100) {
      this.setState({
        className: "hidden"
      });
    }
  }

  componentDidMount() {
    window.onscroll = () => this.handleScroll();
  }

  getDados() {
    const datum = [
      {
        key: "Cumulative Return",
        values: [
          {
            label: "A",
            value: -29.765957771107
          },
          {
            label: "B",
            value: 0
          },
          {
            label: "C",
            value: 32.807804682612
          },
          {
            label: "D",
            value: 196.45946739256
          },
          {
            label: "E",
            value: 0.19434030906893
          },
          {
            label: "F",
            value: -98.079782601442
          },
          {
            label: "G",
            value: -13.925743130903
          },
          {
            label: "H",
            value: -5.1387322875705
          }
        ]
      }
    ];
    return datum;
  }
  render() {
    const podio = (
      <NVD3Chart
        id="barChart"
        type="discreteBarChart"
        datum={this.getDados()}
        x="label"
        y="value"
      />
    );
    return (
      <div className="Podio">
        <div className="container" style={{ height: "1000px" }}>
          <div className="row">
            <div>{podio}</div>
          </div>
        </div>
      </div>
    );
  }
}
