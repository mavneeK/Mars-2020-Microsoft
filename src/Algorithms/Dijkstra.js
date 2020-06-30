export function Dijkstra(grid, startNode, finishNode, diagonal) {
   const visitedNodesInOrder = [];
   startNode.distance = 0;
   const unvisitedNodes = getAllNodes(grid);
   // var p = true;
   // console.log(startNode.row + " -- " + startNode.col);
   while (!!unvisitedNodes.length) {
      sortNodes(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (closestNode.isWall) continue;

      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      // console.log(closestNode.row + " " + closestNode.col + " --- " + closestNode.distance);
      // if (p === true) {
      visitedNodesInOrder.push(closestNode);
      // }
      // if (closestNode === finishNode) p = false;
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid, diagonal);
   }
   // return visitedNodesInOrder;
}

function sortNodes(unvisitedNodes) {
   unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid, diagonal) {
   const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, diagonal);
   for (const neighbor of unvisitedNeighbors) {
      if (neighbor.distance > node.distance + 1) {
         neighbor.distance = node.distance + 1;
         neighbor.previousNode = node;
      }
      if (neighbor.distance == node.distance + 1 && (Math.abs(neighbor.row - node.row) < 1 || Math.abs(neighbor.col - node.col) < 1)) {
         neighbor.previousNode = node;
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
   // return neighbor.filter(neighbor => !neighbor.isVisited);
   return neighbor;
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

export function ShortestPathDijkstra(finishNode) {
   const nodesInShortestPathOrder = [];
   let currentNode = finishNode;
   while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
   }
   return nodesInShortestPathOrder;
}