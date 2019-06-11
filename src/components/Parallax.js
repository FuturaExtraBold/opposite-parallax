import React, { Component } from "react";

import $ from "jquery";
import TweenMax from "gsap/TweenMax";

import { ReactComponent as Logo } from "../images/logo.svg";

class Parallax extends Component {

  componentDidMount() {
    console.log("Parallax componentDidMount");

    let $window = $(window);
    let windowWidth = $window.outerWidth();
    let windowHeight = $window.outerHeight();
    let clientX = 0;
    let clientY = 0;

    let $layer = $(".layer");

    for (var a = 0; a < $layer.length; a++) {
      if ($layer[a].hasAttribute("data-multiplier")) {
        let $thisLayer = $($layer[a]);
        let $thisLayerContent = $thisLayer.find(".layer__content");
        let multiplier = parseFloat($thisLayer.attr("data-multiplier"));
        TweenMax.set($thisLayer, { scale: 1 + multiplier });
      }
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
      for (var a = 0; a < $layer.length; a++) {
        if ($layer[a].hasAttribute("data-multiplier")) {
          let $thisLayer = $($layer[a]);
          let multiplier = $thisLayer.attr("data-multiplier");
          let offsetX = (windowWidth / 2 - clientX) * multiplier;
          let offsetY = (windowHeight / 2 - clientY) * multiplier;
          // console.log("offsetX:", offsetX, "offsetY:", offsetY);
          TweenMax.to($thisLayer, 1.5, { x: offsetX, y: offsetY, ease: "easeOutExpo" });
        }
      }
    }
  }

  render() {
    return (
      <section className="parallax">
        <div className="layer layer--1" data-multiplier="0.01"></div>
        <div className="layer layer--2" data-multiplier="0.05">
          <div className="logo">
            <Logo className="logo__layer logo__layer--1" />
            <Logo className="logo__layer logo__layer--2" />
          </div>
        </div>
        <div className="layer layer--3" data-multiplier="0.1"></div>
        <div className="layer layer--4"></div>
      </section>
    );
  }
}

export default Parallax;
