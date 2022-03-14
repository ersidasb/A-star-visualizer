import React from 'react'
import '../styles/Node.css'

const Node = ({ spot, nodeMouseDown, nodeMouseOver, nodeMouseUp }) => {
    const onMouseDown = () => {
        nodeMouseDown(spot.r, spot.c)
    }
    const onMouseOver = () => {
        nodeMouseOver(spot.r, spot.c)
    }
    const onMouseUp = () => {
        nodeMouseUp(spot.r, spot.c)
    }

  return (
    <div id={`${spot.r}-${spot.c}`} className={`node ${spot.type}`} onMouseDown={onMouseDown} onMouseOver={onMouseOver} onMouseUp={onMouseUp} />
  )
}

export default Node