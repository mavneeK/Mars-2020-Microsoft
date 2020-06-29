import React, { Component } from 'react';
import NavigationBarTicTacToe from '../Components/NavigationTicTacToe';
import Node from './Node/Node'
import './TicTacToe.css'

export default class TicTacToe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            isCrossTurn: true,
            message: "Hi there",
            isGameRunning: true,
            isHuman: true
        };
    }
    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }



    didSomeoneWin() {
        const arr = this.state.grid;
        for (var i = 0; i < 3; i++) {
            console.log("R");
            if (arr[i][0].isCircle === true && arr[i][1].isCircle === true && arr[i][2].isCircle === true) {
                this.setState({ message: "Circle Won !!" });
                this.setState({ isGameRunning: false });
                return true;
            }
            if (arr[i][0].isCross === true && arr[i][1].isCross === true && arr[i][2].isCross === true) {
                this.setState({ message: "Cross Won" });
                this.setState({ isGameRunning: false });
                return true;
            }
        }
        for (var i = 0; i < 3; i++) {
            if (arr[0][i].isCircle === true && arr[1][i].isCircle === true && arr[2][i].isCircle === true) {
                this.setState({ message: "DONE" });
                this.setState({ isGameRunning: false });

                return true;
            }
            if (arr[0][i].isCross === true && arr[1][i].isCross === true && arr[2][i].isCross === true) {
                this.setState({ message: "DONE" });
                this.setState({ isGameRunning: false });

                return true;
            }
        }
        for (var i = 0; i < 1; i++) {
            if (arr[i][i].isCross === true && arr[i + 1][i + 1].isCross === true && arr[i + 2][i + 2].isCross === true) {
                this.setState({ message: "DONE" });
                this.setState({ isGameRunning: false });

                return true;
            }
            if (arr[i][i].isCircle === true && arr[i + 1][i + 1].isCircle === true && arr[i + 2][i + 2].isCircle === true) {
                this.setState({ message: "DONE" });
                this.setState({ isGameRunning: false });

                return true;
            }
        }
        for (var i = 0; i < 1; i++) {
            if (arr[i][2 - i].isCircle === true && arr[i + 1][1 - i].isCircle === true && arr[i + 2][i].isCircle === true) {
                this.setState({ message: "DONE" });
                this.setState({ isGameRunning: false });

                return true; // there may be error check again
            }
            if (arr[i][2 - i].isCross === true && arr[i + 1][1 - i].isCross === true && arr[i + 2][i].isCross === true) {
                this.setState({ message: "DONE" });
                this.setState({ isGameRunning: false });

                return true; // there may be error check again
            }
        }
        return false;
    }

    onNodeClick(row, col) {
        const node = this.state.grid[row][col];
        if (node.isCircle === true || node.isCross === true || this.state.isGameRunning === false) {
            return;
        }
        const newGrid = assignValue(this.state.grid, row, col, this.state.isCrossTurn);
        this.setState({ grid: newGrid });
        this.setState({ isCrossTurn: !this.state.isCrossTurn })
        this.didSomeoneWin();
    }


    humanFirst = () => {
        this.setState({ isHuman: true });
        var humanButton = document.getElementById('humanButton');
        humanButton.disabled = true;
        var alienButton = document.getElementById('alienButton');
        alienButton.disabled = false;

    }
    alienFirst = () => {
        this.setState({ isHuman: false });
        var humanButton = document.getElementById('humanButton');
        humanButton.disabled = false;
        var alienButton = document.getElementById('alienButton');
        alienButton.disabled = true;

    }

    render() {

        const { grid, isCrossTurn } = this.state;

        return (
            <div>
                <NavigationBarTicTacToe
                    humanFirst={() => this.humanFirst()}
                    alienFirst={() => this.alienFirst()}
                ></NavigationBarTicTacToe>
                <div className="tictactoe">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isCross, isCircle } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isCross={isCross}
                                            isCircle={isCircle}
                                            row={row}
                                            onNodeClick={(row, col) => this.onNodeClick(row, col)}
                                        >
                                        </Node>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <span className="container">{this.state.message}</span>
            </div>
        )
    }
}


const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 3; row++) {
        const currentRow = [];
        for (let col = 0; col < 3; col++) {
            const node = createNode(col, row);
            currentRow.push(node);
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isVisited: false,
        isCross: false,
        isCircle: false,
        value: "",
    };
};

const assignValue = (grid, row, col, isCross) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (isCross === true) {
        const newNode = {
            ...node,
            isCross: true,
        }
        newGrid[row][col] = newNode;
        return newGrid;
    } else {
        const newNode = {
            ...node,
            isCircle: true,
        }
        console.log("R")
        newGrid[row][col] = newNode;
        return newGrid;
    }
}