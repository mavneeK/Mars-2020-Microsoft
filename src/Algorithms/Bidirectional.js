export function Bidirectional(grid, startNode, finishNode, diagonal, heuristic) {
   let s_visited = new Map();
   let t_visited = new Map();

   let s_parent = new Map();
   let t_parent = new Map();

   let s_queue = [];
   let t_queue = [];
   var intersectNode = -1;
   initializeMaps(grid, s_visited, t_visited);
   s_queue.push(startNode);
   s_visited.set(startNode, true);
   var visitedNodes = [];
   s_parent.set(startNode, -1);

   t_queue.push(finishNode);
   t_visited.set(finishNode, true);
   t_parent.set(finishNode, -1);
   while (s_queue.length > 0 && t_queue.length > 0) {
       console.log(s_queue.length)
       BFS(grid, s_queue, s_visited, s_parent, diagonal, visitedNodes);
       BFS(grid, t_queue, t_visited, t_parent, diagonal, visitedNodes);
       intersectNode = isIntersecting(grid, s_visited, t_visited);

       if (intersectNode != -1) {
           return visitedNodes;
           // return printPath(s_parent, t_parent, startNode, finishNode, intersectNode);
       }
   }
   return visitedNodes;
}

function BFS(grid, queue, visited, parent, diagonal, visitedNodes) {
   console.log("Rom");
   console.log(queue.length)
   var current = queue.shift();
   console.log(visited)
   var neighbors = getUnvisitedNeighbors(current, grid, diagonal);
   for (const neighbor in neighbors) {
       console.log("NEE")
       if (visited.get(neighbor) === false) {
           visitedNodes.push(neighbor);
           parent.set(neighbor, current);
           console.log("INNEE")
           visited.set(neighbor, true);
           queue.push(neighbor);
       }
   }
}

export function printPath(s_parent, t_parent, startNode, finishNode, intersectNode) {

   var path = [];
   path.push(intersectNode);
   var node = intersectNode;
   while (node !== startNode) {
       path.unshift(s_parent.get(node));
       node = s_parent.get(node);
       console.log(node);
   }
   node = intersectNode;
   while (node != finishNode) {
       path.unshift(t_parent.get(node));
       node = t_parent.get(node);
       console.log(node);
   }
   console.log("Ru")
   return printPath;
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

function isIntersecting(grid, s_visited, t_visited) {

   var intersectNode = -1;
   for (const row of grid) {
       for (const node of row) {
           if (s_visited.get(node) && t_visited.get(node)) {
               return node;
           }
       }
   }
   return -1;
}

function initializeMaps(grid, s_visited, t_visited) {
   for (const row of grid) {
       for (const node of row) {
           s_visited.set(node, false);
           t_visited.set(node, false);
       }
   }
}