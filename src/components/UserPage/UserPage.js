import React, {Component} from 'react';
import { connect } from 'react-redux';

import './UserPage.css';
import Notification from '../Notification/Notification';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {

  handleAddTime = () => {
    this.props.history.push('/addtime');
  }

  render() {

    return (
      <div>
        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>
        <p>Employee ID: {this.props.user.id}</p>
          <Notification />
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
