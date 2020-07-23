export function DepthFirst(grid, startNode, finishNode, diagonal) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    let visited = new Map();
    let stack = [];
    stack.push(startNode);
    while (stack.length > 0) {
        // remove the topmost element
        const currentNode = stack.pop();


        // if topmost not visited, visited topmost and add the element to visited stack 
        if (currentNode.isWall === true && currentNode.length < 1) return visitedNodesInOrder;
        if (currentNode.isWall === true) continue;


        if (currentNode.isVisited === false) {
            visitedNodesInOrder.push(currentNode);
            currentNode.isVisited = true;
        }
        if (currentNode.isFinish === true) return visitedNodesInOrder;
        if (currentNode === finishNode) return visitedNodesInOrder;

        // iterate the neighbours and push them to the stack if they are not visited
        updateStack(stack, currentNode, grid, diagonal);
    }
}

function updateStack(stack, currentNode, grid, diagonal) {

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid, diagonal);
    for (const neighbor of unvisitedNeighbors) {
        if (neighbor.distance > currentNode.distance + 1) {
            neighbor.distance = currentNode.distance + 1;
            neighbor.previousNode = currentNode;
            stack.push(neighbor);
        }
    }
}

function getUnvisitedNeighbors(node, grid, diagonal) {
    const neighbor = [];
    const { col, row } = node;
    if (row > 0) neighbor.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbor.push(grid[row + 1][col]);
    if (col > 0) neighbor.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbor.push(grid[row][col + 1]);
    // diagonal elements
    if (diagonal === true) {
        if (col > 0 && row > 0) neighbor.push(grid[row - 1][col - 1]);
        if (col < grid[0].length - 1 && row > 0) neighbor.push(grid[row - 1][col + 1]);
        if (col > 0 && row < grid.length - 1) neighbor.push(grid[row + 1][col - 1]);
        if (col < grid[0].length - 1 && row < grid.length - 1) neighbor.push(grid[row + 1][col + 1]);
    }
    return neighbor.filter(neighbor => !neighbor.isVisited);
}

export function ShortestPathDepthFirst(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode != null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}