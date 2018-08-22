import React, {Component} from "react";
import "./../../App.css";
import Contributor from "./Contributor";

class ContributorsGallery extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="row">
        <Contributor name="Bob Farias" image_url={require("../../img/bob.jpg")}
                     github_url="https://github.com/BobFarias"/>
        <Contributor name="Dandara Sousa" image_url={require("../../img/dan.jpg")}
                     github_url="https://github.com/dandaramcsousa"/>
        <Contributor name="Hadrizia Santos" image_url={require("../../img/hadri.jpg")}
                     github_url="https://github.com/hadrizia"/>
        <Contributor name="Ítalo Medeiros" image_url={require("../../img/italo.jpg")}
                     github_url="https://github.com/italo-batista"/>
        <Contributor name="Jair Neto" image_url={require("../../img/jair.jpg")}
                     github_url="https://github.com/jairNeto"/>
        <Contributor name="Marianne Linhares" image_url={require("../../img/mari.jpg")}
                     github_url="https://github.com/mari-linhares"/>
        <Contributor name="Paulo Vinícius" image_url={require("../../img/vini.jpg")}
                     github_url="https://github.com/paul0vinicius"/>
      </div>
    );
  }
}

export default ContributorsGallery;