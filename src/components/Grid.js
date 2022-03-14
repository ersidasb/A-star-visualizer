import React from 'react'
import Node from './Node'
import '../styles/Grid.css'

const Grid = ({ grid, nodeMouseDown, nodeMouseOver, nodeMouseUp }) => {
    return (
        <div>
        {
            grid.length > 0 && grid?.map((row, rowIndex) => (
                <div key={rowIndex} className='row-container'>
                    {row?.map((col, colIndex) => (
                        <Node key={colIndex} spot={col} nodeMouseDown={nodeMouseDown} nodeMouseOver={nodeMouseOver} nodeMouseUp={nodeMouseUp} />
                    ))}
                </div>
            ))
        }
        </div>
    )
}
export default Grid