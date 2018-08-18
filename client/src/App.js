import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import VotosVSInvestimentos from "./components/visualizacoes/VotosVSInvestimentos";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <VotosVSInvestimentos />
        <br/>
        <Footer />
      </div>
    );
  }
}

export default App;
