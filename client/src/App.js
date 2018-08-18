import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./diamonds.css";
import $ from 'jquery'
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
        <div className="container-fluid">
          <div className="row part1">
                <div className="col-md-6 col-xs-6 col-12 col-sm-12">
                  <div className="left-container">
                    <span>30%</span><h3>Lorem Ipsum dollor sit amet</h3>
                    <img src={require("./img/img-left-part1.png")} />
                  </div>
                </div>
                <div className="col-md-6 col-xs-6 col-12 col-sm-12 right-container">
                  <img src={require("./img/logo.png")} />
                  <h3>Pesquisa quantitativa não probabilística. Formulário respondido no Google Docs e compartilhado organicamente entre mulheres que trabalham em agência de publicidade</h3>
                </div>
          </div>
          <div className="row part2">
            <div className="col-md-12 col-xs-12 col-12 col-sm-12">
                <GraficoBarras />
            </div>
            <div className="col-md-12 col-xs-12 col-12 col-sm-12 container-part2">
              <div className="row">
                  <div className="col-md-6 col-xs-6 col-12 col-sm-12 text1-part2">
                    <div>
                      <span>30%</span><h3>Lorem Ipsum dollor sit amet</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-6 col-12 col-sm-12 text2-part2">
                      <h3>Pesquisa quantitativa não probabilística. Formulário respondido no Google Docs e compartilhado organicamente entre mulheres que trabalham em agência de publicidade</h3>
                  </div>
              </div>
            </div>
          </div>
          <div className="row part3">
            <h1 className="col-md-12 col-xs-12 col-12 col-sm-12">Lorem Ipsum dollor sit amet</h1>
            <div className="col-md-8 col-xs-8 col-12 col-sm-12">
                <GraficoBarras />
            </div>
            <div className="col-md-4 col-xs-4 col-12 col-sm-12 text-part3">
                <div>
                  <div className="row">
                      <span>30%</span>
                      <div className="ajuste-porcent-sub">
                        <h3>Lorem Ipsum dollor sit amet</h3>
                      </div>
                  </div>
                      <h3>Pesquisa quantitativa não probabilística. Formulário respondido no Google Docs e compartilhado organicamente entre mulheres que trabalham em agência de publicidade</h3>
                </div>
            </div>
          </div>
          <div className="row part4">
            <h1 className="col-md-12 col-xs-12 col-12 col-sm-12">Lorem Ipsum dollor sit amet</h1>
            <div className="col-md-12 col-xs-12 col-12 col-sm-12">
              <div className="diamond-grid">
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount () {
    const script = document.createElement("script");
      script.src = "./jquery.diamonds";
      script.async = true;

      document.body.appendChild(script);
  }

}

  $(document).ready(function(){
   $(".diamond-grid").click(function(){
      alert("The paragraph is now hidden");
    });
  });

export default App;