import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import $ from 'jquery'
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
            <div className="bg col-md-12 col-xs-12 col-12 col-sm-12"></div>
                <div className="col-md-6 col-xs-6 col-12 col-sm-12">
                  <div className="left-container">
                    <span className="blink_me">30%</span><h3>Lorem Ipsum dollor sit amet</h3>
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
                      <span className="blink_me">30%</span><h3>Lorem Ipsum dollor sit amet</h3>
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
                <VotosVSInvestimentos />
            </div>
            <div className="col-md-4 col-xs-4 col-12 col-sm-12 text-part3">
                <div>
                  <div className="row">
                      <span className="blink_me">30%</span>
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
              <div className="row row-ranking">
                <div className="col-md-4 col-xs-4 col-12 col-sm-12">
                    <div className="row rr-1">
                      <div className="rr1-img-part">
                        <img src={require("./img/s1.svg")} />
                      </div>
                      <div className="rr1-partido">
                        <p className="nomepartido">PSDB</p>
                        <span className="ttpartido"><i class="fab fa-twitter"></i>PSDB</span>
                      </div>
                    </div>
                    <div className="card">
                      <div className="row rr-2">
                        <div className="ghost-size">
                          <img src={require("./img/pac-man-ghost.svg")} />
                        </div>
                        <div className="nota"><h3>321 candidatas fantasmas</h3></div>
                      </div>
                      <div className="botao">
                        <div className="denuncia">
                          <p>Exija explicações!<i class="fab fa-twitter"></i></p>
                        </div>
                      </div>
                  </div>
                </div>

                 <div className="col-md-4 col-xs-4 col-12 col-sm-12">
                    <div className="row rr-1">
                      <div className="rr1-img-part">
                        <img src={require("./img/s2.svg")} />
                      </div>
                      <div className="rr1-partido">
                        <p className="nomepartido">PSDB</p>
                        <span className="ttpartido"><i class="fab fa-twitter"></i>PSDB</span>
                      </div>
                    </div>
                    <div className="card">
                      <div className="row rr-2">
                        <div className="ghost-size">
                          <img src={require("./img/pac-man-ghost.svg")} />
                        </div>
                        <div className="nota"><h3>321 candidatas fantasmas</h3></div>
                      </div>
                      <div className="botao">
                        <div className="denuncia">
                          <p>Exija explicações!<i class="fab fa-twitter"></i></p>
                        </div>
                      </div>
                  </div>
                </div>

            <div className="col-md-4 col-xs-4 col-12 col-sm-12">
                    <div className="row rr-1">
                      <div className="rr1-img-part">
                        <img src={require("./img/s3.svg")} />
                      </div>
                      <div className="rr1-partido">
                        <p className="nomepartido">PSDB</p>
                        <span className="ttpartido"><i class="fab fa-twitter"></i>PSDB</span>
                      </div>
                    </div>
                    <div className="card">
                      <div className="row rr-2">
                        <div className="ghost-size">
                          <img src={require("./img/pac-man-ghost.svg")} />
                        </div>
                        <div className="nota"><h3>321 candidatas fantasmas</h3></div>
                      </div>
                      <div className="botao">
                        <div className="denuncia">
                          <p>Exija explicações!<i class="fab fa-twitter"></i></p>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row part5">
            <h1 className="col-md-12 col-xs-12 col-12 col-sm-12">Lorem Ipsum dollor sit amet</h1>
            <div className="col-md-6 col-xs-6 col-12 col-sm-12">
                <div className="left-container">
                   <span className="blink_me">30%</span><h3>Lorem Ipsum dollor sit amet</h3>
                    <img src={require("./img/dilmae.gif")} />
                </div>
            </div>
            <div className="col-md-6 col-xs-6 col-12 col-sm-12 ajust-margin">
                <div className="colaborartext">
                  <div className="row">
                    <div className="megaphonediv"><img src={require("./img/megaphone.svg")} /></div>
                    <p className="ajust-margin2 blink_me">Como colaborar?</p>
                  </div>
                    <h3>Pesquisa quantitativa não probabilística. Formulário respondido no Google Docs e compartilhado organicamente entre mulheres que trabalham em agência de publicidade</h3>
                </div>
            </div>
          </div>
          <div className="row part6">
            <img className="ajust-img-pocs" src={require("./img/bob.jpg")} />
              <span className="text-footer">Bob Henrique Farias</span>
            <img className="ajust-img-pocs" src={require("./img/dan.jpg")} />
              <span className="text-footer">Dandara Maria da Costa</span>
            <img className="ajust-img-pocs" src={require("./img/hadri.jpg")} />
              <span className="text-footer">Hadrizia Santos</span>
            <img className="ajust-img-pocs" src={require("./img/italo.jpg")} />
              <span className="text-footer">Italo Medeiros</span>
            <img className="ajust-img-pocs" src={require("./img/jair.jpg")} />
              <span className="text-footer">Jair Guetes Neto</span>
            <img className="ajust-img-pocs" src={require("./img/mari.jpg")} />
              <span className="text-footer">Marianne Linhares Monteiro</span>
            <img className="ajust-img-pocs" src={require("./img/vini.jpg")} />
              <span className="text-footer">Paulo Vinícios Soares</span>

          </div>
        </div>
      </div>
    );
  }
}


export default App;