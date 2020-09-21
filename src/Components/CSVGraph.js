import React, { Component } from 'react';
import * as d3 from 'd3';

class Graphs extends Component {

    constructor(props){
        super(props);
        this.csvText = React.createRef();
        this.csvGraph = React.createRef();
    }

    componentDidMount(){
        this.drawGraph();
    }

    drawGraph(){
        
        const { csv, color } = this.props;
        var height = 500;
        var width = 900;
        var adj = 65;

        const text = d3.select(this.csvText.current);
        text.style("color", color);
        text.style("background-color", "white");

        // SVG
        var svg = d3.select(this.csvGraph.current).append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("height", height)
        .attr("width", width)
        .attr("viewBox", "-" + adj + " -"+ adj + " " + (width + adj) + " " + (height + adj*2))
        .style("padding", 10)
        .style("margin", 20)
        .style('background-color', "white")
        .classed("svg-content", true);

        //Scales
        var xScale = d3.scaleBand()
            .rangeRound([0,width])
            .paddingInner(0.05);

        var yScale = d3.scaleLinear()
            .rangeRound([height,0]);


        // Data
        var dataset = d3.csv(csv);
        dataset.then(function(data) {
            data.map(function(d) {
                d.count = +d.count;                
                return d;});
        });
        console.log(dataset);

        dataset.then(function(data) {
            xScale.domain(data.map(function(d) {return d.country}));
            yScale.domain([0, d3.max(data, function(d){return d.count;})]);
        });

        // Axes

        dataset.then(function(data){
            // X axis and sets the ticks to be rotated
            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .attr("text-anchor", "end")
                .style("font-size","12")
                .attr("transform", "rotate(-30)");

            // Y axis
            svg.append("g")
                .attr("class","y axis")
                .call(d3.axisLeft(yScale))
                .selectAll("text")
                .style("font-size","12");

            // Title
            svg.append("text")
                .attr("class", "title")
                .attr("text-anchor", "middle")
                .attr("x", width/2)
                .attr("y", 0)
                .style("text-decoration", "underline")
                .style("font-size", "22")
                .text("Number of players from each country to appear in the Premier league");

            // X axis text
            svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width/2)
                .attr("y", height + 60)
                .style("font-size","18")
                .text("Countries");
            
            // Y axis text
            svg.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "middle")
                .style("font-size","18")
                .attr("transform", "translate(-45," + height/2 +") rotate(-90)")
                .text("Number of Individual Players");
    
        });

        // Bars
        dataset.then(function(data) {  
            svg.selectAll("div")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.country))
            .attr("y", (d) => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d.count))
            .style("fill", color);
        });

    }
    render(){

        var text = "20 Countries with the most players to have played in the Premier League";
        // Data does nothing here, just displays it so it isn't unused
        
    
        return(
            <section id = "graph">
                <div ref = {this.csvText}>{text}</div>
                <div ref = {this.csvGraph}></div>
                {/* <svg ref = {this.csvGraph} width="600" height="500" /> */}
            </section>
        )
    }
}

export default Graphs;