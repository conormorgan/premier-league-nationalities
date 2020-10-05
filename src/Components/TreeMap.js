import React, { Component } from 'react';
import * as d3 from 'd3';

class TreeMap extends Component{

    constructor(props){
        super(props);
        this.treeMap = React.createRef();
        this.state = {
            treemapData: this.props.treeData,
        }


        this.drawGraph = this.drawGraph.bind(this);
    }

    componentDidMount(){
        this.drawGraph();
    }

    componentDidUpdate(){
        d3.selectAll(".tree").remove().exit();

        this.drawGraph();
    }

    drawGraph(){

        const data = this.state.treemapData;

        var width = 959;
        var height = 600;
        var adj = 65;

        // SVG
        var svg = d3.select(this.treeMap.current).append("svg")
                    .attr("class", "tree")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("height", height)
                    .attr("width", width)
                    .attr("viewBox", "-" + adj + " -"+ adj + " " + (width + adj) + " " + (height + adj*2))
                    .style("padding", 10)
                    .style("margin", 20)
                    .style('background-color', "white")
                    .classed("svg-content", true);

        // Give data to hierarchy layout -> may need to change d.value to d.count
        var root = d3.hierarchy(data).sum((d => d.count));

        // var kx = width / root.dx; 
        // var ky = height / 1;

        // Initialise treemap
        d3.treemap()
            .size([width, height])
            // .paddingTop(28)
            // .paddingRight(7)
            .paddingInner(2)
            (root);

        const color = d3.scaleOrdinal().domain(["Europe", "Asia", "Africa", "North America", "South America","Oceania"])
                                       .range([ "green", "red", "orange","blue","yellow","aqua"]);

        // const opacity = d3.scaleLinear().domain([10, 30])
        //                                 .range([.5,1]);

        // Select the nodes
        var nodes = svg.selectAll("rect")
                        .data(root.leaves());

        // Draw the rectangles
        nodes.enter()
            .append("rect")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("fill", function(d){ 
                // console.log(d);
                return color(d.parent.data.name)
            } )
            // .attr("opacity", function(d){ return opacity(d.data.count)})
        
        nodes.exit().remove()

        // Titles
        svg.selectAll("text")
            .data(root.leaves())
            .enter()
            .append("text")
            .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
            .text(function(d){ return d.data.name })
            // .attr("font-size", "12px")
            .attr("fill", "white")
            // .attr("opacity", function(d){            Do something with the opacity to hide labels if they are too big
            //   return d.data.name.length > 7 ? 0:1;
            // });

        // Country counts under title
        svg.selectAll("vals")
            .data(root.leaves())
            .enter()
            .append("text")
            .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+35})    // +20 to adjust position (lower)
            .text(function(d){ return d.data.count })
            .attr("font-size", "11px")
            .attr("fill", "white")
        
        // Add the continental titles - don't think need these, better with a legend
        // svg
        // .selectAll("titles")
        // .data(root.descendants().filter(function(d){return d.depth===1}))
        // .enter()
        // .append("text")
        //     .attr("x", function(d){ return d.x0})
        //     .attr("y", function(d){ return d.y0+21})
        //     .text(function(d){ return d.data.name })
        //     .attr("font-size", "19px")
        //     .attr("fill",  "black")//function(d){ return color(d.data.name)} )
    
        // Add the chart heading
        svg
        .append("text")
            .attr("x", 0)
            .attr("y", -14)    // +20 to adjust position (lower)
            .text("Three group leaders and 14 employees")
            .attr("font-size", "19px")
            .attr("fill",  "black" )

    }

    render(){
        return(
            <section id = "treemap">
                <div className = "row">
                        <h2>Treemap</h2>
                        <div className = "row">
                            <div className="six columns">
                                <button onClick= {() => this.setState({treemapData: this.props.treeData})}>All countries</button>
                                <button onClick= {() => this.setState({treemapData: this.props.no_eng})}>No England</button>
                            </div>
                        </div>
                        <div ref = {this.treeMap}></div>
                    
                </div>
                
            </section>
        )
    }

}

export default TreeMap;