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
import { Bidirectional, printPath } from '../Algorithms/Bidirectional';
import DetailGrid from '../Components/DetailGrid';

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
            WINDOW_HEIGHT: 100,
            WINDOW_WIDTH: 100,
            diagonal: false,
            weight: false,
            operations: 0,
            time: 0,
            shortestPathLength: 0,
            heuristic: "Manhattan",
            guideText: "A* is a weighted graph search algorithm",
            theme: 0,
            wait: false
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
        // console.log(x, y)
        const grid = this.getInitialGrid();
        this.setState({ grid })
        this.checkTheme();
        // console.log("Runn");
    }

    async componentDidMount() {
        await this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
        const grid = this.getInitialGrid();
        this.setState({ grid });
        var h = document.getElementById('secondDest');
        h.disabled = true;
        // console.log(window.screen.height);
        // console.log(window.screen.width);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }


    resetGrid = () => {
        window.location.reload(false);
    }

    handleMouseDown(row, col) {
        if (this.state.wait === true) {
            return;
        }
        if (row === START_NODE_ROW && col === START_NODE_COL) {
            this.setState({ isStartChange: true });
            return;
        }
        if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            this.setState({ isFinishChange: true });
            return;
        }
        const grid = this.state.grid;
        if (grid[row][col].isFinish == true) {
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
        if (this.state.wait === true) {
            return;
        }
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
        if (this.state.wait === true) {
            const grid = this.state.grid;
            grid[row][col].isFinish = true;
            this.setState({ grid: grid });
            this.setState({ wait: false });
            return;
        }
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
            if (visitedNodesInOrder[i].isStart === true) {
                continue;
            }
            if (visitedNodesInOrder[i].isFinish === true) {
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
            if (nodesInShortestPathOrder[i].isStart === true) {
                continue;
            }
            if (nodesInShortestPathOrder[i].isFinish === true) {
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
            var start = performance.now()
            const visitedNodesInOrder = Dijkstra(grid, startNode, finishNode, this.state.diagonal);
            var end = performance.now();
            console.log("YP")
            this.setState({ time: (end - start).toFixed(2) });
            this.setState({ operations: visitedNodesInOrder.length })
            const nodesInShortestPathOrder = ShortestPathDijkstra(visitedNodesInOrder[visitedNodesInOrder.length - 1]);
            this.setState({ shortestPathLength: nodesInShortestPathOrder.length === 1 ? 0 : nodesInShortestPathOrder.length });
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        } else if (this.state.searchMethod === 'BreathFirst') {
            var start = performance.now()
            const visitedNodesInOrder = BreathFirst(grid, startNode, finishNode, this.state.diagonal);
            var end = performance.now();
            this.setState({ time: (end - start).toFixed(2) });
            this.setState({ operations: visitedNodesInOrder.length })
            const nodesInShortestPathOrder = ShortestPathBreathFirst(visitedNodesInOrder[visitedNodesInOrder.length - 1]);
            this.setState({ shortestPathLength: nodesInShortestPathOrder.length === 1 ? 0 : nodesInShortestPathOrder.length });
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        } else if (this.state.searchMethod === 'DepthFirst') {
            var start = performance.now()
            const visitedNodesInOrder = DepthFirst(grid, startNode, finishNode, this.state.diagonal);
            var end = performance.now();
            this.setState({ time: (end - start).toFixed(2) });
            this.setState({ operations: visitedNodesInOrder.length })
            const nodesInShortestPathOrder = ShortestPathDepthFirst(visitedNodesInOrder[visitedNodesInOrder.length - 1]);
            this.setState({ shortestPathLength: nodesInShortestPathOrder.length === 1 ? 0 : nodesInShortestPathOrder.length });
            this.setState({ shortestPathLength: "Not available" })
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        } else if (this.state.searchMethod === 'AStar') {
            var start = performance.now()
            const visitedNodesInOrder = AStar(grid, startNode, finishNode, this.state.diagonal, this.state.heuristic);
            var end = performance.now();
            this.setState({ time: (end - start).toFixed(2) });
            this.setState({ operations: visitedNodesInOrder.length })
            const nodesInShortestPathOrder = ShortestPathAStar(finishNode);
            this.setState({ shortestPathLength: nodesInShortestPathOrder.length === 1 ? 0 : nodesInShortestPathOrder.length });
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        }
        else if (this.state.searchMethod === 'BestFirst') {
            var start = performance.now()
            const visitedNodesInOrder = BestFirst(grid, startNode, finishNode, this.state.diagonal, this.state.heuristic);
            var end = performance.now();
            this.setState({ time: (end - start).toFixed(2) });
            this.setState({ operations: visitedNodesInOrder.length })
            const nodesInShortestPathOrder = ShortestPathBestFirst(finishNode);
            this.setState({ shortestPathLength: nodesInShortestPathOrder.length === 1 ? 0 : nodesInShortestPathOrder.length });
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        } else if (this.state.searchMethod === 'Recursive') {
            var start = performance.now()
            const visitedNodesInOrder = Recursive(grid, startNode, finishNode, this.state.diagonal);
            var end = performance.now();
            this.setState({ time: (end - start).toFixed(2) });
            this.setState({ operations: visitedNodesInOrder.length })
            const nodesInShortestPathOrder = ShortestPathRecursion(finishNode);
            this.setState({ shortestPathLength: nodesInShortestPathOrder.length === 1 ? 0 : nodesInShortestPathOrder.length });
            this.setState({ shortestPathLength: "Not available" })
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        } else if (this.state.searchMethod === 'Bidirectional') {
            var start = performance.now()
            const visitedNodesInOrder = Bidirectional(grid, startNode, finishNode, this.state.diagonal);
            var end = performance.now();
            this.setState({ time: (end - start).toFixed(2) });
            this.setState({ operations: visitedNodesInOrder.length })
            const nodesInShortestPathOrder = printPath(grid, startNode, finishNode);
            this.setState({ shortestPathLength: nodesInShortestPathOrder.length === 1 ? 0 : nodesInShortestPathOrder.length });
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        }
    }
    searchMethod(newMethod) {
        if (newMethod === 'Dijkstra' || newMethod === "BreathFirst" || newMethod === "DepthFirst" || newMethod === "Recursive" || newMethod === "Bidirectional") {
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
        if (newMethod === "BreathFirst" || newMethod === "DepthFirst" || newMethod === "Recursive" || newMethod === "Bidirectional") {
            var h = document.getElementById('addWeights');
            h.disabled = true;
            this.removeWeights();
        } else {
            var h = document.getElementById('addWeights');
            h.disabled = false;
        }
        if (newMethod === 'Dijkstra') {
            var st = newMethod + " is a non-heuristic based weighted search algorithm";
            this.setState({ guideText: st });
        }
        if (newMethod === 'Recursive') {
            var st = newMethod + " is a non-weighted search algorithm and does not guarantee shortest path.";
            this.setState({ guideText: st });
        }
        if (newMethod === 'DepthFirst') {
            var st = newMethod + " is a non-weighted search algorithm and does not guarantee shortest path.";
            this.setState({ guideText: st });
        }
        if (newMethod === 'Dijkstra' || newMethod === 'BreathFirst' || newMethod === 'DepthFirst') {
            var h = document.getElementById('secondDest');
            h.disabled = false;
        } else {
            var h = document.getElementById('secondDest');
            h.disabled = true;
            this.removeFinish();
        }
        this.setState({ searchMethod: newMethod });
    }

    removeWeights() {
        const grid = this.state.grid;
        for (const row of grid) {
            for (const node of row) {
                if (node.weight != 1)
                    node.weight = 1;
            }
        }
        this.setState({ grid: grid });

    }
    removeFinish() {
        const grid = this.state.grid;
        for (const row of grid) {
            for (const node of row) {
                if (node.isFinish === true && (node.row != FINISH_NODE_ROW || node.col != FINISH_NODE_COL)) {
                    node.isFinish = false;
                    document.getElementById(`node-${node.row}-${node.col}`).classList.remove('node-finish');
                }
            }
        }
        this.setState({ grid: grid });

    }

    changeWeights(value) {
        // console.log(value);
        if (value > 1) {
            const grid = this.state.grid;
            for (const row of grid) {
                for (const node of row) {
                    if (node.weight != 1)
                        node.weight = value;
                }
            }
            this.setState({ grid: grid });
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

    addDestination() {
        prompt("Click the node to make another destination\n Note that you cannot move this destination")
        this.setState({ wait: true });
        // const grid = this.state.grid;
        // for (const row of grid) {
        //     for (const node of row) {
        //         if (node.isFinish != true) {
        //             node.isFinish = true;
        //             this.setState({ grid: grid });
        //             return;
        //         }
        //     }
        // }
    }

    getInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < (this.state.WINDOW_HEIGHT / 25) - 5; row++) {
            const currentRow = [];
            for (let col = 0; col < (this.state.WINDOW_WIDTH / 25) - 3; col++) {
                const node = createNode(col, row);
                currentRow.push(node);
            }
            grid.push(currentRow);
        }
        return grid;
    };

    theme = () => {
        if (this.state.theme === 0) {
            // change to dark mode 
            this.setState({ theme: 1 });
            var element = document.getElementsByClassName('App')[0];
            element.style.backgroundColor = '#000000';
            element = document.getElementsByClassName('node');
            for (var ele of element) {
                ele.style.backgroundColor = '#a13d2d';
            }
            document.body.style.backgroundColor = '#000000'
            element = document.getElementsByClassName('navbar');
            for (var ele of element) {
                //ele.classList.add('bg-dark');
                ele.classList.remove('bg-light');
                ele.classList.add('text-light');
                ele.classList.remove('text-dark');
                ele.classList.add('navbar-dark');
                ele.classList.remove('navbar-light');
                ele.style.backgroundColor = '#000000';
            }
            element = document.getElementsByClassName('n');
            for (var ele of element) {
                //ele.classList.add('bg-dark');
                ele.classList.remove('bg-light');
                ele.classList.add('text-light');
                ele.classList.remove('text-dark');
                ele.classList.add('navbar-dark');
                ele.classList.remove('navbar-light');
                ele.style.backgroundColor = '#000000';

            }
        } else {
            this.setState({ theme: 0 });
            var element = document.getElementsByClassName('App')[0];
            element.style.backgroundColor = '#ffffff';
            element = document.getElementsByClassName('node');
            for (var ele of element) {
                ele.style.backgroundColor = '#ffffff';
            }
            document.body.style.backgroundColor = '#ffffff'

            // change to white mode
            element = document.getElementsByClassName('navbar');
            for (var ele of element) {
                ele.classList.remove('bg-dark');
                ele.classList.add('bg-light');
                ele.classList.remove('text-light');
                ele.classList.add('text-dark');
                ele.classList.remove('navbar-dark');
                ele.classList.add('navbar-light');
            }
            element = document.getElementsByClassName('n');
            for (var ele of element) {
                ele.classList.remove('bg-dark');
                ele.classList.add('bg-light');
                ele.classList.remove('text-light');
                ele.classList.add('text-dark');
                ele.classList.remove('navbar-dark');
                ele.classList.add('navbar-light');
            }
        }
    }

    checkTheme = () => {
        if (this.state.theme === 1) {
            // change to dark mode 
            var element = document.getElementsByClassName('App')[0];
            element.style.backgroundColor = '#000000';
            element = document.getElementsByClassName('node');
            for (var ele of element) {
                ele.style.backgroundColor = '#a13d2d';
            }
            element = document.getElementsByClassName('navbar');
            for (var ele of element) {
                //ele.classList.add('bg-dark');
                ele.classList.remove('bg-light');
                ele.classList.add('text-light');
                ele.classList.remove('text-dark');
                ele.classList.add('navbar-dark');
                ele.classList.remove('navbar-light');
                ele.style.backgroundColor = '#000000';
            }
            document.body.style.backgroundColor = '#000000'
            element = document.getElementsByClassName('n');
            for (var ele of element) {
                //ele.classList.add('bg-dark');
                ele.classList.remove('bg-light');
                ele.classList.add('text-light');
                ele.classList.remove('text-dark');
                ele.classList.add('navbar-dark');
                ele.classList.remove('navbar-light');
                ele.style.backgroundColor = '#000000';

            }
        } else {
            var element = document.getElementsByClassName('App')[0];
            element.style.backgroundColor = '#ffffff';
            element = document.getElementsByClassName('node');
            for (var ele of element) {
                ele.style.backgroundColor = '#ffffff';
            }
            document.body.style.backgroundColor = '#ffffff'

            // change to white mode
            element = document.getElementsByClassName('navbar');
            for (var ele of element) {
                ele.classList.remove('bg-dark');
                ele.classList.add('bg-light');
                ele.classList.remove('text-light');
                ele.classList.add('text-dark');
                ele.classList.remove('navbar-dark');
                ele.classList.add('navbar-light');
            }
            element = document.getElementsByClassName('n');
            for (var ele of element) {
                ele.classList.remove('bg-dark');
                ele.classList.add('bg-light');
                ele.classList.remove('text-light');
                ele.classList.add('text-dark');
                ele.classList.remove('navbar-dark');
                ele.classList.add('navbar-light');
            }
        }
    }

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
                    theme={() => this.theme()}
                    addDestination={() => this.addDestination()}
                >
                </NavigationBar>
                <DetailGrid guideText={this.state.guideText}
                    operations={this.state.operations}
                    time={this.state.time}
                    shortestPathLength={this.state.shortestPathLength}></DetailGrid>
                <div className="grid">
                    {/* <img src={marsPlanet} height="100px" style={{ position: "absolute" }}></img> */}
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
        previousNode_o: null,
        previousNode_t: null,
        isVisited_o: false,
        isVisited_t: false,
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