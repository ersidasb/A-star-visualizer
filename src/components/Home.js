import React, { useEffect, useState } from 'react'
import Grid from './Grid';
import Astar from '../Astar.js';
import { clear } from '@testing-library/user-event/dist/clear';

const rows = 15;
const cols = 30;
const start_coords = [2, 2]
const end_coords = [rows - 3, cols - 3]
const delay = 10;
let timeouts = []

const Home = () => {
    const [grid, setGrid] = useState([])
    const [clicking, setClicking] = useState(false)
    const [path, setPath] = useState([])
    const [visited, setVisited] = useState([])
    useEffect(() => {
        initGrid()
    }, [])

    useEffect(() => {
        if(grid.length > 1){
            initNeighbours(grid)
            const startNode = grid[start_coords[0]][start_coords[1]]
            const endNode = grid[end_coords[0]][end_coords[1]]
            const res = Astar(startNode, endNode)
            setVisited(res.visited)
            setPath(res.path)
        }
    }, [grid])

    useEffect(() => {
        if(visited.length > 1){
            drawVisitedNodes()
        }
    }, [visited])

    const initGrid = () => {
        const _grid = new Array(cols)

        for(let r = 0; r < rows; r++){
            _grid[r] = new Array(rows)
            for(let c = 0; c < cols; c++){
                _grid[r][c] = new Spot(r, c)
            }
        }
        setGrid(_grid)
    }

    function Spot(r, c){
        this.r = r
        this.c = c
        this.type = (r === start_coords[0] && c === start_coords[1]) ? 'node-start' : (r === end_coords[0] && c === end_coords[1]) ? 'node-end' : ''
        this.isWalkable = true
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.neighbours = [];
        this.previous = null;
        this.addNeighbours = function(grid){
            let i = this.r;
            let j = this.c;
            if(i > 0) {if(grid[i-1][j].isWalkable) this.neighbours.push(grid[i-1][j]);}
            if(i < rows - 1) {if(grid[i+1][j].isWalkable)  this.neighbours.push(grid[i+1][j]);}
            if(j > 0) {if(grid[i][j-1].isWalkable)  this.neighbours.push(grid[i][j-1]);}
            if(j < cols - 1) {if(grid[i][j+1].isWalkable)  this.neighbours.push(grid[i][j+1]);}
        }
    }

    const drawVisitedNodes = () => {
        for(let i = 1; i < visited.length; i++){
            if(i === visited.length - 1) {
                timeouts.push(setTimeout(() => {
                    drawPathNodes();
                }, delay * i))
            }
            else {
                timeouts.push(setTimeout(() => {
                    document.getElementById(`${visited[i].r}-${visited[i].c}`).className = "node visited"
                }, delay * i))
            }
        }
    }

    const drawPathNodes = () => {
        for(let i = 0; i < path.length - 1; i++){
            timeouts.push(setTimeout(() => {
                document.getElementById(`${path[i].r}-${path[i].c}`).className = "node path"
            }, delay * i))
        }
    }

    const initNeighbours = (grid) => {
        for(let r = 0; r < rows; r++){
            for(let c = 0; c < cols; c++){
                grid[r][c].neighbours = []
                grid[r][c].addNeighbours(grid);
            }
        }
    }

    const clearTimeouts = () => {
        for(let i = 0; i < timeouts.length; i++){
            clearTimeout(timeouts[i])
        }
        timeouts = []
    }

    const nodeMouseDown = (r, c) => {
        setClicking(true);
        toggleNode(r, c);
    }

    const nodeMouseOver = (r, c) => {
        if(clicking) {
            toggleNode(r, c);
        }
    }

    const nodeMouseUp = (r, c) => {
        setClicking(false);
    }

    const resetNodes = () => {
        clearTimeouts()
        for(let r = 0; r < rows; r++){
            for(let c = 0; c < cols; c++){
                let element = document.getElementById(`${r}-${c}`)
                if(element.className !== 'node node-start' && element.className !== 'node node-end' && element.className !== 'node wall')
                    element.className = 'node '
            }
        }
    }

    const toggleNode = (r, c) => {
        var _grid = [...grid]
        if(_grid[r][c].type !== '' && _grid[r][c].type != 'wall')
            return
        resetNodes();
        _grid[r][c].isWalkable = !_grid[r][c].isWalkable
        if(_grid[r][c].isWalkable){
            _grid[r][c].type = ''
        }
        else{
            _grid[r][c].type = 'wall'
        }
        setGrid(_grid)
    }

    return (
        <Grid grid={grid} nodeMouseDown={nodeMouseDown} nodeMouseOver={nodeMouseOver} nodeMouseUp={nodeMouseUp}/>
    )
}

export default Home