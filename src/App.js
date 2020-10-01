import React, { Component } from 'react';
import ReactGA from 'react-ga';
// import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
// import Resume from './Components/Resume';
// import Contact from './Components/Contact';
// import Portfolio from './Components/Portfolio';
import Introduction from './Components/Introduction';
// import TestGraph from './Components/TestGraph';
import Top20 from './Components/Top20';
import Top20NoEng from './Components/Top20NoEng';
import TreeMap from './Components/TreeMap';
import Choropleth from './Components/Choropleth';

// Data imports
import top20 from './data/top20_countries.csv';
import top20_no_eng from './data/top20_no_eng.csv';
import top20_no_eng1 from './data/top20_no_eng1.csv';
import map_data from './data/full-world-data.json';
import map_data_no_eng from './data/world-data-no-eng.json';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      mapData: map_data,
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  componentDidMount(){
    // this.getResumeData();
    // data = {this.state.resumeData.main} Removed this from the components that I'm using because resume was causing errors
  }

  render() {
    return (
      <div className="App">
        <Header />
        <About />
        {/* <Resume data={this.state.resumeData.resume}/> */}
        {/* <Portfolio data={this.state.resumeData.portfolio}/> */}
        {/* <Contact data={this.state.resumeData.main}/> */}
        <Introduction />
        {/* <TestGraph  csv = {top20} testData = {td} color = "green"/>  */}
        <Top20  csv = {top20} color = "purple"/>
        <Top20NoEng csv = {top20_no_eng} color = "green"/>
        <TreeMap csv = {top20_no_eng1}/>
        <Choropleth csv = {top20} json1 = {map_data} json2 = {map_data_no_eng} />
        <Footer  />
      </div>
    );
  }
}

export default App;
