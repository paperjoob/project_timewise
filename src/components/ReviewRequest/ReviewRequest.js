import React, {Component} from 'react';
import {connect} from 'react-redux';

class ReviewRequest extends Component {

    state = {
        is_approved: false,
        deny_request: false
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

    // approve the request
    handleApprove = () => {
        this.setState({
            ...this.state.is_approved,
            is_approved: true
        });
        console.log('HANDLE APPROVE', this.state.is_approved)
    }

    render() {

        const timeDetails = this.props.review.map( (time) => {
            return (  
                <>
                <li>Employee Name: {time.first_name} {time.last_name}</li>
                <li>Employee ID: {time.id}</li>
                <li>{time.monday} : {time.monday_hours}</li>
                <li>{time.tuesday} : {time.tuesday_hours}</li>
                <li>{time.wednesday} : {time.wednesday_hours}</li>
                <li>{time.thursday} : {time.thursday_hours}</li>
                <li>{time.friday} : {time.friday_hours}</li>
                <li>Approved: {time.is_approved.toString()}</li>
                <li>Total Hours: {time.total}</li>
                <br />
                <textarea></textarea>
                <br />
                <button onClick={this.handleApprove}>Approve</button>
                <button>Deny</button>
                </>
            )
        })

        return (

            <div>
                <p>Hi from Review Request</p>
                <ul>
                    {timeDetails}
                </ul>
                <p>{JSON.stringify(this.props.review)}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    review: state.review
  });

export default connect(mapStateToProps) (ReviewRequest);