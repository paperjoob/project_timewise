import React, {Component} from 'react';
import {connect} from 'react-redux';

import Swal from 'sweetalert2'

class EditTimesheet extends Component {

    state = {
        updateRequest: {
            id: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.getReviewTime();
    }

    // sends dispatch to saga
    getReviewTime = () => {
        this.props.dispatch({
            type: 'GRAB_EDIT_USER',
            payload: this.props.match.params.id
        })
        console.log('get Review TIME', this.props.review)
    }

    // approve the request from false to true
    handleApprove = () => {

        Swal.fire({
            title: 'Are the times entered correct?',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((willAdd) => {
            if (willAdd.value) {
                this.props.dispatch({ 
                    type: 'UPDATE_REQUEST', 
                    payload: this.state.updateRequest
                });
              Swal.fire(
                'Success!',
                'Time has been approved.',
                'success'
              )
            }  
            this.getReviewTime(); 
        })
    }

    handleBack = () => {
        console.log('in handleBack');
        this.props.history.push('/home')
    }

    render() {

        const timeDetails = this.props.userNotification.map( (time) => {
            return (  
                <>
                <li>Name: {time.first_name} {time.last_name}</li>
                <li>Employee ID: {time.id}</li>
                <li>{time.monday} : {time.monday_hours}</li>
                <li>{time.tuesday} : {time.tuesday_hours}</li>
                <li>{time.wednesday} : {time.wednesday_hours}</li>
                <li>{time.thursday} : {time.thursday_hours}</li>
                <li>{time.friday} : {time.friday_hours}</li>
                <li>Approved: {time.is_approved.toString()}</li>
                <li>Deny Request: {time.deny_request.toString()}</li>
                <li>Total Hours: {time.total}</li>
                <br />
                <textarea placeholder={time.comments}></textarea>
                <br />
                <button onClick={this.handleBack}>Back</button>
                <button onClick={this.handleSave}>Submit</button>
                </>
            )
        })

        return (

            <div>
                <h1>Edit Timesheet</h1>
                <ul>
                    {timeDetails}
                </ul>
                <p>{JSON.stringify(this.props.userNotification)}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userNotification: state.userNotification
  });

export default connect(mapStateToProps) (EditTimesheet);