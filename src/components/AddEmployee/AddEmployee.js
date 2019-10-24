import React, { Component } from 'react';
import {connect} from 'react-redux';

import Swal from 'sweetalert2'

class AddEmployee extends Component {
  state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
  };

//   addUser = (event) => {

//     if (this.state.username && this.state.password) {
//       this.props.dispatch({
//         type: 'ADD_EMPLOYEE',
//         payload: {
//           username: this.state.username,
//           password: this.state.password,
//           first_name: this.state.first_name,
//           last_name: this.state.last_name,
//           email: this.state.email,
//           street: this.state.street,
//           city: this.state.city,
//           state: this.state.state,
//           zipcode: this.state.zipcode,
//           phone: this.state.phone
//         },
//       });
//     } else {
//       this.props.dispatch({type: 'ADD_INPUT_ERROR'});
//     };
//     // this.props.history.push('/manage');
//     console.log(this.state)
//   } // end registerUser

// swal alert for adding user
handleAdd = (event) => {
    event.preventDefault();

    Swal.fire({
        title: 'Are all fields correct',
        text: "Add new",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create new user!'
      }).then((willAdd) => {
        if (willAdd.value) {
          this.props.dispatch({
          type: 'ADD_EMPLOYEE',
          payload: {
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            phone: this.state.phone
            },
          })
          Swal.fire(
            'Success!',
            'User has been added',
            'success'
          )
        }   
    })
}

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.addEmployeeMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.addEmployeeMessage}
          </h2>
        )}
        <form onSubmit={this.handleAdd}>
          <h1>ADD NEW EMPLOYEE</h1>
          <div>
            <label htmlFor="username">
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
            <label htmlFor="password">
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
            <label htmlFor="first_name">
              First Name:
              <input
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="last_name">
              Last Name:
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
              />
            </label>
            <div>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="street">
              Street:
              <input
                type="text"
                name="street"
                value={this.state.street}
                onChange={this.handleInputChangeFor('street')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="city">
              City:
              <input
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChangeFor('city')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="state">
               State:
              <input
                type="text"
                name="state"
                value={this.state.state}
                onChange={this.handleInputChangeFor('state')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="zipcode">
              Zipcode:
              <input
                type="text"
                name="zipcode"
                value={this.state.zipcode}
                onChange={this.handleInputChangeFor('zipcode')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="Phone">
              Phone:
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChangeFor('phone')}
              />
            </label>
          </div>
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
        <p>{JSON.stringify(this.state)}</p>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(AddEmployee);


