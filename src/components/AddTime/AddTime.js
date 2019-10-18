import React, {Component} from 'react';
import { connect } from 'react-redux';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

class AddTime extends Component {

    state = {
        time: []
    }

    inputHours = () => {
        console.log('in inputHours')
    }
    
    render() {

        // moment JS
        // loop through the starting date of Monday through Friday
        // then push the days into the state of TIME
        let date = moment(),
        begin = moment(date).day(1);
    
        let dates = [];
        for (var i=0; i<5; i++) {
            dates = begin.format('MMM Do');
            this.state.time.push(dates)
            begin.add(1, 'd');
        }

        return (
            <div>
                <table className="timeTable">
                    <tbody>
                        <tr><th>Week 1</th></tr>
                        <tr>
                            <td>MON <br/>{this.state.time[0]}</td>
                            <td>TUE <br/>{this.state.time[1]}</td>
                            <td>WED <br/>{this.state.time[2]}</td>
                            <td>THU <br/>{this.state.time[3]}</td>
                            <td>FRI <br/>{this.state.time[4]}</td>
                        </tr>
                        <tr>
                            <td><input onChange={(event) => {this.inputHours(event, 'hours')}}></input></td>
                            <td><input onChange={(event) => {this.inputHours(event, 'hours')}}></input></td>
                            <td><input onChange={(event) => {this.inputHours(event, 'hours')}}></input></td>
                            <td><input onChange={(event) => {this.inputHours(event, 'hours')}}></input></td>
                            <td><input onChange={(event) => {this.inputHours(event, 'hours')}}></input></td>
                        </tr>
                    </tbody>
                </table>

                <button>Cancel</button>
                <button>Save</button>
                <button>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
  });

export default connect(mapStateToProps) (AddTime);