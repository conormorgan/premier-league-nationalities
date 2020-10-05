import React, { Component } from 'react';
import * as d3 from 'd3';
import { geoMercator, geoPath } from 'd3';

class Choropleth extends Component{

    constructor(props){
        super(props);

        this.choropleth = React.createRef();
        this.state = {
            selectedCountry: null,
            mapData: null,
            value: this.props.json1
        }
        this.drawGraph = this.drawGraph.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.drawGraph();
    }

    componentDidUpdate(){
        d3.selectAll(".choropleth").remove().exit();
        this.drawGraph();
    }

    // handleChange(event){
    //     console.log(event.target.value);
    //     console.log(this.state);
    //     // this.setState({mapData: event.target.value});
    //     if (event.target.value === 1){
    //         console.log("set state to json1")
    //         this.setState({value: this.props.json1});
    //         console.log(this.state);
    //     }
    //     else if (String(event.target.value) === "2"){
    //         console.log("set state to json2")
    //         this.setState({value: this.props.json2});
    //         console.log(this.state);
    //     }
    // }

    drawGraph(){

        if (this.state.mapData == null){
            var data  = this.props.json1;
        }
        else{
            data = this.state.mapData;
        }

        var selectedCountry = this.state.selectedCountry;
        var self = this;

        var height = 600;
        var width = 900;
        var adj = 20;

        const minCount = d3.min(data.features, feature => feature.properties["count"]);
        const maxCount = d3.max(data.features, feature => feature.properties["count"]);
        const midCount = maxCount/2;
        const quarterCount = maxCount/4;
        const threeQuarterCount = 3* quarterCount;
        const colorScale = d3.scaleLinear()
                                .domain([minCount, quarterCount, midCount, threeQuarterCount ,maxCount])
                                .range(["#ffffff","#fecc5c","#fd8d3c","#f03b20","#bd0026"]);

        // Creates SVG area
        var svg = d3.select(this.choropleth.current)
        .append("svg")
        .attr("class", "choropleth")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("height", height)
        .attr("width", width)
        .attr("viewBox", "-" + adj + " -"+ adj + " " + (width + adj) + " " + (height + adj*2))
        .style("padding",0)
        .style("margin", 20)
        .style('background-color', "2060a8")
        .classed("svg-content", true);

        var projection = geoMercator().fitSize([width,height], this.state.selectedCountry || data);
        const pathGenerator = geoPath().projection(projection);

        // Creates each country as a path
        svg.selectAll("country")
        .data(data.features)
        .join("path")
        .attr("class","country")
        .on("click", function(feature) {
            if (selectedCountry === feature){
                self.setState({
                    selectedCountry: null
                })
            }else{
                self.setState({
                    selectedCountry: feature
                })
            }
        })
        .attr("stroke", "c7c7c7")
        .attr("stroke-width", "1pt")
        .attr("fill", feature => colorScale(feature.properties["count"]))
        .attr("d", feature => pathGenerator(feature))
        .append("title").text(feature => feature.properties["name"]);

        // Labels for each country
        svg.selectAll("label")
            .append("div")
            .data([selectedCountry])
            .join("text")
            .attr("class", "chorolabel")
            .text(function(feature){
                return feature && feature.properties.name +
                ": " +
                feature.properties["count"].toLocaleString()
            } 
            )
            .attr("x", 10)
            .attr("y",25);

            var zoom = d3.zoom()
                        .scaleExtent([1, 8])
                        .on('zoom', function() {
                            svg.selectAll('path')
                            .attr('transform', d3.event.transform);
                        });

            svg.call(zoom);

            // Legend SVG
            var legend = d3.select(".choropleth").append("svg")
                            .attr("class", "legend")
                            .attr("width", 140)
                            .attr("height", 100)
                            .attr("x", 10)
                            .attr("y", height - 100)
                            .selectAll("g")
                                .data(colorScale.domain().reverse())
                                .enter().append("g")
                                .attr("transform", function(d,i){return "translate(0," + i*20 + ")";});
                            
            
            // Add a rectangle as with colours for scale
            legend.append("rect")
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", colorScale);

            // Labels for each colour in scale        
            legend.append("text")
                    .attr("x", 30)
                    .attr("y", 10)
                    .attr("dy", ".35em")
                    .text(function(d){return Math.round(d/50)*50 + " players"});
                    
            
    }

