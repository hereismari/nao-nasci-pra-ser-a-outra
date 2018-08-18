import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Podio from "./components/visualizacoes/Podio";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Proporcao from "./components/visualizacoes/Proporcao";
import VotosVSInvestimentos from "./components/visualizacoes/VotosVSInvestimentos";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <VotosVSInvestimentos />
        <Footer />
      </div>
    );
  }
}

export default App;
