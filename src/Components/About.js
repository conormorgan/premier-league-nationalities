import React, { Component } from 'react';

class About extends Component {
  render() {

   //  if(this.props.data){
   //    var name = this.props.data.name;
   //    var profilepic= "images/"+this.props.data.image;
   //    var bio = this.props.data.bio;
   //    var street = this.props.data.address.street;
   //    var city = this.props.data.address.city;
   //    var state = this.props.data.address.state;
   //    var zip = this.props.data.address.zip;
   //    var phone= this.props.data.phone;
   //    var email = this.props.data.email;
   //    var resumeDownload = this.props.data.resumedownload;
   //  }

    return (
      <section id="about">
      <div className="row">
         <div className="two columns">
            <img className="profile-pic"  src="/public/images/profilepic.jpg" alt="Nordic Giant Profile Pic" />
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
                  {/* <p className="address">
						   <span>{name}</span><br />
						   <span>{street}<br />
						         {city} {state}, {zip}
                   </span><br />
						   <span>{phone}</span><br />
                     <span>{email}</span>
					   </p> */}
               </div>
               {/* <div className="columns download">
                  <p>
                     <a href={resumeDownload} className="button"><i className="fa fa-download"></i>Download Resume</a>
                  </p>
               </div> */}
            </div>
         </div>
      </div>

   </section>
    );
  }
}

export default About;
