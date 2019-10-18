import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, } from '@material-ui/core';
import EditButton from '../elements/EditButton';
import PropTypes from 'prop-types';

import './Profile.css'

const styles = theme => ({
    card: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        maxWidth: 900,
        background: '#eeeeee'
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
        editProfile: false,
        details: {
            first_name: '',
            last_name: '',
            email: '',
            street: '',
            city: '',
            zipcode: '',
            phone: ''
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

    // toggle the editProfile option to either true or false,
    // when clicked
    toggleEditProfile = () => {
        this.setState({
            editProfile: !this.state.editProfile
        })
        console.log('in TOGGLE')
    }

    render() {

        const { classes } = this.props;

        // loop through the profile props to retrieve the details from user_info database
        const profileList = this.props.profile.map( (profileData) => {
            return (  
                <>
                            <td>{profileData.first_name}</td>
                            <td>{profileData.last_name}</td>
                            <td>{profileData.email}</td>
                            <td>{profileData.street}</td>
                            <td>{profileData.city}</td>
                            <td>{profileData.zipcode}</td>
                            <td>{profileData.phone}</td>
                </>
            )
        })

        return (
            <div>
                <div className="cardBox">
                <Card className={classes.card}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Profile
                    </Typography>
                        <table className="profileTable">
                            <tbody>
                                <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>State</th>
                                <th>City</th>
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
                </Card>
                <EditButton toggleEditProfile={this.toggleEditProfile}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
});

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (connect(mapStateToProps) (Profile));




// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import EditButton from '../elements/EditButton';

// import './Profile.css'

// class Profile extends Component {

//     state = {
//         editProfile: false,
//         details: {
//             first_name: '',
//             last_name: '',
//             email: '',
//             street: '',
//             city: '',
//             zipcode: '',
//             phone: ''
//         }
//     }

//     // display profile details by calling the getProfile function
//     componentDidMount() {
//         this.getProfile();
//     }

//     // send dispatch to the FETCH_PROFILE profileSaga
//     getProfile = () => {
//         this.props.dispatch({
//             type: 'FETCH_PROFILE'
//         })
//     }

//     // toggle the editProfile option to either true or false,
//     // when clicked
//     toggleEditProfile = () => {
//         this.setState({
//             editProfile: !this.state.editProfile
//         })
//         console.log('in TOGGLE')
//     }

//     render() {

//         // loop through the profile props to retrieve the details from user_info database
//         const profileList = this.props.profile.map( (profileData) => {
//             return ( 
//                 <>
//                 <tr>
//                     <th>First Name</th>
//                     <td>{profileData.first_name}</td>
//                 </tr>
//                 <tr>
//                     <th>Last Name</th>
//                     <td>{profileData.last_name}</td>
//                 </tr>   
//                 <tr>
//                     <th>Email</th>
//                     <td>{profileData.email}</td>
//                 </tr>
//                 <tr>
//                     <th>Street</th>
//                     <td>{profileData.street}</td>
//                 </tr>
//                 <tr>
//                     <th>City</th>
//                     <td>{profileData.city}</td>
//                 </tr>     
//                 <tr>
//                     <th>State</th>
//                     <td>{profileData.state}</td>
//                 </tr>   
//                 <tr>
//                     <th>Zipcode</th>
//                     <td>{profileData.zipcode}</td>
//                 </tr>  
//                 <tr>
//                     <th>Phone</th>
//                     <td>{profileData.phone}</td>
//                 </tr>  
//                 <tr>
//                     <th>Employee ID</th>
//                     <td>{profileData.user_login_id}</td>
//                 </tr>  
//                 </> 
//             )
//         })

//         return (
//             <div>
//                 <table className="profileTable" >
//                     <tbody>
//                         {profileList}
//                     </tbody>
//                 </table>
//                 <div>
//                     <EditButton toggleEditProfile={this.toggleEditProfile}/>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     profile: state.profile,
//   });

// export default connect(mapStateToProps) (Profile);