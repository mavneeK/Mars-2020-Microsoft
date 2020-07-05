export function Bidirectional(grid, startNode, finishNode, diagonal) {
    let s_queue = [];
    let t_queue = [];
    var intersectNode = -1;
    initializeMaps(grid);
    s_queue.push(startNode);
    startNode.isVisited_o = true;
    var visitedNodes = [];
    startNode.previousNode_o = -1;
    visitedNodes.push(startNode);
    t_queue.push(finishNode);
    finishNode.isVisited_t = true;
    finishNode.previousNode_t = -1;
    while (s_queue.length > 0 && t_queue.length > 0) {
        BFSOne(grid, s_queue, diagonal, visitedNodes);
        BFSTwo(grid, t_queue, diagonal, visitedNodes);
        intersectNode = isIntersecting(grid);
        console.log(intersectNode + "iiiii")
        if (intersectNode !== -1) {
            console.log("Ruun intersecting")
            return visitedNodes;
            // return printPath(s_parent, t_parent, startNode, finishNode, intersectNode);
        }

        console.log(s_queue.length)
    }
    console.log(visitedNodes);

    return visitedNodes;
}

function BFSOne(grid, s_queue, diagonal, visitedNodes) {
    console.log("Rom");
    console.log(s_queue.length)
    var current = s_queue.shift();
    var neighbors = getUnvisitedNeighbors(current, grid, diagonal);
    for (const neighbor of neighbors) {
        console.log("NEE")
        // console.log(neighbor)
        console.log(neighbor.isVisited_o)
        if (neighbor.isVisited_o === false) {
            neighbor.previousNode_o = current;
            console.log("INNEE")
            neighbor.isVisited_o = true;
            s_queue.push(neighbor);
            visitedNodes.push(neighbor);
        }
    }
}
function BFSTwo(grid, t_queue, diagonal, visitedNodes) {
    console.log("Rom");
    console.log(t_queue.length)
    var current = t_queue.shift();
    var neighbors = getUnvisitedNeighbors(current, grid, diagonal);
    for (const neighbor of neighbors) {
        console.log("NEE")
        if (neighbor.isVisited_t === false) {

            neighbor.previousNode_t = current;
            console.log("INNEE")
            neighbor.isVisited_t = true;
            t_queue.push(neighbor);
            visitedNodes.push(neighbor);
        }
    }
}

export function printPath(grid, startNode, finishNode) {

    var intersectNode = null;
    var path = [];
    for (const row of grid) {
        for (const node of row) {
            if (node.intersecting === true) {
                console.log("FOund");
                intersectNode = node;
            }
        }
    }
    path.push(intersectNode);
    var node = intersectNode;
    while (node !== startNode) {
        path.unshift(node.previousNode_o);
        node = node.previousNode_o
        console.log(node);
    }
    node = intersectNode;
    while (node != finishNode) {
        path.unshift(node.previousNode_t);
        node = node.previousNode_t;
        console.log(node);
    }
    console.log("printPaht")
    console.log(path.length)
    return path;
}

function getUnvisitedNeighbors(node, grid, diagonal) {
    const neighbor = [];
    const { col, row } = node;
    if (row > 0) neighbor.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbor.push(grid[row + 1][col]);
    if (col > 0) neighbor.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbor.push(grid[row][col + 1]);
    if (diagonal === true) {
        if (col > 0 && row > 0) neighbor.push(grid[row - 1][col - 1]);
        if (col < grid[0].length - 1 && row > 0) neighbor.push(grid[row - 1][col + 1]);
        if (col > 0 && row < grid.length - 1) neighbor.push(grid[row + 1][col - 1]);
        if (col < grid[0].length - 1 && row < grid.length - 1) neighbor.push(grid[row + 1][col + 1]);
    }
    // return neighbor.filter(neighbor => !neighbor.isVisited);
    return neighbor;
}

function isIntersecting(grid) {

    for (const row of grid) {
        for (const node of row) {
            if (node.isVisited_o === true && node.isVisited_t === true) {
                node.intersecting = true;
                return node;
            }
        }
    }
    return -1;
}

function initializeMaps(grid) {
    for (const row of grid) {
        for (const node of row) {
            node.isVisited_o = false;
            node.isVisited_t = false;
            node.intersecting = false;
        }
    }
}