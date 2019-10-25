import React, {Component} from 'react';
import { connect } from 'react-redux';

import Toast from 'react-bootstrap/Toast';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class Notification extends Component {

  state = {
    showNotification: false
  }

  toggleShowNotifcation = () => {
    this.setState({
      showNotification: !this.state.showNotification
    })
  }

  render() {
    return (
      <div>
        <h2>Notifications</h2>
        <Toast className='toastme' show={this.showNotification} onClose={this.toggleShowNotifcation}>
          <Toast.Header>
              <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
              />
              <strong className="mr-auto">Bootstrap Spike</strong>
              <small>Click on the X to dismiss this toast</small>
          </Toast.Header>
          <Toast.Body>This is a Toast!</Toast.Body>
        </Toast>
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
export default connect(mapStateToProps)(Notification);