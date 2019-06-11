import React, { Component } from "react";

import $ from "jquery";
import TweenMax from "gsap/TweenMax";

import "./stylesheets/App.scss";

import { ReactComponent as Logo } from "./images/logo.svg";

class App extends Component {

  componentDidMount() {

    console.log("App componentDidMount");

    let $window = $(window);
    let windowWidth = $window.outerWidth();
    let windowHeight = $window.outerHeight();

    let $logo = $(".logo");
    let logoWidth = $logo.outerWidth();
    let logoHeight = $logo.outerHeight();

    let $layer = $(".layer");

    $window.on("mousemove", (event) => {
      for (var a = 0; a < $layer.length; a++) {
        if ($layer[a].hasAttribute("data-multiplier")) {
          let $thisLayer = $($layer[a]);
          let multiplier = $thisLayer.attr("data-multiplier");
          let offsetX = (windowWidth / 2 - event.clientX) * multiplier;
          let offsetY = (windowHeight / 2 - event.clientY) * multiplier;
          console.log("offsetX:", offsetX, "offsetY:", offsetY);
          TweenMax.to($thisLayer, 1.5, { x: offsetX, y: offsetY, ease: "easeOutExpo" });
        }
      }
    });
  }

  render() {
    const imgUrl = require(`./images/fg.png`);
    return (
      <div className="App">
        <div className="parallax">
          <div className="layer layer--1"></div>
          <div className="layer layer--2" data-multiplier="0.05">
            <div className="logo">
              <Logo className="logo__layer logo__layer--1" />
              <Logo className="logo__layer logo__layer--2" />
            </div>
          </div>
          <div className="layer layer--3" data-multiplier="0.1">
            <img className="foreground" src={ imgUrl } alt="Foreground" />
          </div>
          <div className="layer layer--4"></div>
        </div>
      </div>
    );
  }
}

export default App;
