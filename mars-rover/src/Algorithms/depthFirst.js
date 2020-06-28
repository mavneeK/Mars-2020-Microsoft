export function DepthFirst(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const queue = [];
    const unvisitedNodes = getAllNodes(grid);
}