import React, {Component} from 'react';
import {connect} from 'react-redux';

import Swal from 'sweetalert2'
import './ReviewRequest.css';

class ReviewRequest extends Component {

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
            type: 'FETCH_TIMESHEET_REVIEW',
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

    handleDeny = () => {
        console.log('in handleDENY');
    }

    render() {

        const timeDetails = this.props.review.map( (time) => {
            return (  
                <>
                <table className='reviewTable'>
                    <tbody>
                    <tr>
                    <th className='reviewHead'>Name</th>
                    <td className='reviewData'>{time.first_name} {time.last_name}</td>
                </tr>
                <tr>
                    <th className='reviewHead'>ID</th>
                    <td className='reviewData'>{time.id}</td>
                </tr>
                <tr>
                    <th className='reviewHead'>{time.monday} </th>
                    <td className='reviewData'>{time.monday_hours}</td>
                </tr>
                <tr>
                    <th className='reviewHead'>{time.tuesday}</th>
                    <td className='reviewData'>{time.tuesday_hours}</td>
                </tr>
                <tr>
                    <th className='reviewHead'>{time.wednesday}</th>
                    <td className='reviewData'>{time.wednesday_hours}</td>
                </tr>
                <tr>
                    <th className='reviewHead'>{time.thursday}</th>
                    <td className='reviewData'>{time.thursday_hours}</td>
                </tr>
                <tr>
                    <th className='reviewHead'>{time.friday}</th>
                    <td className='reviewData'>{time.friday_hours}</td>
                </tr>
                <tr>
                    <th className='reviewHead'>Approved</th>
                    <td className='reviewData'>{time.is_approved.toString()}</td>
                </tr>
                {/* <tr>
                    <th>Deny Request</th>
                    <td>{time.deny_request.toString()}</td>
                </tr> */}
                <tr>
                    <th className='reviewHead'>Total Hours</th>
                    <td className='reviewData'>{time.total}</td>
                </tr>
                    </tbody>
                </table>
            
                {/* <textarea></textarea> */}
                <br />
                <button onClick={this.handleApprove}>Approve</button>
                <button onClick={this.handleDeny}>Deny</button>
                </>
            )
        })

        return (

            <div className='reviewDiv'>
                <h1>Review Request</h1>
                {/* <ul> */}
                    {timeDetails}
                {/* </ul> */}
                {/* <p>{JSON.stringify(this.props.review)}</p> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    review: state.review
  });

export default connect(mapStateToProps) (ReviewRequest);