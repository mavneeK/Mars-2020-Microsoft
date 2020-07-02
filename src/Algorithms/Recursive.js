export function Recursive(grid, startNode, finishNode, diagonal) {
   const visitedNodesInOrder = [];
   startNode.distance = 0;
   var temp = recursion(grid, startNode, startNode, finishNode, diagonal, visitedNodesInOrder);
   if (temp === null) {
       console.log("RRR")
       return visitedNodesInOrder;
   }
   return visitedNodesInOrder;
}

function recursion(grid, node, Parent, finishNode, diagonal, visitedNodesInOrder) {
   if (node.isVisited === true || node.isWall === true) {
       return null;
   }
   node.isVisited = true;
   node.distance = Parent.distance + 1;
   // if (Parent.previousNode !== node) {
   //     node.previousNode = Parent;
   // }
   visitedNodesInOrder.push(node);
   if (node === finishNode) {
       return visitedNodesInOrder;
   }
   var neighbors = getUnvisitedNeighbors(node, grid, diagonal);
   for (const neighbor of neighbors) {
       var temp = recursion(grid, neighbor, node, finishNode, diagonal, visitedNodesInOrder)
       if (temp === null) {
       } else {
           return temp;
       }
   }
   return null;
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

export function ShortestPathRecursion(finishNode) {
   const nodesInShortestPathOrder = [];
   let currentNode = finishNode;
   while (currentNode != null) {
       console.log("RRRR")
       nodesInShortestPathOrder.unshift(currentNode);
       currentNode = currentNode.previousNode;
   }
   return nodesInShortestPathOrder;
}