import React, {Component} from 'react';
import { connect } from 'react-redux';

import './UserPage.css';
import Notification from '../Notification/Notification';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {

  state = {
    daysWorked: []
  }

    // renders onto the DOM
    componentDidMount(){
        this.setDates();
        this.getWeek();
    }

    // sends a dispatch to the Saga to FETCH_TIME
    getWeek = () => {
        this.props.dispatch({
            type: 'FETCH_TIME',
        })
    }

  handleAddTime = () => {
    this.props.history.push('/addtime');
  }

  setDates = () => {

    // moment JS
    // loop through the starting date of Monday through Friday
    // then push the days into the state of TIME

    let date = moment(),
    begin = moment(date).day(1);

    let dates = [];
    for (var i=0; i<5; i++) {
        dates = begin.format('MMM Do YYYY');
        let splits = dates.split(',');
        let dateString = splits.toString();
        this.state.daysWorked.push(dateString)
        begin.add(1, 'd');
        console.log(this.state.daysWorked);
    }
    this.setState({state: this.state})
}

  render() {

    return (
      <div>
        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>
        <p>Employee ID: {this.props.user.id}</p>
          <Notification history={this.props.history}/>
        <div className="boardDiv">
        <h2>Time Board</h2>
        <div>
            <button onClick={this.handleAddTime}>Add Time</button>
        </div>
        <br />
        <table className="timeTable">
            <tbody>
                <tr><th>Current Week</th></tr>
                <tr>
                    <td>MON <br/>{this.state.daysWorked[0]}</td>
                    <td>TUE <br/>{this.state.daysWorked[1]}</td>
                    <td>WED <br/>{this.state.daysWorked[2]}</td>
                    <td>THU <br/>{this.state.daysWorked[3]}</td>
                    <td>FRI <br/>{this.state.daysWorked[4]}</td>
                </tr>
                <tr>
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
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
