import React, { Component } from 'react';
import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { col, isFinish, weight, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp, row } = this.props;
        const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : (weight > 1) ? 'node-weight' : '';
        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp(row, col)} >
            </div>
        )
    }
}