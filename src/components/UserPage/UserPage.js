import React, {Component} from 'react';
import { connect } from 'react-redux';

import './UserPage.css';
import Notification from '../Notification/Notification';
import NotificationUser from '../NotificationUser/NotificationUser';

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

    const timeDetails = this.props.timesheet.map( (time) => {
      return (  
          <tr key={time.id}>
            <td><input defaultValue={time.monday_hours} className="boardInput"></input></td>
            <td><input defaultValue={time.tuesday_hours} className="boardInput"></input></td>
            <td><input defaultValue={time.wednesday_hours} className="boardInput"></input></td>
            <td><input defaultValue={time.thursday_hours} className="boardInput"></input></td>
            <td><input defaultValue={time.friday_hours} className="boardInput"></input></td>
            <td>Total: {time.total}</td>
          </tr>
      )
  })

    return (
      <div>
        <h1 className="welcome">
          Welcome, { this.props.user.first_name }!
        </h1>
        <p className='empID'>Employee ID: {this.props.user.id}</p>
          {this.props.user.admin === true ?
            <Notification history={this.props.history}/>
            : <div></div>
          }
          {this.props.user.admin === false ?
            <NotificationUser history={this.props.history}/>
            : <div></div>
          }
        <div className="boardDiv">
        <h2>Current Week</h2>
        <div>
        </div>
        <br />
        <div className="tableDiv"> 
        <table className="timeTable">
            <tbody>
                <tr>
                    <td>MON <br/>{this.state.daysWorked[0]}</td>
                    <td>TUE <br/>{this.state.daysWorked[1]}</td>
                    <td>WED <br/>{this.state.daysWorked[2]}</td>
                    <td>THU <br/>{this.state.daysWorked[3]}</td>
                    <td>FRI <br/>{this.state.daysWorked[4]}</td>
                </tr>
                {timeDetails}
            </tbody>
        </table>
        </div>
        <br />
        <button onClick={this.handleAddTime}>Add Time</button>
        </div>
            {/* <p>{JSON.stringify(this.props.timesheet)}</p> */}
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  timesheet: state.timesheet
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
