import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Profile.css'

class Profile extends Component {

    componentDidMount() {
        this.getProfile();
    }

    getProfile = () => {
        this.props.dispatch({
            type: 'FETCH_PROFILE'
        })
        console.log(this.props.state)
    }
    render() {

        const profileList = this.props.profile.map( (profileData) => {
            return ( 
                <>
                <tr>
                    <th>First Name</th>
                    <td>{profileData.first_name}</td>
                </tr>
                <tr>
                    <th>Last Name</th>
                    <td>{profileData.last_name}</td>
                </tr>   
                <tr>
                    <th>Email</th>
                    <td>{profileData.email}</td>
                </tr>
                <tr>
                    <th>Street</th>
                    <td>{profileData.street}</td>
                </tr>
                <tr>
                    <th>City</th>
                    <td>{profileData.city}</td>
                </tr>     
                <tr>
                    <th>State</th>
                    <td>{profileData.state}</td>
                </tr>   
                <tr>
                    <th>Zipcode</th>
                    <td>{profileData.zipcode}</td>
                </tr>  
                <tr>
                    <th>Phone</th>
                    <td>{profileData.phone}</td>
                </tr>  
                <tr>
                    <th>Employee ID</th>
                    <td>{profileData.user_login_id}</td>
                </tr>  
                </> 
            )
        })

        return (
            <div>
                <table className="profileTable" >
                    {/* <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Street</th>
                            <th>City</th>
                            <th>Zipcode</th>
                            <th>Phone</th>
                            <th>Employee ID</th>
                        
                        </tr>
                    </thead> */}
                    <tbody>
                        {profileList}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
  });

export default connect(mapStateToProps) (Profile);