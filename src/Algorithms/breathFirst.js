export function BreathFirst(grid, startNode, finishNode, diagonal) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const queue = [];
    queue.push(startNode);
    let prevNode = startNode;
    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (currentNode.isVisited === true) continue;
        if (currentNode.isWall && queue.length < 1) return visitedNodesInOrder;
        if (currentNode.isWall) continue;
        currentNode.isVisited = true;
        prevNode = currentNode;
        visitedNodesInOrder.push(currentNode);
        if (currentNode === finishNode) return visitedNodesInOrder;
        updateQueue(queue, currentNode, grid, diagonal);
    }
}

function updateQueue(queue, currentNode, grid, diagonal) {
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid, diagonal);
    for (const neighbor of unvisitedNeighbors) {
        if (neighbor.distance > currentNode.distance + 1) {
            neighbor.distance = currentNode.distance + 1;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
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
    if (diagonal === true) {
        if (col > 0 && row > 0) neighbor.push(grid[row - 1][col - 1]);
        if (col < grid[0].length - 1 && row > 0) neighbor.push(grid[row - 1][col + 1]);
        if (col > 0 && row < grid.length - 1) neighbor.push(grid[row + 1][col - 1]);
        if (col < grid[0].length - 1 && row < grid.length - 1) neighbor.push(grid[row + 1][col + 1]);
    }
    return neighbor.filter(neighbor => !neighbor.isVisited);
}

export function ShortestPathBreathFirst(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode != null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}