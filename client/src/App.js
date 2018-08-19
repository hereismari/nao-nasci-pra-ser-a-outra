import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";
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
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import VotosVSInvestimentos from "./components/visualizacoes/VotosVSInvestimentos";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row part1">
            <div className="col-md-6 col-xs-6 col-12 col-sm-12">
              <div className="left-container">
                <span>30%</span>
                <h3>Lorem Ipsum dollor sit amet</h3>
                <img src={require("./img/img-left-part1.png")} />
              </div>
            </div>
            <div className="col-md-6 col-xs-6 col-12 col-sm-12 right-container">
              <img src={require("./img/logo.png")} />
              <h3>
                Pesquisa quantitativa não probabilística. Formulário respondido
                no Google Docs e compartilhado organicamente entre mulheres que
                trabalham em agência de publicidade
              </h3>
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
                    <span>30%</span>
                    <h3>Lorem Ipsum dollor sit amet</h3>
                  </div>
                </div>
                <div className="col-md-6 col-xs-6 col-12 col-sm-12 text2-part2">
                  <h3>
                    Pesquisa quantitativa não probabilística. Formulário
                    respondido no Google Docs e compartilhado organicamente
                    entre mulheres que trabalham em agência de publicidade
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row part3">
            <h1 className="col-md-12 col-xs-12 col-12 col-sm-12">
              Lorem Ipsum dollor sit amet
            </h1>
            <div className="col-md-8 col-xs-8 col-12 col-sm-12">
              <VotosVSInvestimentos />
            </div>
            <div className="col-md-4 col-xs-4 col-12 col-sm-12 text-part3">
              <div>
                <div className="row">
                  <span>30%</span>
                  <div className="ajuste-porcent-sub">
                    <h3>Lorem Ipsum dollor sit amet</h3>
                  </div>
                </div>
                <h3>
                  Pesquisa quantitativa não probabilística. Formulário
                  respondido no Google Docs e compartilhado organicamente entre
                  mulheres que trabalham em agência de publicidade
                </h3>
              </div>
            </div>
          </div>
          <div className="row partItalo">
            <h1 className="col-md-12 col-xs-12 col-12 col-sm-12">
              Lorem Ipsum dollor sit amet
            </h1>
            <div className="col-md-8 col-xs-8 col-12 col-sm-12">
              {/*ITALO INSIRA SEU GRAFICO AQUI*/}
            </div>
            <div className="col-md-4 col-xs-4 col-12 col-sm-12 text-part3">
              <div>
                <div className="row">
                  <span>30%</span>
                  <div className="ajuste-porcent-sub">
                    <h3>Lorem Ipsum dollor sit amet</h3>
                  </div>
                </div>
                <h3>
                  Pesquisa quantitativa não probabilística. Formulário
                  respondido no Google Docs e compartilhado organicamente entre
                  mulheres que trabalham em agência de publicidade
                </h3>
              </div>
            </div>
          </div>
          <div className="row part4">
            <h1 className="col-md-12 col-xs-12 col-12 col-sm-12">
              Lorem Ipsum dollor sit amet
            </h1>
            <div className="col-md-12 col-xs-12 col-12 col-sm-12">
              <div className="row">
                <div className="col-md-4 col-xs-4 col-12 col-sm-12">
                  <div className="card">
                    <div className="row rr-1">
                      <div className="rr1-img-part">
                        <img src={require("./img/r1.jpg")} />
                      </div>
                      <div className="rr1-partido">
                        <p className="nomepartido">PSDB</p>
                      </div>
                    </div>
                    <div className="row rr-2">
                      <div className="ghost-size">
                        <img src={require("./img/pac-man-ghost.svg")} />
                      </div>
                      <div className="nota">
                        <h3>321 fantasmas</h3>
                      </div>
                    </div>
                    <div className="btn">
                      <div className="denuncia">
                        <p>Exiga explicações!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xs-4 col-12 col-sm-12">
                  <div className="card">
                    <div className="row rr-1">
                      <div className="rr1-img-part">
                        <img src={require("./img/r1.jpg")} />
                      </div>
                      <div className="rr1-partido">
                        <p className="nomepartido">PSDB</p>
                      </div>
                    </div>
                    <div className="row rr-2">
                      <div className="ghost-size">
                        <img src={require("./img/pac-man-ghost.svg")} />
                      </div>
                      <div className="nota">
                        <h3>321 fantasmas</h3>
                      </div>
                    </div>
                    <div className="btn">
                      <div className="denuncia">
                        <p>Exiga explicações!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-xs-4 col-12 col-sm-12">
                  <div className="card">
                    <div className="row rr-1">
                      <div className="rr1-img-part">
                        <img src={require("./img/r1.jpg")} />
                      </div>
                      <div className="rr1-partido">
                        <p className="nomepartido">PSDB</p>
                      </div>
                    </div>
                    <div className="row rr-2">
                      <div className="ghost-size">
                        <img src={require("./img/pac-man-ghost.svg")} />
                      </div>
                      <div className="nota">
                        <h3>321 fantasmas</h3>
                      </div>
                    </div>
                    <div className="btn">
                      <div className="denuncia">
                        <p>Exiga explicações!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row part5">
            <div className="col-md-12 col-xs-12 col-12 col-sm-12 hadri">

            </div>
            <div className="col-md-8 col-xs-8 col-12 col-sm-12">
            </div>
            <div className="col-md-4 col-xs-4 col-12 col-sm-12 text-part3">
              <div>
                <div className="row">
                  <span>30%</span>
                  <div className="ajuste-porcent-sub">
                    <h3></h3>
                  </div>
                </div>
                <h3>
                  Pesquisa quantitativa não probabilística. Formulário
                  respondido no Google Docs e compartilhado organicamente entre
                  mulheres que trabalham em agência de publicidade
                </h3>
                <div class="denuncia twitter">
                  <i class="fab fa-twitter twitter-logo-size"></i>
                  <a href="https://twitter.com/intent/tweet?text=Hello%20world"
                    class="twitter-share-button" data-show-count="false">
                      Tweet
                  </a>
                  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
                  </script>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
