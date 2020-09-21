import React, { Component } from 'react';
import * as d3 from 'd3';

class Graphs extends Component {

    constructor(props){
        super(props);
        this.testText = React.createRef();
        this.testGraph = React.createRef();
    }

    componentDidMount(){
        
        

        this.drawGraph();
        
    }

    drawGraph(){
        // const testData = [10,20,30,40,50,60,70,80,90];
        // const testData = [12,36,55,25,35,10,40];
        const { testData, color, csv } = this.props;

        const text = d3.select(this.testText.current);
        text.style("color", color);
        text.style("background-color", "white");

        d3.csv(csv).then(function(data) {
            data.forEach(function(d) {
                d.count = +d.count;
                
            });
            // console.log(data[0]);
        });

        const h = 500;
        const w = 650;
        // Creates the app background
        const graph = d3.select(this.testGraph.current)
            .append('svg')
            .attr('width', w)
            .attr('height', h)
            .style('background-color', "white")
            .style('padding', 10)
            .style('margin-left', 50);

        // Creates the bars
        graph.selectAll("rect")
            .data(testData)
            .enter()
            .append("rect")
            .attr("x", (d,i) => i * 70)
            .attr("y", (d,i) => h - 5 * d )
            .attr("width", 60)
            .attr("height", (d, i) => d * 10)
            .attr("fill", color);
    }
    render(){

        var text = "Hello, testing how to access elements";
        // Data does nothing here, just displays it so it isn't unused
        
    
        return(
            <section id = "graph">
                <h3 ref = "test">It worked</h3>
                <p>Unreal</p>
                <div ref = {this.testText}>{text}</div>
                <div ref = {this.testGraph}></div>
            </section>
        )
    }
}

export default Graphs;