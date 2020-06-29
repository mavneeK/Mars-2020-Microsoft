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
        };
    }
    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    onNodeClick(row, col) {
        const node = this.state.grid[row][col];
        if (node.isCircle === true || node.isCross === true) {
            return;
        }
        const newGrid = assignValue(this.state.grid, row, col, this.state.isCrossTurn);
        this.setState({ grid: newGrid });
        this.setState({ isCrossTurn: !this.state.isCrossTurn })
    }

    render() {

        const { grid, isCrossTurn } = this.state;

        return (
            <div>
                <NavigationBarTicTacToe></NavigationBarTicTacToe>
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

