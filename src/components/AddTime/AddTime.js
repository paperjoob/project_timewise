import React, {Component} from 'react';

class AddTime extends Component {
    render() {
        return (
            <div>
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
                            <td><input></input></td>
                            <td><input></input></td>
                            <td><input></input></td>
                            <td><input></input></td>
                            <td><input></input></td>
                            <td><input></input></td>
                            <td><input></input></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AddTime;