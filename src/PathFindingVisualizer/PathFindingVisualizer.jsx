import React, { Component } from 'react';
import Node from './Node/Node';
import { BreathFirst, ShortestPathBreathFirst } from '../Algorithms/breathFirst';
import NavigationBar from '../Components/NavigationBar';
import './PathFindingVisualizer.css'
import { DepthFirst, ShortestPathDepthFirst } from '../Algorithms/depthFirst';
import { Dijkstra, ShortestPathDijkstra } from '../Algorithms/Dijkstra';
import { AStar, ShortestPathAStar } from '../Algorithms/A-Star';
import { BestFirst, ShortestPathBestFirst } from '../Algorithms/BestFirst'
import { Recursive, ShortestPathRecursion } from '../Algorithms/Recursive';

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;
let WINDOW_HEIGHT = 200;
let WINDOW_WIDTH = 200;
let NODE_WEIGHT = 10;


export default class PathFindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            isStartChange: false,
            isFinishChange: false,
            searchMethod: 'AStar',
            WINDOW_HEIGHT: 400,
            WINDOW_WIDTH: 1980,
            diagonal: false,
            weight: false,
            heuristic: "Manhattan",
            guideText: "A* is a weighted graph search algorithm"
        };
    }

    updateDimensions() {
        var win = window,
            doc = document,
            docElem = doc.documentElement,
            body = doc.getElementsByTagName('body')[0],
            x = win.innerWidth || docElem.clientWidth || body.clientWidth,
            y = win.innerHeight || docElem.clientHeight || body.clientHeight;
        WINDOW_WIDTH = x;
        WINDOW_HEIGHT = y;
        this.setState({ WINDOW_HEIGHT: y, WINDOW_WIDTH: x });
    }

    componentDidMount() {
        const grid = this.getInitialGrid();
        this.setState({ grid });
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
        // console.log(window.screen.height);
        // console.log(window.screen.width);
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
        if (this.state.weight === true) {
            const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        } else {
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        }
    }

    handleMouseEnter(row, col) {
        if (this.state.isStartChange === true) {
            START_NODE_ROW = row;
            START_NODE_COL = col;
            const grid = this.getInitialGrid();
            this.setState({ grid });
            return;
        }
        if (this.state.isFinishChange === true) {
            FINISH_NODE_ROW = row;
            FINISH_NODE_COL = col;
            const grid = this.getInitialGrid();
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
        if (this.state.weight === true) {
            const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        } else {
            const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
    }

    handleMouseUp(row, col) {
        if (this.state.isStartChange === true) {
            START_NODE_ROW = row;
            START_NODE_COL = col;
            const grid = this.getInitialGrid();
            this.setState({ grid });
        }
        if (this.state.isFinishChange === true) {
            FINISH_NODE_ROW = row;
            FINISH_NODE_COL = col;
            const grid = this.getInitialGrid();
            this.setState({ grid });
        }
        this.setState({ isStartChange: false });
        this.setState({ isFinishChange: false });
        this.setState({ mouseIsPressed: false });
    }

    animate(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            if (i === 0) {
                continue;
            }
            if (i === visitedNodesInOrder.length - 1) {
                continue;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            if (i === 0) {
                continue;
            }
            if (i === nodesInShortestPathOrder.length - 1) {
                continue;
            }
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualize() {
        const { grid } = this.state;
        reset(grid);
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        if (this.state.searchMethod === 'Dijkstra') {
            const visitedNodesInOrder = Dijkstra(grid, startNode, finishNode, this.state.diagonal);
            const nodesInShortestPathOrder = ShortestPathDijkstra(finishNode);
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        } else if (this.state.searchMethod === 'BreathFirst') {
            const visitedNodesInOrder = BreathFirst(grid, startNode, finishNode, this.state.diagonal);
            const nodesInShortestPathOrder = ShortestPathBreathFirst(finishNode);
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        } else if (this.state.searchMethod === 'DepthFirst') {
            const visitedNodesInOrder = DepthFirst(grid, startNode, finishNode, this.state.diagonal);
            const nodesInShortestPathOrder = ShortestPathDepthFirst(finishNode);
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        } else if (this.state.searchMethod === 'AStar') {
            const visitedNodesInOrder = AStar(grid, startNode, finishNode, this.state.diagonal, this.state.heuristic);
            const nodesInShortestPathOrder = ShortestPathAStar(finishNode);
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        }
        else if (this.state.searchMethod === 'BestFirst') {
            console.log("R");
            const visitedNodesInOrder = BestFirst(grid, startNode, finishNode, this.state.diagonal, this.state.heuristic);
            const nodesInShortestPathOrder = ShortestPathBestFirst(finishNode);
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        } else if (this.state.searchMethod === 'Recursive') {
            const visitedNodesInOrder = Recursive(grid, startNode, finishNode, this.state.diagonal);
            const nodesInShortestPathOrder = ShortestPathRecursion(finishNode);
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        }
    }
    searchMethod(newMethod) {
        if (newMethod === 'Dijkstra' || newMethod === "BreathFirst" || newMethod === "DepthFirst" || newMethod === "Recursive") {
            var st = newMethod + " is a non-heuristic based non-weighted search algorithm";
            this.setState({ guideText: st });
            var h = document.getElementById("heuristic");
            h.disabled = true;
        } else {
            var st = newMethod + " is a heuristic based search algorithm";
            this.setState({ guideText: st })
            var h = document.getElementById("heuristic");
            h.disabled = false;
        }
        if (newMethod === "BreathFirst" || newMethod === "DepthFirst" || newMethod === "Recursive") {
            var h = document.getElementById('addWeights');
            h.disabled = true;
        } else {
            var h = document.getElementById('addWeights');
            h.disabled = false;
        }
        this.setState({ searchMethod: newMethod });
    }

    changeWeights(value) {
        // console.log(value);
        if (value > 1) {
            NODE_WEIGHT = value;
            console.log(NODE_WEIGHT);
        }

    }

    // function to change the heuristic based on the dropdown on navigation bar
    changeHeuristic(newHeuristic) {
        console.log(newHeuristic);
        this.setState({ heuristic: newHeuristic });
    }

    changeDiagonal() {
        let check = this.state.diagonal;
        this.setState({ diagonal: !check });
    }

    changeWeight() {
        let check = this.state.weight;
        this.setState({ weight: !check });
    }

    getInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < this.state.WINDOW_HEIGHT / 25; row++) {
            const currentRow = [];
            for (let col = 0; col < this.state.WINDOW_WIDTH / 25; col++) {
                const node = createNode(col, row);
                currentRow.push(node);
            }
            grid.push(currentRow);
        }
        return grid;
    };

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <NavigationBar
                    resetGrid={this.resetGrid}
                    searchMethod={(newMethod) => this.searchMethod(newMethod)}
                    runAlgorithm={() => this.visualize()}
                    changeDiagonal={() => this.changeDiagonal()}
                    changeWeights={() => this.changeWeight()} // to switch the toggle of weight
                    changeHeuristic={(newHeuristic) => this.changeHeuristic(newHeuristic)}
                    changeWeight={(value) => this.changeWeights(value)}  // to change the value of weight
                    guideText={this.state.guideText}>
                </NavigationBar>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, weight, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            weight={weight}
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



const reset = (grid) => {
    for (const row of grid) {
        for (const node of row) {
            node.isVisited = false;
            node.previousNode = null;
            node.distance = Infinity;
            document.getElementById(`node-${node.row}-${node.col}`).classList.remove('node-visited');
            document.getElementById(`node-${node.row}-${node.col}`).classList.remove('node-shortest-path');

        }
    }
}

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        weight: 1,
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

const getNewGridWithWeightToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        weight: NODE_WEIGHT,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};