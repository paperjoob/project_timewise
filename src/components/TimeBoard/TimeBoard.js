import React, { Component } from 'react';
import './TimeBoard.css';

class TimeBoard extends Component {

    handleAddTime = () => {
        console.log('clicked Add Time button');
    }

    render() {
        return (
            <div className="boardDiv">
                <h2>Time Board</h2>
                <div>
                    <button onClick={this.handleAddTime}>Add Time</button>
                </div>
                <br />
                <table className="timeTable">
                    <tbody>
                        <tr><th>Week 1</th></tr>
                        <tr>
                            <td>Mon</td>
                            <td>TUE</td>
                            <td>WED</td>
                            <td>THU</td>
                            <td>FRI</td>
                            <td>SAT</td>
                            <td>SUN</td>
                        </tr>
                        <tr>
                            <td><input className="boardInput"></input></td>
                            <td><input className="boardInput"></input></td>
                            <td><input className="boardInput"></input></td>
                            <td><input className="boardInput"></input></td>
                            <td><input className="boardInput"></input></td>
                            <td><input className="boardInput"></input></td>
                            <td><input className="boardInput"></input></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <p>Total Hours:</p>
                    <p>HOURS</p>
                </div>
            </div>
        )
    }
}

export default TimeBoard;