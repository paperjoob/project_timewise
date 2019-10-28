import React, {Component} from 'react';
import { connect } from 'react-redux';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class NotificationUser extends Component {

  componentDidMount() {
    this.getNotifications();
  }

  getNotifications = () => {
    this.props.dispatch({
      type: 'GRAB_NOTIFICIATION_USER'
    })
    console.log('in GET NOTIFICATIONS', this.props.userNotification)
  }

  render() {

    const notificationList = this.props.userNotification.map( (notify) => {
      return (  
        <>
        <li>{notify.first_name}, your timesheet has been denied for the week of {notify.monday}. Comment: {notify.comments}</li>
        </>
      )
  })

    return (
      <div>
        <h2>User Notifications</h2>
        <ul>
          {notificationList}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    userNotification: state.userNotification
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(NotificationUser);