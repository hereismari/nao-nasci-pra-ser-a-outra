import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries
} from "react-vis";
import GraficoBarras from "./components/visualizacoes/GraficoBarras";
import GraficoPontos from "./components/visualizacoes/GraficoPontos";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-xs-6 col-12 col-sm-12">
                <GraficoBarras />
              </div>
              <div className="col-md-6 col-xs-6 col-12 col-sm-12">
                <img src={require("./img/logo.png")} width="90%" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xs-6">
            <GraficoPontos />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
