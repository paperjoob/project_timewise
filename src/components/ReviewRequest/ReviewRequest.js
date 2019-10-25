import React, {Component} from 'react';
import {connect} from 'react-redux';

class ReviewRequest extends Component {

    render() {

        return (

            <div>
                <p>Hi from Review Request</p>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
  });

export default connect(mapStateToProps) (ReviewRequest);