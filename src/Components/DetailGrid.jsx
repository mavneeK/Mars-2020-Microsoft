import React from 'react';

export default class DetailGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span className="btn btn-dark border border-light rounded" style={{ marginTop: "2px" }} >{this.props.guideText}</span>
                <span className="btn btn-dark border border-light rounded" style={{ float: "right" }}> Operations: {this.props.operations}</span>
                <span className="btn btn-dark border border-light rounded" style={{ float: "right" }}> Time: {this.props.time} ms</span>

            </div>
        )
    }
}