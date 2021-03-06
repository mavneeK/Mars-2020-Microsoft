import React from 'react';
import './NavigationBar.css';

var mars_image = require('../assets/mars_icon.png')
var alien = require('../assets/alien.gif');


export default class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    changeWeightValue(vv) {
        console.log(vv);
        document.getElementById('weight').value = vv;
        this.props.changeWeight(vv);
    }

    render() {
        return (
            <div>
                <nav id="mode" style={{ backgroundColor: '#123123' }} className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/"><img src={mars_image} height="24px" width="24px" style={{ marginRight: "5px" }}></img>Mars 2020</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <select className="navbar navbar-light text-dark bg-light btn btn-dark border border-light rounded" onChange={(event) => this.props.searchMethod(event.target.value)}>
                            <option value="AStar">A* Star</option>
                            <option value="Bidirectional">Bidirectional</option>
                            <option value="BestFirst">Best First</option>
                            <option value="Dijkstra">Dijkstra</option>
                            <option value="BreathFirst">Breath First</option>
                            <option value="Recursive">Recursive</option>
                            <option value="DepthFirst">Depth First</option>
                        </select>
                        <select className="navbar navbar-light text-dark bg-light btn btn-light border border-light rounded" id="heuristic" style={{ marginLeft: "5px" }} onChange={(event) => this.props.changeHeuristic(event.target.value)}>
                            <option value="Manhattan">Manhattan</option>
                            <option value="Euclidean">Euclidean</option>
                            <option value="DiagonalDistance"> Diagonal Distance</option>
                            <option value="Octile">Octile</option>
                        </select>
                        <span className="navbar btn btn-light border border-light rounded" style={{ marginLeft: "5px" }}>Diagonal Search: <input style={{ marginLeft: "4px" }} type="checkbox" onClick={() => this.props.changeDiagonal()}></input></span>
                        <button className="navbar btn btn-light border border-light rounded" style={{ marginLeft: "5px" }} onClick={() => this.props.resetGrid()}>
                            Reset Grid
                    </button>
                        <span className="navbar btn btn-light border border-light rounded" style={{ marginLeft: "5px" }}>Add Weights Instead Of Walls<input style={{ marginLeft: "4px" }} type="checkbox" id="addWeights" onClick={() => this.props.changeWeights()}></input></span>
                        <button className="navbar btn btn-light border border-light rounded" style={{ marginLeft: "5px" }} onClick={() => this.props.runAlgorithm()}>
                            Run Algorithm
                    </button>
                        <span style={{ marginRight: "5px", marginLeft: "5px" }} className="navbar btn btn-light border border-light text-dark rounded">Weight:</span>
                        <input style={{ width: "5%" }} className="navbar btn btn-light border border-light text-dark rounded" placeholder="5" id="weight" type="number" onChange={(event) => this.props.changeWeight(event.target.value)}>
                        </input>
                        <button id="secondDest" className="navbar btn btn-light border border-light rounded" style={{ marginLeft: "5px" }} onClick={() => this.props.addDestination()}>
                            Add another destination
                    </button>
                        <img src={alien} height="40px" width="40px"></img>
                    </div>
                    <span style={{ marginLeft: "5px" }} className="navbar btn btn-light rounded">Mars Theme:</span>
                    <label className="switch">
                        <input type="checkbox" onChange={() => this.props.theme()} />
                        <span className="slider round"></span>
                    </label>
                </nav>
            </div >

        )
    }
}