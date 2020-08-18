import React, { Component } from 'react';

class Graphs extends Component {
    render(){

        var data = [1,2,3,4,5,6,7,8,9,10]
        // Data does nothing here, just displays it so it isn't unused
    
        return(
            <section id = "graph">
                <h3>It worked</h3>
                <p>Unreal</p>
                <div id = "first_graph">{data}</div> 
            </section>
        )
    }
}

export default Graphs;