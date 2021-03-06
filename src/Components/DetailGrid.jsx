import React from 'react';

export default class DetailGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span className="n btn btn-light border border-light rounded" style={{ marginTop: "2px", marginLeft: "15px" }} >{this.props.guideText}</span>
                <span className="n btn btn-light border border-light rounded" style={{ marginTop: "2px", float: "right", marginRight: "30px" }}> Shortest Path Length: {this.props.shortestPathLength}</span>
                <span className="n btn btn-light border border-light rounded" style={{ marginTop: "2px", float: "right", marginRight: '4px' }}> Operations: {this.props.operations}</span>
                <span className="n btn btn-light border border-light rounded" style={{ marginTop: "2px", float: "right", marginRight: '4px' }}> Time: {this.props.time} ms</span>

            </div>
        )
    }
}