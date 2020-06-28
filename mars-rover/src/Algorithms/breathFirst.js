export function breathFirst(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const queue = [];
    const unvisitedNodes = getAllNodes(grid);
    queue.push(startNode);
    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (currentNode.isVisited === true) continue;
        if (currentNode.isWall && queue.length < 1) return visitedNodesInOrder;

        if (currentNode.isWall) continue;
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        if (currentNode === finishNode) return visitedNodesInOrder;
        updateQueue(queue, currentNode, grid);
        console.log("running")
    }
}

function updateQueue(queue, currentNode, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = currentNode.distance + 1;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbor = [];
    const { col, row } = node;
    if (row > 0) neighbor.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbor.push(grid[row + 1][col]);
    if (col > 0) neighbor.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbor.push(grid[row][col + 1]);
    return neighbor.filter(neighbor => !neighbor.isVisited);
}
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode != null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}