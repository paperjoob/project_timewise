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

        return (

            <div>
                <p>Hi from Review Request</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    review: state.review
  });

export default connect(mapStateToProps) (ReviewRequest);