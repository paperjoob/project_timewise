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

    handleChange = (event) => {
        console.log(event.target.value);
    }

    render() {

        const timeDetails = this.props.userNotification.map( (time) => {
            return (  
                <>
                <p>Name: {time.first_name} {time.last_name}</p>
                <p>Employee ID: {time.id}</p>
                <tbody>
                    <tr>
                        <td>{time.monday}</td>
                        <td>{time.tuesday}</td>
                        <td>{time.wednesday}</td>
                        <td>{time.thursday}</td>
                        <td>{time.friday}</td>
                    </tr>
                    <tr>  
                        <td><input defaultValue={time.monday_hours} onChange={this.handleChange}></input></td>
                        <td><input defaultValue={time.tuesday_hours} onChange={this.handleChange}></input></td>
                        <td>{time.wednesday_hours}</td>
                        <td>{time.thursday_hours}</td>
                        <td>{time.friday_hours}</td>
                    </tr>
                </tbody>
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
                    {timeDetails}
                <p>{JSON.stringify(this.props.userNotification)}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userNotification: state.userNotification
  });

export default connect(mapStateToProps) (EditTimesheet);