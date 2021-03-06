function Astar(startNode, endNode){
    let openSet = []
    let closedSet = []
    let path = []
    let visited = []

    openSet.push(startNode);
    while(openSet.length > 0){
        let leastIndex = 0;
        for(let i = 0; i < openSet.length; i++){ 
            if(openSet[i].f < openSet[leastIndex].f){
                leastIndex = i;
            }
        }

        let current = openSet[leastIndex];
        visited.push(current)

        if(current === endNode){
            let temp = current;
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }
            return {path, visited};
        }

        openSet = openSet.filter(e => e !== current);
        closedSet.push(current);

        let neighbours = current.neighbours;
        for(let i = 0; i < neighbours.length; i++){
            let neighbour = neighbours[i];
            if(!closedSet.includes(neighbour)){
                let tempG = current.g + 1;
                let newPath = false;
                if(openSet.includes(neighbour)){
                    if(tempG < neighbour.g){
                        neighbour.g = tempG;
                        newPath = true;
                    }
                }
                else {
                    neighbour.g = tempG;
                    newPath = true;
                    openSet.push(neighbour);
                }

                if(newPath){
                    neighbour.h = heuristic(neighbour, endNode);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }
            }
        }
    }

    return {path, visited, error: "No path found"};
}

function heuristic(node, endNode){
    return Math.abs(node.r - endNode.r) + Math.abs(node.c - endNode.c);
}

export default Astar;