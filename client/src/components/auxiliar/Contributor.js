import React, { Component } from "react";
import "./../../App.css";
import {axisBottom} from "d3-axis";
import * as d3 from "d3";
import axios from "axios/index";

class Contributor extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="col">
        <div className="contributor-image">
          <img alt="" className="ajust-img-pocs" src={(this.props.image_url)}/>
        </div>
        <p className="contributor-name">
          <a href={this.props.github_url} target="_blank">{this.props.name}</a>
        </p>
      </div>
    );
  }
}
export default Contributor;