    render(){
        
        return (

            <section id = "choropleth">
                <div className = "row">
                    <div className = "twelve columns">
                        <h2>World Map</h2>
                        <p>This is an interactive map showing all the countries that  have featured in the Premier league. 
                            The colour of each country corresponds to the number of players that a country has.
                            The buttons below are to show the full dataset including England and to show the dataset with England removed,
                            which looks better as England skews the colour scale.
                        </p>
                    </div>
                </div>
                <div className = "row">
                    <div className="six columns">
                        <button onClick= {() => this.setState({mapData: this.props.json1})}>All countries</button>
                        <button onClick= {() => this.setState({mapData: this.props.json2})}>No England</button>
                    </div>
                </div>
                {/* <div className = "row">
                    <label><input type = "radio" checked = {true} value = "1" onChange = {(e) => this.handleChange(e)}/>All countries</label>
                    <label><input type = "radio" value = "2" />No England</label>
                    
                    <select  onChange = {this.handleChange}>
                        <option value = "1">All Countries</option>
                        <option value = "2">No England</option>
                    </select>
                </div> */}
                
                <div className = "row">
                    <div ref = {this.choropleth}></div>
                </div>
                <div className = "row">
                    <div className= "twelve columns">
                        <h4>British Isles and Europe</h4>
                        <p>When England is included, it is the only country that appears to have any colour at all,
                                with the rest looking white in comparison. With England out of the picture, the other countries 
                                and trends are much more visible and trends can be noticed.
                        </p>
                        <p>We can see that there is a cluster of red countries in mainland Europe - France, Spain, Germany, Netherlands - and Scandinavia. 
                            Traditionally these nations have a large interest in football and the proximity to the UK means that quite a few
                            players have made the journey to the Premier league.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className= "twelve columns">
                        <h4>Africa, the Americas and the Rest </h4>
                        <p>
                            South America is known for being a football-crazy continent and this is reflected by the map with Brazil and Argentina
                            being highlighted in red as the main coutries to export players from South America. There is a tendency for players 
                            from South America to sign for teams in countries along the Mediterranean however there has still been a significant amount 
                            to grace the pitch in England.
                        </p>
                        <p>
                            The United States is one of the largest countries in the world and has had quite a few citizens feature in the league,
                            it appears to be underperforming for its population size. The States have had 45 players appear, but this is much lower than other
                            much smaller countries such as wee Northern Ireland with a population of 1.8 million and 61 players, or Norway and its return of 65
                            from 5.4 million. Football is not one of the main sports in USA and with MLS still in its relative infancy, USA is lagging behind with
                            its development of the sport.
                        </p>
                        <p>
                            Africa as a continent is an emerging nation. There is a love of football there, however the resources and infrastructure is lacking and
                            so it is under represented as a continent overall. There is a pocket of countries in West Africa that are the most common representatives
                            in England. Nigeria, the most populous country on the continent, is the country with the most players and is closely followed by neighbours
                            Senegal, Ivory Coast, Cameroon and Ghana. Regular viewers of the Premier League are sure to know some stars from these countries with 
                            Sadio Mané, Didier Drogba, Jay-Jay Okocha, Samuel Eto'o and Michael Essien all featuring for multiple years.
                        </p>
                        <p>
                            Australia by far the country with the most Premier league players in Asia and Oceania with over 50. These continents generally do not have a large football 
                            following and with that there is not much infrastructure or desire to play professionally. Countries like China, India and Indonesia plus many others
                            in Asia have the potential to become football powerhouses due to the populations they have at their diposal however the sports are just not at the right
                            stage yet to warrant more investment.
                        </p>
                    </div>
                </div>
                
            </section>
        );
    }

}

export default Choropleth;