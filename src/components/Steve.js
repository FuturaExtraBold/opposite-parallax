import React, { Component } from "react";

import $ from "jquery";
import TweenMax from "gsap/TweenMax";

import { ReactComponent as Logo } from "../images/ow/logo.svg";

class Steve extends Component {

  componentDidMount() {
    console.log("Steve componentDidMount");

    let $window = $(window);
    let windowWidth = $window.outerWidth();
    let windowHeight = $window.outerHeight();
    let clientX = 0;
    let clientY = 0;
    let $layer = $(".layer");
    let layersToAnimate = [];

    let a;
    for (a = 0; a < $layer.length; a++) {
      if ($layer[a].hasAttribute("data-multiplier")) {
        layersToAnimate.push($($layer[a]));
      }
    }

    for (a = 0; a < layersToAnimate.length; a++) {
      let $thisLayer = layersToAnimate[a];
      let $thisLayerContent = $thisLayer.find(".layer__content");
      let multiplier = parseFloat($thisLayer.attr("data-multiplier"));
      TweenMax.set($thisLayer, { scale: 1 + multiplier });
    }

    $window.on("resize", (event) => {
      windowWidth = $window.outerWidth();
      windowHeight = $window.outerHeight();
      clientX = 0;
      clientY = 0;
      adjustPostitions();
    });

    $window.on("mousemove", (event) => {
      clientX = event.clientX;
      clientY = event.clientY;
      adjustPostitions();
    });

    function adjustPostitions() {
      for (a = 0; a < layersToAnimate.length; a++) {
        let $thisLayer = layersToAnimate[a];
        let multiplier = $thisLayer.attr("data-multiplier");
        let offsetX = (windowWidth / 2 - clientX) * multiplier;
        let offsetY = (windowHeight / 2 - clientY) * multiplier;
        TweenMax.to($thisLayer, 1.5, { x: offsetX, y: offsetY, ease: "easeOutExpo" });
      }
    }
  }

  render() {
    const imgUrl = require(`../images/steve/logo.png`);
    return (
      <section className="parallax">
        <div className="layer layer--1" data-multiplier="0.01"></div>
        <div className="layer layer--4"></div>
        <div className="layer layer--2" data-multiplier="0.05">
          <div className="logo">
            <img src={ imgUrl } />
          </div>
        </div>
        <div className="layer layer--3" data-multiplier="0.15"></div>
        <div className="layer layer--5"></div>
      </section>
    );
  }
}

export default Steve;
