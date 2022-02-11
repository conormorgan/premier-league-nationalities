import React, { Component } from 'react';

class About extends Component {
  render() {

    return (
      <section id="about">
      <div className="row">
         <div className="two columns">
            
         </div>
         <div className="ten columns main-col">
            <h2>Introduction</h2>

            <p>Welcome to my analysis on the different nationalities to have been represented in the English Premier league.</p>
            <p>Premier League is one of, if not the most popular league worldwide with games being shown around the globe.</p>
            <p>This global appeal is reflected in the diversity of players that have appeared in the league. There have been players from all corners of the globe that've played in the English top division.</p>
            <p>Some countries are represented more than others and this analysis aims to show the differences between countries and any trends that can be seen.</p>

            <div className="row">
               <div className="columns">
                  <h2>Methodology</h2>
                  <p>The data used is scraped from FBRef website and is up-to-date until the end of the 2020/2021 season. Python and the scraping package Beautiful Soup were used to gather the data.</p>
                  <p>Once the data was collecting, NumPy was used to cleanse and prepare the data in formats to be displayed. Displaying the data was done using D3.js</p>
               </div>
            </div>
         </div>
      </div>

   </section>
    );
  }
}

export default About;
