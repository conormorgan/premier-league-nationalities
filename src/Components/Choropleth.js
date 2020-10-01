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
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.drawGraph();
    }

    componentDidUpdate(){
        d3.selectAll(".choropleth").remove().exit();
        this.drawGraph();
    }

    handleChange(event){
        console.log(event.target.value);
        console.log(this.state);
        this.setState({mapData: event.target.value});
        // if (event.target.value === 1){
        // //     console.log("set state to json1")
        //     this.setState({value: this.props.json1});
        // //     console.log(this.state);
        // }
        // else if (String(event.target.value) === "2"){
        //     console.log("set state to json2")
        //     this.setState({value: this.props.json2});
        //     console.log(this.state);
        // }
    }

    drawGraph(){

        var { json1, json2} = this.props;

        if (this.state.mapData == null){
            var data  = json1;
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
        const colorScale = d3.scaleLinear().domain([minCount, maxCount]).range(["white", "red"]);

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
        .transition()
        // .duration(1000)
        .attr("stroke", "c7c7c7")
        .attr("stroke-width", "1pt")
        .attr("fill", feature => colorScale(feature.properties["count"]))
        .attr("d", feature => pathGenerator(feature));
        
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
    }

    render(){
        
        return (

            <div id = "choropleth">
                <div className = "row">
                    <h2>World Map</h2>
                    <button onClick= {() => this.setState({mapData: this.props.json1})}>All countries</button>
                    <button onClick= {() => this.setState({mapData: this.props.json2})}>No England</button>
                    
                    <select  onChange = {this.handleChange}>
                        <option value = {this.props.json1}>All Countries</option>
                        <option value = {this.props.json2}>No England</option>
                    </select>
                </div>
                
                <div className = "row">
                    <div ref = {this.choropleth}></div>
                </div>
                <div className = "row">
                    <div className= "six columns">
                        <h4>World Map</h4>
                            <p>Talk about the map here in this column</p>
                    </div>
                    <div className= "six columns">
                        <h4>Another subtitle maybe?</h4>
                        <p>And also talk about the map in this other column</p>
                    </div>
                </div>
                
            </div>
        );
    }

}

export default Choropleth;