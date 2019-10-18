import React, {Component} from 'react';
import { connect } from 'react-redux';

class TimesheetReport extends Component {
    render() {
        return (
            <div>
                Hello from TimesheetReport
            </div>
        )
    }
}

const mapStateToProps = state => ({
    weekday: state.weekday
});

export default connect(mapStateToProps) (TimesheetReport);