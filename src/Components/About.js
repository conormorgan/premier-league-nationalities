import React, { Component } from 'react';

class About extends Component {
  render() {

    return (
      <section id="about">
      <div className="row">
         <div className="two columns">
            <img className="profile-pic"  src="premier-league-nationalities/images/profilepic.jpg" alt="Author" />
         </div>
         <div className="ten columns main-col">
            <h2>Introduction</h2>

            <p>Welcome to my analysis on the different nationalities to have been represented in the English Premier league.</p>
            <p>Premier League is one of, if not the most popular league worldwide with games being shown around the globe.</p>
            <p>This global appeal is reflected in the diversity of players that have appeared in the league. There have been players from all corners of the globe that've played in the English top division.</p>
            <p>Some countries are represented more than others and this analysis aims to show the differences between countries and any trends that can be seen.</p>

            <div className="row">
               <div className="columns contact-details">
                  <h2>This Intro is fine for now, can add more in below here too if needs be</h2>
               </div>
            </div>
         </div>
      </div>

   </section>
    );
  }
}

export default About;
