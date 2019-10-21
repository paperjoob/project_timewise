import React, { Component } from 'react';
import {connect} from 'react-redux';

class AddEmployee extends Component {
  state = {
        username: '',
        password: '',
        addDetails: false
  };

  addUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'ADD_EMPLOYEE',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'ADD_INPUT_ERROR'});
    };
    this.props.history.push('/manage');
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.addEmployeeMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.addEmployeeMessage}
          </h2>
        )}
        <form onSubmit={this.addUser}>
          <h1>ADD NEW EMPLOYEE</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Save"
            />
          </div>
        </form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(AddEmployee);

