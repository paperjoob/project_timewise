import React, {Component} from 'react';
import {connect} from 'react-redux';

class ReviewRequest extends Component {

    componentDidMount() {
        this.getReviewTime();
    }

    getReviewTime = () => {
        this.props.dispatch({
            type: 'FETCH_TIMESHEET_REVIEW',
            payload: this.props.match.params.id
        })
        console.log('get Review TIME', this.props.review)
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
                <li>Total Hours: {time.total}</li>
                </>
            )
        })

        return (

            <div>
                <p>Hi from Review Request</p>
                <ul>
                    {timeDetails}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    review: state.review
  });

export default connect(mapStateToProps) (ReviewRequest);