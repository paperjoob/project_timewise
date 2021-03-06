import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Swal from 'sweetalert2'
import './AddEmpForm.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    align: 'center'
  },
});


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

// swal alert for adding user
// send dispatch to saga 'ADD_EMPLOYEE'
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

  // cancels changes and brings user back to /manage
  handleBack = () => {
    this.props.history.push('/manage');
  }

  // fill in data for local state
  addValues = () => {
    console.log('in addValues');
    this.setState({
      username: 'jill',
      password: 'root',
      first_name: 'Jill',
      last_name: 'Valentine',
      email: 'jvalentine@gmail.com',
      street: '234 Raccoon Street',
      city: 'Raccoon City',
      state: 'KS',
      zipcode: '29341',
      phone: '7641234985',
    })
  }

  render() {

  const { classes } = this.props;

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
        <h1 className='addh1' onClick={this.addValues}>ADD NEW EMPLOYEE</h1>
        <form className='addEmpForm' onSubmit={this.handleAdd} noValidate autoComplete="off">
            <TextField
              id="username"
              label="Username"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              type="password"
              onChange={this.handleInputChangeFor('password')}
              margin="normal"
            />
            <TextField
              id="first_name"
              label="First Name"
              className={classes.textField}
              value={this.state.first_name}
              onChange={this.handleInputChangeFor('first_name')}
              margin="normal"
            />
            <TextField
              id="last_name"
              label="last_name"
              className={classes.textField}
              value={this.state.last_name}
              onChange={this.handleInputChangeFor('last_name')}
              margin="normal"
            />
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
              margin="normal"
            />
            <TextField
              id="street"
              label="Street"
              className={classes.textField}
              value={this.state.street}
              onChange={this.handleInputChangeFor('street')}
              margin="normal"
            />
            <TextField
              id="city"
              label="City"
              className={classes.textField}
              value={this.state.city}
              onChange={this.handleInputChangeFor('city')}
              margin="normal"
            />
            <TextField
              id="state"
              label="State"
              className={classes.textField}
              value={this.state.state}
              onChange={this.handleInputChangeFor('state')}
              margin="normal"
            />
            <TextField
              id="zipcode"
              label="Zipcode"
              className={classes.textField}
              value={this.state.zipcode}
              onChange={this.handleInputChangeFor('zipcode')}
              margin="normal"
            />
            <TextField
              id="phone"
              label="Phone"
              className={classes.textField}
              value={this.state.phone}
              onChange={this.handleInputChangeFor('phone')}
              margin="normal"
            />
            <input
              className="cancelButton"
              type='submit'
              onClick ={this.handleBack}
              value="Back"
            />
            <input
              className="addButton"
              type="submit"
              name="submit"
              value="Save"
            />
        </form>
{/*         <p>{JSON.stringify(this.state)}</p> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

AddEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (connect(mapStateToProps)(AddEmployee));


