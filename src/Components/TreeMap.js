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
        var adj = 35;

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
        var root = d3.hierarchy(data).sum((d => d.count));;

        // Initialise treemap
        d3.treemap()
            .size([width, height])
            .paddingInner(2)
            (root);

        const color = d3.scaleOrdinal().domain(["Europe", "Asia", "Africa", "North America", "South America","Oceania"])
                                       .range([ "#90be6d", "#ffbc42", "#8f2d56","#218380","#3a0ca3","#73d2de"]);

        // Select the nodes
        var nodes = svg.selectAll("rect")
                        .data(root.leaves());

        // Draw the rectangles
        nodes.enter()
            .append("rect")
            .attr("class","rectangle")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("fill", function(d){ 
                return color(d.parent.data.name)
            })
            .append("title").text(function(d){
                if (d.data.count === 1){
                    return d.data.name + ": " + d.data.count + " player"
                }
                else{
                    return d.data.name + ": " + d.data.count + " players";
                }
            });

        
        nodes.exit().remove()

        // Titles
        svg.selectAll("text")
            .data(root.leaves())
            .enter()
            .append("text")
            .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
            .text(function(d){return d.data.code})
            .attr("fill", "white")
            .attr("opacity", function(d){
                var width = this.getBBox().width;
                var height =this.getBBox().height;
                if((width + 5 < d.x1 - d.x0)&&(height + 20 < d.y1-d.y0)){
                    return 1;
                }
                else{
                    return 0;
                }
            });

        // Country counts under title
        svg.selectAll("vals")
            .data(root.leaves())
            .enter()
            .append("text")
            .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+35})    // +20 to adjust position (lower)
            .text(function(d){ 
                if(d.data.count > 26){
                    return d.data.count 
                }
            })
            .attr("font-size", "11px")
            .attr("fill", "white")
    
        // Add the chart heading
        svg
        .append("text")
            .attr("x", 0)
            .attr("y", -14)    // +20 to adjust position (lower)
            .text("Treemap showing the counts of players from each country to play in EPL and coloured by continent")
            .attr("font-size", "19px")
            .attr("fill",  "black" );

        //Behavioiur for zoom functionality
        var zoom = d3.zoom()
                    .scaleExtent([1, 8])
                    .on('zoom', function() {
                        svg.selectAll('rect')
                        .attr('transform', d3.event.transform);
                        svg.selectAll("text")
                        .attr('transform', d3.event.transform);
                    });

        // Calls the zoom funct and removes panning and dragging
        svg.call(zoom)
            .on("mousedown.zoom", null)
            .on("touchstart.zoom", null)
            .on("touchmove.zoom", null)
            .on("touchend.zoom", null);
    
    }

    render(){
        return(
            <section id = "treemap">
                <div className = "row">
                    <h2 className="header-dark-bg">Treemap</h2>

                    <p className="text-dark-bg">
                        This treemap is another way to visualise the data in, perhaps, an easier format to get the dominance of European and British players.
                        Each country has a rectangle and the area of each rectangle corresponds to how many payers have featured in the league.
                        Also the treemap is colour-coded to show the continents and they have contributed to the array of players.
                    </p>
                    <p className="text-dark-bg">
                        The treemap is interactive as hovering over each country will show the player count. 
                        You can also zoom in to inspect some of the smaller countries more closely and see how they stack up.
                        Again, the buttons are there to remove the English players, clicking either button is also a good way to reset the view of the treemap.
                    </p>

                        
                    
                </div>

                <div className = "row">
                    <div className="six columns">
                        <button onClick= {() => this.setState({treemapData: this.props.treeData})}>All countries</button>
                        <button onClick= {() => this.setState({treemapData: this.props.no_eng})}>No England</button>
                    </div>
                </div>
                <div className="row">
                    <div className="nine columns">
                        <div ref = {this.treeMap}></div>
                    </div>
                </div>
                
                
            </section>
        )
    }

}

export default TreeMap;