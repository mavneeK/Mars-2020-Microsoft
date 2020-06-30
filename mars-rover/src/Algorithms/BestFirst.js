export function BestFirst(grid, startNode, finishNode, diagonal, heuristic) {
   const visitedNodesInOrder = [];
   startNode.distance = 0;
   let unvisitedNodes = [];
   unvisitedNodes.push(startNode);
   initialiseHeuristic(grid, finishNode, heuristic);
   while (!!unvisitedNodes.length) {
       sortNodes(unvisitedNodes, heuristic, finishNode);
       const closestNode = unvisitedNodes.shift();

       if (closestNode.isWall) continue;

       if (closestNode.distance === Infinity) return visitedNodesInOrder;

       closestNode.isVisited = true;

       visitedNodesInOrder.push(closestNode);
       if (closestNode === finishNode) return visitedNodesInOrder;
       updateUnvisitedNeighbors(closestNode, unvisitedNodes, grid, diagonal);
   }
}

function sortNodes(unvisitedNodes, heuristic, finishNode) {
   unvisitedNodes.sort((nodeA, nodeB) => getSortingValue(nodeA, heuristic, finishNode) - getSortingValue(nodeB, heuristic, finishNode));
}

function getSortingValue(node, heuristic, finishNode) {
   // return node.distance + getHeuristicValue(node, heuristic, finishNode);  
   return map.get(node); // instead of calculating heuristic again and again used map to store the heuristic and save time 
   // showed about 500% better performance this way

}

// for quickness in euclidean search we store all the heuristic first in a map and then use the map later on 
let map = new Map();
function initialiseHeuristic(grid, finishNode, heuristic) {
   for (const row of grid) {
       for (const node of row) {
           map.set(node, getHeuristicValue(node, heuristic, finishNode));
       }
   }
}


function getHeuristicValue(node, heuristic, finishNode) {
   if (heuristic === 'Manhattan') {
       return (Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col));
   }
   if (heuristic === 'Euclidean') {
       // console.log("R");
       return Math.sqrt((Math.pow(node.row - finishNode.row, 2) + (Math.pow(node.col - finishNode.col, 2))));
       // return Math.sqrt(((node.row - finishNode.row) << (2)) + ((node.col - finishNode.col) << (2)));  // done for better performance
   }
   if (heuristic === 'DiagonalDistance') {
       return Math.max(Math.abs(node.row - finishNode.row), Math.abs(node.col - finishNode.col));
   }
   if (heuristic === 'Octile') {
       var F = Math.SQRT2 - 1;
       var dx = Math.abs(node.row - finishNode.row);
       var dy = Math.abs(node.col - finishNode.col);
       return F * Math.min(dx, dy) + Math.abs(dx - dy);
   }
}

function updateUnvisitedNeighbors(node, unvisitedNodes, grid, diagonal) {
   const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, diagonal);
   for (const neighbor of unvisitedNeighbors) {
       if (neighbor.distance > node.distance + 1) {
           neighbor.distance = node.distance + 1;
           neighbor.previousNode = node;
       }
       if (neighbor.isVisited === false) {
           neighbor.isVisited = true;
           unvisitedNodes.push(neighbor);
       }
       // if (neighbor.distance == node.distance + 1 && (Math.abs(neighbor.row - node.row) < 1 || Math.abs(neighbor.col - node.col) < 1)) {
       //     neighbor.previousNode = node;
       // }
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

export function ShortestPathBestFirst(finishNode) {
   const nodesInShortestPathOrder = [];
   let currentNode = finishNode;
   while (currentNode !== null) {
       nodesInShortestPathOrder.unshift(currentNode);
       currentNode = currentNode.previousNode;
   }
   return nodesInShortestPathOrder;
}