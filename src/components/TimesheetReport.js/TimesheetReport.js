import React, {Component} from 'react';
import { connect } from 'react-redux';

class TimesheetReport extends Component {

    // display profile details by calling the getProfile function
    componentDidMount() {
        this.getWeeks();
    }

    // send dispatch to the FETCH_PROFILE profileSaga
    getWeeks = () => {
        this.props.dispatch({
            type: 'FETCH_WEEKS'
        })
    }

    render() {

            // loop through the profile props to retrieve the the weekdays
            // const weekList = this.props.weeks.map( (weekdays) => {
            //     return (  
            //         <>  
            //             <li>{weekdays.monday}</li>
            //             <li>{weekdays.tuesday}</li>
            //             <li>{weekdays.wednesday}</li>
            //             <li>{weekdays.thursday}</li>
            //             <li>{weekdays.friday}</li>
            //         </>
            //     )
            // })
        return (
            <div>
                Hello from TimesheetReport

            </div>
        )
    }
}

const mapStateToProps = state => ({
    weeks: state.weeks
});

export default connect(mapStateToProps) (TimesheetReport);