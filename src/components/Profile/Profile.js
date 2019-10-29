import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, } from '@material-ui/core';
import EditButton from '../elements/EditButton';
import PropTypes from 'prop-types';

import './Profile.css'
import Swal from 'sweetalert2'

const styles = theme => ({
    card: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        maxWidth: 1300,
        background: '#eeeeee',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        background: '#e0e0e0',
        color: '#eceff1'
    },
    title: {
      fontSize: 30,
    },
    pos: {
      marginBottom: 12,
    },
  });

class Profile extends Component {

    state = {
        details: {
            first_name: '',
            last_name: '',
            email: '',
            street: '',
            state: '',
            city: '',
            zipcode: '',
            phone: '',
            id: this.props.user.id
        }
    }

    // display profile details by calling the getProfile function
    componentDidMount() {
        this.getProfile();
    }

    // send dispatch to the FETCH_PROFILE profileSaga
    getProfile = () => {
        this.props.dispatch({
            type: 'FETCH_PROFILE'
        })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.profile !== prevProps.profile) {
            console.log('in DIDUPDATE',this.props.profile)
            let edit = this.props.profile[0]
            this.setState({
                details: {
                    first_name: edit.first_name,
                    last_name: edit.last_name,
                    email: edit.email,
                    street: edit.street,
                    city: edit.city,
                    state: edit.state,
                    zipcode: edit.zipcode,
                    phone: edit.phone,
                    id: edit.id
                }
            })
        }
    }

    // save changes made to profile
    saveChanges = () => {
        Swal.fire({
            title: 'Are you sure you would like to make the following changes?',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.value) {
                this.props.dispatch({ 
                    type: 'UPDATE_PROFILE', 
                    payload: this.state.details
                })
              Swal.fire(
                'Success!',
                'Your changes have been saved.',
                'success'
              )
            }
          })
    }

    // saves changes to the local state
    handleChange = (event, propertyName) => {
        this.setState({
            details: {
                ...this.state.details,
                [propertyName]: event.target.value
            }
        })
    }

    addValue = () => {
        this.setState({
            details: {
                first_name: 'Barry',
                last_name: 'Burton',
                email: 'barry@gmail.com',
                street: '444 Barry Street',
                city: 'Alexandria',
                state: 'MN',
                zipcode: '52300',
                phone: '6082836662',
                id: this.props.user.id
            }
     })
    }

    render() {

        const { classes } = this.props;

        // loop through the profile props to retrieve the details from user_info database
        const profileList = this.props.profile.map( (profileData) => {
            return (  
                <>
                    <td><input onChange={(event) => {this.handleChange(event, 'first_name')}} className='profileInput' value={this.state.details.first_name}></input></td>
                    <td><input onChange={(event) => {this.handleChange(event, 'last_name')}} className='profileInput' value={this.state.details.last_name}></input></td>
                    <td><input onChange={(event) => {this.handleChange(event, 'email')}} className='profileInput' value={this.state.details.email}></input></td>
                    <td><input onChange={(event) => {this.handleChange(event, 'street')}} className='profileInput' value={this.state.details.street}></input></td>
                    <td><input onChange={(event) => {this.handleChange(event, 'city')}} className='profileInput' value={this.state.details.city}></input></td>
                    <td><input onChange={(event) => {this.handleChange(event, 'state')}} className='profileInput' value={this.state.details.state}></input></td>
                    <td><input onChange={(event) => {this.handleChange(event, 'zipcode')}} className='profileInput' value={this.state.details.zipcode}></input></td>
                    <td><input onChange={(event) => {this.handleChange(event, 'phone')}} className='profileInput' value={this.state.details.phone}></input></td>
                </>
            )
        })

        return (
            <div>
                <div className="cardBox">
                <Card className={classes.card}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom onClick={this.addValue}>
                        Profile
                    </Typography>
                        <table className="profileTable">
                            <tbody>
                                <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zipcode</th>
                                <th>Phone</th>
                            </tr>
                            <tr>
                                {profileList}
                            </tr>                            
                            </tbody>
                        </table>
                        <Typography>
                            {this.state.editProfile &&
                            <TextField>
                                Hi There
                            </TextField>
                            }
                        </Typography>
                    </CardContent>  
                    <EditButton saveChanges={this.saveChanges}/>
                </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    user: state.user
});

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (connect(mapStateToProps) (Profile));