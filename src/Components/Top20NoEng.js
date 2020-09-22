import React, { Component } from 'react';
import * as d3 from 'd3';

class Top20NoEngland extends Component {

    constructor(props){
        super(props);
        this.top20NoEngText = React.createRef();
        this.top20NoEngGraph = React.createRef();
    }

    componentDidMount(){
        this.drawGraph();
    }

    drawGraph(){
        
        const { csv, color } = this.props;
        var height = 500;
        var width = 900;
        var adj = 65;

        const text = d3.select(this.top20NoEngText
.current);
        text.style("color", color);
        text.style("background-color", "white");

        // SVG
        var svg = d3.select(this.top20NoEngGraph.current).append("svg")
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
            xScale.domain(data.map(function(d) {return d.nationality}));
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
                .text("Number of players from each nationality to appear in the Premier league");

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
            .attr("x", (d) => xScale(d.nationality))
            .attr("y", (d) => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d.count))
            .style("fill", color);
        });

    }
    render(){

        var text = "England Removed";
        // Data does nothing here, just displays it so it isn't unused
        
    
        return(
            <section id = "top20">
                <div className = "row">
                    <div className="six columns">
                        <div ref = {this.top20NoEngText
            }>
                            <h3>{text}</h3>
                            <p>This chart looks much better and gives us more information. The most common country is France followed closely by the Scots and Irish.</p>
                            <p>Historically there have always been close links between England and France and the close proximity of the countries must also play a part too. 
                                These are not the only reasons for French players featuring so often. France is a two-time men's FIFA World Cup Winner and UEFA European Championship
                                winner so there is a high standard of football in the country from the 80s and 90s. 
                            </p>
                            <p>The Scottish and Irish are unsurprising being in the top 3. Both countries have a long history of football, speak the same language and have similar culture to 
                                England which makes the English league an attractive place to play in. Both countries home top divisions are porfessional however, do not have the money or skill
                                to compete with the top division in England, especially since the creation of the Premier League, meaning the best Irish and Scots move to England.
                            </p>
                        </div>
                    </div>
                    
                    <div className= "six columns">
                        <div ref = {this.top20NoEngGraph} width="600" height="500"></div>
                    </div>
                </div>    
                    {/* <svg ref = {this.top20NoEngGraph} width="600" height="500" /> */}
            </section>
        )
    }
}

export default Top20NoEngland;