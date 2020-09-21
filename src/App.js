import React, { Component } from 'react';
import ReactGA from 'react-ga';
// import $ from 'jquery';
import './App.css';
// import Header from './Components/Header';
import Footer from './Components/Footer';
// import About from './Components/About';
// import Resume from './Components/Resume';
// import Contact from './Components/Contact';
// import Portfolio from './Components/Portfolio';
import TestGraph from './Components/TestGraph';
import CSVGraph from './Components/CSVGraph';
import top20 from './top20_countries1.csv';

const td = [10,20,30,40,50,60,70,80,90];

console.log(top20);



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      // resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  // getResumeData(){
  //   $.ajax({
  //     url:'./resumeData.json',
  //     dataType:'json',
  //     cache: false,
  //     success: function(data){
  //       this.setState({resumeData: data});
  //     }.bind(this),
  //     error: function(xhr, status, err){
  //       console.log(err);
  //       alert(err);
  //     }
  //   });
  // }

  componentDidMount(){
    // this.getResumeData();
    // data = {this.state.resumeData.main} Removed this from the components that I'm using because resume was causing errors
  }

  render() {
    return (
      <div className="App">
        {/* <Header data={this.state.resumeData.main}/> */}
        {/* <About data={this.state.resumeData.main}/> */}
        {/* <Resume data={this.state.resumeData.resume}/> */}
        {/* <Portfolio data={this.state.resumeData.portfolio}/> */}
        {/* <Contact data={this.state.resumeData.main}/> */}
        <TestGraph  csv = {top20} testData = {td} color = "green"/> 
        <CSVGraph  csv = {top20} color = "purple"/>
        <Footer  />
      </div>
    );
  }
}

export default App;
