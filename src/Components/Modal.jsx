import React from 'react';
import Modal from 'react-modal';
import './Modal.css'
var hint = require('../assets/hint1.png');
var algorithm = require('../assets/algorithm.png');
var secondDest = require('../assets/secondDest.png');
var weightChange = require('../assets/weightChange.png');
var wallWeight = require('../assets/wall-weights.png');


const customStyles = {
    content: {
        top: '10%',
        left: '15%',
        right: '15%',
        bottom: '10%',

    }
};

export default class MyModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        }
    }

    setModelState = (value) => {
        this.setState({ isOpen: value });
    }

    render() {
        return (
            <Modal style={customStyles} isOpen={this.state.isOpen}>
                <div>
                    <img src={hint} height="10%" width="100%"></img>
                    <div>
                        <h2><u><b>How to use:</b></u></h2>
                        <p></p>
                        <li>Use first drop-down to select algorithm and the second drop-down to select heuristic function.<img src={algorithm} style={{ marginLeft: '10px' }} height="10%" width="10%"></img></li>
                        <li>To enable diagonal searching click on the diagonal checkbox.</li>
                        <li>To reset the whole grid click on reset grid button.</li>
                        <li>To add wall click on a grid and a mountain icon will appear. That means rover cannot go to that grid.</li>
                        <li>However in some case rover can enter a grid but it requires extra effort. So click on add Weights instead of wall checkbox to add weight. Rover can go through these weights but require extra effort which is determined by weight.<img src={wallWeight} style={{ marginLeft: '10px' }} height="10%" width="10%"></img></li>
                        <li>To change the weight of a weighted grid just type the new value in input box on the right of weight. It is set to 5 by default whereas a normal grid is set to 1.<img src={weightChange} style={{ marginLeft: '10px' }} height="10%" width="10%"></img></li>
                        <li>To run the algorithm click on the Run Algorithm.</li>
                        <li>There is a feature to add a secondary destination for certain algorithms. To add a new destination click on add another destination and then click on the grid where you want to add new destination. <b>Note: This location cannot be changed.</b><img src={secondDest} style={{ marginLeft: '10px' }} height="10%" width="10%"></img></li>
                        <li>Our model has two themes just click the toggle of mars theme for a much darker and mars like theme.</li>
                        <li>There is a guide text for better information about the algorithm make sure to read that for hints.</li>
                        <li>On the right hand side you will get the time taken to search the number of grids traversed to search and the length of shortest path(if available)</li>
                        <li><b>Note: Some algorithms do not guarantee shortest path and in these algorithm help text will tell you so. And the time required to run a algorithm is relative and is dependent on machine.</b></li>
                        <li><b>Note: You can move the start and end destination by left clicking on them and dragging while holding the left-click. However the secondary destination is final and must be marked after deciding final position.</b></li>
                    </div>
                </div>
                <div id="footer">
                    <button onClick={() => this.setModelState(false)} className="btn-danger rounded btn-lg border border-light">Close Hint</button>
                </div>
            </Modal >
        )
    }
}