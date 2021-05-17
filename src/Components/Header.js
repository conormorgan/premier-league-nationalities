import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import { FaHome } from "react-icons/fa";

class Header extends Component {
  render() {

    return (
      <header id="home">
      <ParticlesBg type="square" bg={true} />
      <nav id="nav-wrap">
         <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	      <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

         <ul id="nav" className="nav">
            <li><a className="text-left" href="https:\\conormorgan.github.io"><FaHome></FaHome> Home pAge</a></li>
            <li className="current"><a className="smoothscroll" href="#home">EPL Nations</a></li>
            <li><a className="smoothscroll" href="#about">Introduction</a></li>
	         <li><a className="smoothscroll" href="#top20">Top20</a></li>
            <li><a className="smoothscroll" href="#treemap">TreeMap</a></li>
            <li><a className="smoothscroll" href="#choropleth">World Map</a></li>
         </ul>
      </nav>

      <div className="row banner">
      
         <div className="banner-text">
            <h1 className="responsive-headline">Premier League Nations</h1>
            <h3>Analysis of all the nations to have players compete in the English Premier League from its inception in 1992</h3>
            <hr />
         </div>
      </div>

      <p className="scrolldown">
         <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
      </p>

   </header>
    );
  }
}

export default Header;
