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

  // click on the edit button to edit the time submitted
  handleEdit = (notify) => {
      console.log('in handleEDIT');
      this.props.history.push(`/edit/${notify.id}`)
  }

  render() {

    const notificationList = this.props.userNotification.map( (notify) => {
      return (  
        <>
        <li>{notify.first_name}, please revise your timesheet for the week starting {notify.monday}. Comment: {notify.comments} <button onClick={() => {this.handleEdit(notify)} }>Edit Timesheet</button></li>
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