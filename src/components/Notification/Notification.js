import React, {Component} from 'react';
import { connect } from 'react-redux';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class Notification extends Component {

  componentDidMount() {
    this.getNotifications();
  }

  getNotifications = () => {
    this.props.dispatch({
      type: 'FETCH_NOTIFICATION_ADMIN'
    })
    console.log('in GET NOTIFICATIONS', this.props.adminNotification)
  }

  handleReview = (notify) => {
    this.props.history.push(`/review/${notify.id}`);
  }

  render() {

    const notificationList = this.props.adminNotification.map( (notify) => {
      return (  
        <>
        <li>{notify.first_name} {notify.last_name} has submitted the timesheet beginning on {notify.monday}. <button onClick={() => {this.handleReview(notify)} }>Review Request</button></li>
        </>
      )
  })
    return (
      <div>
        <h2>Notifications</h2>
        <ul>
          {notificationList}
        </ul>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });

const mapStateToProps = state => ({
  adminNotification: state.adminNotification
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Notification);