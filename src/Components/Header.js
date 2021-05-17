import React, { Component } from 'react';
// import ParticlesBg  from "particles-bg";

class Header extends Component {
  render() {

    return (
      <header id="home">
      <nav id="nav-wrap">
         <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	      <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

         <ul id="nav" className="nav">
            <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
            <li><a className="smoothscroll" href="#about">Introduction</a></li>
	         <li><a className="smoothscroll" href="#top20">Top20</a></li>
            <li><a className="smoothscroll" href="#treemap">TreeMap</a></li>
            <li><a className="smoothscroll" href="#choropleth">World Map</a></li>
         </ul>
      </nav>

      <div className="row banner">
      
         <div className="banner-text">
            <h1 className="responsive-headline">Premier League Nations</h1>
            <h3>An insight and analysis of all the nations to have players compete in the English Premier League</h3>
            <hr />
            {/* <ul className="social">
               <a href="#" className="button btn project-btn"><i className="fa fa-book"></i>Project</a>
               <a href="#" className="button btn github-btn"><i className="fa fa-github"></i>Github</a>
            </ul> */}
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
