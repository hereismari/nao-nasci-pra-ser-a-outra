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
import LineChart from './components/visualizacoes/GraficoLinhas'
import LineChartData from './data.json'
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import VotosVSInvestimentos from "./components/visualizacoes/VotosVSInvestimentos";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { dadosRanking: [], isLoading: false };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("http://naoaoutra.herokuapp.com/partidos/ranking/zerovotos")
      .then(res => res.data)
      .then(data => this.setState({ dadosRanking: data, isLoading: false }));
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row part1">
            <div className="bg col-md-12 col-xs-12 col-12 col-sm-12"></div>
                <div className="col-md-6 col-xs-6 col-12 col-sm-12">
                  <div className="left-container">
                    <span className="blink_me">30%</span>
                    <h3>
                    </h3>
                    <img src={require("./img/img-left-part1.png")} />
                  </div>
                </div>
                <div className="col-md-6 col-xs-6 col-12 col-sm-12 right-container">
                  <img src={require("./img/logo.png")} />
                  <h3>
                    O Não Nasci Pra Ser a Única oferece uma maneira fácil de monitorar o cumprimento efetivo da <a href='http://www.planalto.gov.br/ccivil_03/_Ato2007-2010/2009/Lei/L12034.ht'>lei 12.034/2009, </a> a qual exige que haja no mínimo 30% e o máximo 70% candidatos de cada sexo por partido ou coligação.
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
                      <span className="blink_me">30%</span><h3>É o mínimo de candidatos de um gênero que um partido ou coligação deve ter.</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-6 col-12 col-sm-12 text2-part2">
                      <h3>O gráfico acima exibe a participação das mulheres em cada partido. Quanto mais próximo da "fronteira" entre homens e mulheres mais igualitário é o partido.</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row partItalo">
            <h1 className="col-md-12 col-xs-12 col-12 col-sm-12">
              Evolução do número de candidatas
            </h1>
            <div className="col-md-8 col-xs-8 col-12 col-sm-12">
              <LineChart data={LineChartData} size={[520,520]} />
            </div>
            <div className="col-md-4 col-xs-4 col-12 col-sm-12 text-part3">
              <div>
                <h3>
                  O gráfico ao lado mostra o número de candidatas no Brasil ao longo dos anos. A linha branca é o número de candidatas, já a linha amarela o número de candidatas com zero votos.
                </h3>
                <h3>
                  A linha tracejada indica o ano de 2009, ano em que a lei de cotas entrou em vigor.
                </h3>
              </div>
            </div>
          </div>
          {this.state.isLoading || this.state.dadosRanking.length === 0 ? (
            <div>Carregando.......</div>
          ) : (
          <div className="row part4">
            <h1 className="col-md-12 col-xs-12 col-12 col-sm-12">
              Raking dos partidos <br></br>com maior proporção de prováveis candidatas fantasmas em 2016
            </h1>
            <div className="col-md-12 col-xs-12 col-12 col-sm-12">
              <div className="row row-ranking">
                <div className="col-md-4 col-xs-4 col-12 col-sm-12">
                    <div className="row rr-1">
                      <div className="rr1-img-part">
                        <img src={require("./img/s1.svg")} />
                      </div>
                      <div className="rr1-partido">
                        <p className="nomepartido">
                          {this.state.dadosRanking[0]._id.sigla_partido}
                        </p>
                      </div>
                    </div>
                    <div className="card">
                      <div className="row rr-2">
                        <div className="ghost-size">
                          <img src={require("./img/pac-man-ghost.svg")} />
                        </div>
                        <div className="nota"> 
                          <h3>
                            Proporção de mulheres fantasmas:{" "}
                            {this.state.dadosRanking[0].porcent_zero * 100} %
                          </h3>
                        </div>
                      </div>
                      <div className="botao">
                        <div className="denuncia">
                          <a href="https://twitter.com/intent/tweet/?text=Veja%20quais%20partidos%20cumprem%20efetivamente%20a%20cota%20dos%2030%25%20e%20quais%20possuem%20tend%C3%AAncias%20a%20candidaturas%20laranjas%20no%20N%C3%A3o%20nasci%20pra%20ser%20a%20outra%20:nao-nasci-pra-ser-a-outra.surge.sh.%20%23ContraCorrup%C3%A7%C3%A3o%20%23ContraCandidatoFantasma%20%23NaoNasciPraSerAOutra">
                          Exija explicações!<i class="fa fa-twitter"></i></a>
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
                        <p className="nomepartido">
                          {this.state.dadosRanking[1]._id.sigla_partido}
                        </p>
                      </div>
                    </div>
                    <div className="card">
                      <div className="row rr-2">
                        <div className="ghost-size">
                          <img src={require("./img/pac-man-ghost.svg")} />
                        </div>
                        <div className="nota"> 
                          <h3>
                            Proporção de mulheres fantasmas:{" "}
                            {this.state.dadosRanking[1].porcent_zero * 100} %
                          </h3>
                        </div>
                      </div>
                      <div className="botao">
                        <div className="denuncia">
                        <a href="https://twitter.com/intent/tweet/?text=Veja%20quais%20partidos%20cumprem%20efetivamente%20a%20cota%20dos%2030%25%20e%20quais%20possuem%20tend%C3%AAncias%20a%20candidaturas%20laranjas%20no%20N%C3%A3o%20nasci%20pra%20ser%20a%20outra%20:nao-nasci-pra-ser-a-outra.surge.sh.%20%23ContraCorrup%C3%A7%C3%A3o%20%23ContraCandidatoFantasma%20%23NaoNasciPraSerAOutra">
                        Exija explicações!<i class="fa fa-twitter"></i></a>
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
                        <p className="nomepartido">
                          {this.state.dadosRanking[2]._id.sigla_partido}
                        </p>
                      </div>
                    </div>
                    <div className="card">
                      <div className="row rr-2">
                        <div className="ghost-size">
                          <img src={require("./img/pac-man-ghost.svg")} />
                        </div>
                        <div className="nota"> 
                          <h3>
                            Proporção de mulheres fantasmas:{" "}
                            {Math.round(this.state.dadosRanking[2].porcent_zero * 100)} %
                          </h3>
                        </div>
                      </div>
                      <div className="botao">
                        <div className="denuncia">
                        <a href="https://twitter.com/intent/tweet/?text=Veja%20quais%20partidos%20cumprem%20efetivamente%20a%20cota%20dos%2030%25%20e%20quais%20possuem%20tend%C3%AAncias%20a%20candidaturas%20laranjas%20no%20N%C3%A3o%20nasci%20pra%20ser%20a%20outra%20:nao-nasci-pra-ser-a-outra.surge.sh.%20%23ContraCorrup%C3%A7%C3%A3o%20%23ContraCandidatoFantasma%20%23NaoNasciPraSerAOutra">
                        Exija explicações!<i class="fa fa-twitter"></i></a>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              <div>
                <h3>Quer que sua denúncia chegue ao TRE? Utilize também o sistema pardal do seu estado!
                    O sistema pardal permite que a Justiça Eleitoral receba, em tempo real, denúncias dos cidadãos relativas a irregularidades nas campanhas eleitorai
                    Por exemplo o <a href='http://www.tre-es.jus.br/eleitor/denuncias-eleitorais-e-institucionais'>sistema pardal do RS.</a>
                </h3>
              </div>
            </div>
          </div>)}
          <div className="row part3">
            <div className="col-md-6 col-xs-6 col-12 col-sm-12">
                <div className="left-container">
                   <span className="blink_me">30%</span><h3>É o mínimo de candidatos de um gênero que um partido ou coligação deve ter.</h3>
                    <img src={require("./img/dilmae.gif")} />
                </div>
            </div>
            <div className="col-md-6 col-xs-6 col-12 col-sm-12 ajust-margin">
                <div className="colaborartext">
                  <div className="row">
                    <div className="megaphonediv"><img src={require("./img/megaphone.svg")} /></div>
                    <p className="ajust-margin2 blink_me">Como colaborar?</p>
                  </div>
                    <h3>Compartilhe no twitter utilizando a hashtag <i>#NaoNasciPraSerAOutra</i> para que a outros conheçam quais são os partidos que possuem menos candidatas do sexo feminino e que candidatam mulheres apenas para o preenchimento dos 30%.</h3>
                    <div class="denuncia twitter">

                      <a href="https://twitter.com/intent/tweet/?text=Veja%20quais%20partidos%20cumprem%20efetivamente%20a%20cota%20dos%2030%25%20e%20quais%20possuem%20tend%C3%AAncias%20a%20candidaturas%20laranjas%20no%20N%C3%A3o%20nasci%20pra%20ser%20a%20outra%20:nao-nasci-pra-ser-a-outra.surge.sh.%20%23ContraCorrup%C3%A7%C3%A3o%20%23ContraCandidatoFantasma%20%23NaoNasciPraSerAOutra"
                        class="twitter-share-button" data-show-count="false">
                          Tweet!
                      </a>
                      <i class="fa fa-twitter twitter-logo-size"></i>
                      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
                      </script>
                    </div>
                </div>
            </div>
          </div>
          <div className="row part6">
              <div className='col-md-12 col-xs-12 col-12 col-sm-12 row bottom-padding'>
                <h1>Este projeto foi desenvolvido no <a href='http://hackfest.com.br/'>4º hackfest contra a corrupção (2018).</a></h1>
              </div>

              <img className="ajust-img-pocs" src={require("./img/bob.jpg")} />
              <img className="ajust-img-pocs" src={require("./img/dan.jpg")} />
              <img className="ajust-img-pocs" src={require("./img/hadri.jpg")} />
              <img className="ajust-img-pocs" src={require("./img/italo.jpg")} />
              <img className="ajust-img-pocs" src={require("./img/jair.jpg")} />
              <img className="ajust-img-pocs" src={require("./img/mari.jpg")} />
              <img className="ajust-img-pocs" src={require("./img/vini.jpg")} />
              <div className="col-md-12 col-xs-12 col-12 col-sm-12 row logo-footer">
                <img className="logo-hack" src={require("./img/hackfest.svg")} />
                <img className="logo-nossa" src={require("./img/logo.png")} />
              </div>
          </div>
        </div>
    );
  }
}

export default App;
