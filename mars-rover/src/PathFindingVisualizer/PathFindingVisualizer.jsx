import React, { Component } from 'react';
import Node from './Node/Node';
import { BreathFirst, ShortestPathBreathFirst } from '../Algorithms/breathFirst';
import NavigationBar from '../Components/NavigationBar';
import './PathFindingVisualizer.css'
import { Dijkstra, ShortestPathDijkstra } from '../Algorithms/Dijkstra';
//import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/dijkstra';

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;

export default class PathFindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            isStartChange: false,
            isFinishChange: false,
            searchMethod: 'Dijkstra',
        };
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    resetGrid = () => {
        window.location.reload(false);
    }

    handleMouseDown(row, col) {
        if (row === START_NODE_ROW && col === START_NODE_COL) {
            this.setState({ isStartChange: true });
            return;
        }
        if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            this.setState({ isFinishChange: true });
            return;
        }
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (this.state.isStartChange === true) {
            START_NODE_ROW = row;
            START_NODE_COL = col;
            const grid = getInitialGrid();
            this.setState({ grid });
            return;
        }
        if (this.state.isFinishChange === true) {
            FINISH_NODE_ROW = row;
            FINISH_NODE_COL = col;
            const grid = getInitialGrid();
            this.setState({ grid });
            return;
        }
        if (row === START_NODE_ROW && col === START_NODE_COL) {
            return;
        }
        if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            return;
        }
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp(row, col) {
        if (this.state.isStartChange === true) {
            START_NODE_ROW = row;
            START_NODE_COL = col;
            const grid = getInitialGrid();
            this.setState({ grid });
        }
        if (this.state.isFinishChange === true) {
            FINISH_NODE_ROW = row;
            FINISH_NODE_COL = col;
            const grid = getInitialGrid();
            this.setState({ grid });
        }
        this.setState({ isStartChange: false });
        this.setState({ isFinishChange: false });
        this.setState({ mouseIsPressed: false });
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualizeDijkstra() {
        const { grid } = this.state;

        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        if (this.state.searchMethod === 'Dijkstra') {
            const visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
            const nodesInShortestPathOrder = ShortestPathDijkstra(finishNode);
            this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
            console.log("Dij");
        } else if (this.state.searchMethod === 'BreathFirst') {
            const visitedNodesInOrder = BreathFirst(grid, startNode, finishNode);
            const nodesInShortestPathOrder = ShortestPathBreathFirst(finishNode);
            this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
            console.log("BB");
        }
    }
    searchMethod(newMethod) {
        this.setState({ searchMethod: newMethod });
    }

    render() {
        const { grid, mouseIsPressed } = this.state;
        console.log(grid);

        return (
            <>
                <NavigationBar
                    resetGrid={this.resetGrid}
                    searchMethod={(newMethod) => this.searchMethod(newMethod)}
                    runAlgorithm={() => this.visualizeDijkstra()}>
                </NavigationBar>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp(row, col)}
                                            row={row}
                                        >
                                        </Node>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 25; row++) {
        const currentRow = [];
        for (let col = 0; col < 67; col++) {
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
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};