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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/"><img src={mars_image} height="24px" width="24px" style={{ marginRight: "10px" }}></img>Mars 2020</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <select className="navbar navbar-dark text-light bg-dark btn btn-dark border border-light rounded" onChange={(event) => this.props.searchMethod(event.target.value)}>
                            <option value="AStar">A* Star</option>
                            <option value="Bidirectional">Bidirectional</option>
                            <option value="BestFirst">Best First</option>
                            <option value="Dijkstra">Dijkstra</option>
                            <option value="BreathFirst">Breath First</option>
                            <option value="Recursive">Recursive</option>
                            <option value="DepthFirst">Depth First</option>
                        </select>
                        <select className="navbar navbar-dark text-light bg-dark btn btn-dark border border-light rounded" id="heuristic" style={{ marginLeft: "10px" }} onChange={(event) => this.props.changeHeuristic(event.target.value)}>
                            <option value="Manhattan">Manhattan</option>
                            <option value="Euclidean">Euclidean</option>
                            <option value="DiagonalDistance"> Diagonal Distance</option>
                            <option value="Octile">Octile</option>
                        </select>
                        <span className="btn btn-dark border border-light rounded" style={{ marginLeft: "10px" }}>Diagonal Search: <input type="checkbox" onClick={() => this.props.changeDiagonal()}></input></span>
                        <button className="btn btn-dark border border-light rounded" style={{ marginLeft: "10px" }} onClick={() => this.props.resetGrid()}>
                            Reset Grid
                    </button>
                        <span className="btn btn-dark border border-light rounded" style={{ marginLeft: "10px" }}>Add Weights Instead Of Walls  <input type="checkbox" id="addWeights" onClick={() => this.props.changeWeights()}></input></span>
                        <button className="btn btn-dark border border-light rounded" style={{ marginLeft: "10px" }} onClick={() => this.props.runAlgorithm()}>
                            Run Algorithm
                    </button>
                        <span style={{ marginRight: "10px", marginLeft: "10px" }} className="btn btn-dark border border-light text-light rounded">Weight:</span>
                        <input style={{ width: "10%" }} className="btn btn-dark border border-light text-light rounded" placeholder="10" id="weight" type="number" onChange={(event) => this.props.changeWeight(event.target.value)}>
                        </input>
                        <img src={alien} height="40px" width="40px" style={{ marginRight: "10px" }}></img>
                    </div>
                </nav>
            </div >
        )
    }
}