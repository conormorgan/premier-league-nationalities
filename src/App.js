import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';

import Introduction from './Components/Introduction';
import Top20 from './Components/Top20';
import Top20NoEng from './Components/Top20NoEng';
import TreeMap from './Components/TreeMap';
import Choropleth from './Components/Choropleth';

// Data imports
import top20 from './data/top20_countries.csv';
import top20_no_eng from './data/top20_no_eng.csv';
import map_data from './data/full-medium-world-data.json';
import map_data_no_eng from './data/no-eng-medium-world-data.json';
import treemap_data from './data/treemap-codes.json';
import treemap_no_eng from './data/treemap-codes-noeng.json';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      mapData: map_data,
    };

  }

  componentDidMount(){
    $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	  });

    $('header').css({ 'height': $(window).height() });
    $(window).on('resize', function() {
 
         $('header').css({ 'height': $(window).height() });
         $('body').css({ 'width': $(window).width() })
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <About />
        <Introduction />
        <Top20  csv = {top20} color = "purple"/>
        <Top20NoEng csv = {top20_no_eng} color = "green"/>
        <TreeMap treeData = {treemap_data} no_eng = {treemap_no_eng}/>
        <Choropleth csv = {top20} json1 = {map_data} json2 = {map_data_no_eng} />
        <Footer  />
      </div>
    );
  }
}

export default App;
