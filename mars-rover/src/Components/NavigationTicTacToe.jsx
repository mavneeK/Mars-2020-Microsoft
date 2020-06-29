import React from 'react';
var mars_image = require('../assets/mars_icon.png')
var alien_image = require('../assets/wallE-rover.gif')


export default class NavigationBarTicTacToe extends React.Component {

    constructor(props) {
        super(props);
    }

    // handleSearchChange(event) {
    //     console.log(event.target.value);
    //     //this.props.searchMethod(event.target.value);
    // }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/"><img src={mars_image} height="24px" width="24px" style={{ marginRight: "10px" }}></img>Mars 2020</a>
                    <a className="navbar navbar-dark text-light bg-dark bg-dark btn btn-dark border border-light rounded" href="/tictactoe" style={{ marginLeft: "auto" }}>
                        Back To Exploring Mars
                    </a>
                    <img src={alien_image} style={{ marginLeft: "10px" }} height="40px" width="40px"></img>
                </nav>
            </div >
        )
    }
}