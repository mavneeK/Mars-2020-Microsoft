import React from 'react';
var mars_image = require('../assets/mars_icon.png')


export default class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    // handleSearchChange(event) {
    //     console.log(event.target.value);
    //     //this.props.searchMethod(event.target.value);
    // }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#"><img src={mars_image} height="24px" width="24px" style={{ marginRight: "10px" }}></img>Mars 2020</a>
                    <select className="navbar navbar-dark text-light bg-dark btn btn-dark border border-light rounded" onChange={(event) => this.props.searchMethod(event.target.value)}>
                        <option value="AStar">A* Star</option>
                        <option value="Dijkstra">Dijkstra</option>
                        <option value="BreathFirst">Breath First</option>
                        <option value="DepthFirst">Depth First</option>
                    </select>
                    <select className="navbar navbar-dark text-light bg-dark btn btn-dark border border-light rounded" id="heuristic" style={{ marginLeft: "10px" }} onChange={(event) => this.props.changeHeuristic(event.target.value)}>
                        <option value="Manhattan">Manhattan</option>
                        <option value="Euclidean">Euclidean</option>
                    </select>
                    <span className="btn btn-dark border border-light rounded" style={{ marginLeft: "10px" }}>Diagonal Search: <input type="checkbox" onClick={() => this.props.changeDiagonal()}></input></span>
                    <button className="btn btn-dark border border-light rounded" style={{ marginLeft: "10px" }} onClick={() => this.props.resetGrid()}>
                        Reset Grid
                    </button>

                    <button className="btn btn-dark border border-light rounded" style={{ marginLeft: "10px" }} onClick={() => this.props.runAlgorithm()}>
                        Run Algorithm
                    </button>
                    <a className="navbar navbar-dark text-light bg-dark bg-dark btn btn-dark border border-light rounded" style={{ marginLeft: "auto" }}>
                        Challenge Alien in TicTacToe Game
                    </a>
                </nav>
            </div >
        )
    }
}