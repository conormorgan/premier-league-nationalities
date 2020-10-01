import React, { Component } from 'react';
import * as d3 from 'd3';

class TreeMap extends Component{

    constructor(props){
        super(props);
        this.treeMap = React.createRef();
    }

    componentDidMount(){
        this.drawGraph();
    }

    drawGraph(){

        const csv = this.props.csv;

        var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 445 - margin.left - margin.right,
        height = 445 - margin.top - margin.bottom;

        // SVG
        var svg = d3.select(this.treeMap.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        

    }

    render(){
        return(
            <section id = "treemap">
                <p>Treemap</p>
                <div ref = {this.treeMap}></div>
            </section>
        )
    }

}

export default TreeMap;