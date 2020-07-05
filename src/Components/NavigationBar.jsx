import React from 'react';
import './NavigationBar.css';

var mars_image = require('../assets/mars_icon.png')


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
                    {/* <span className="btn btn-dark border border-light rounded" style={{ marginLeft: "auto" }}>{this.props.guideText}</span> */}
                </nav>
            </div >
        )
    }
}