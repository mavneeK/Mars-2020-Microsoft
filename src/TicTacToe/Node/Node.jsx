import React, { Component } from 'react';
import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { col, isCross, row, onNodeClick, isCircle } = this.props;
        const extraClassName = isCross ? 'node-cross' : isCircle ? 'node-circle' : '';
        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onClick={() => onNodeClick(row, col)}
            >
            </div>
        )
    }
}