import React, {Component} from 'react';
import { connect } from 'react-redux';

class TimesheetReport extends Component {

    // display profile details by calling the getProfile function
    componentDidMount() {
        this.getTime();

    }

    // send dispatch to the FETCH_PROFILE profileSaga
    getTime = () => {
        this.props.dispatch({
            type: 'FETCH_TIME'
        })
    }

    render() {

            //loop through the timesheet reduxstate to retrieve the the weekdays
            const weekList = this.props.timesheet.map( (time) => {
                return (  
                    <>  
                        <li>{time.monday}</li>
                        <li>{time.tuesday}</li>
                        <li>{time.wednesday}</li>
                        <li>{time.thursday}</li>
                        <li>{time.friday}</li>
                        <li>{time.monday_hours}</li>
                        <li>{time.tuesday_hours}</li>
                        <li>{time.wednesday_hours}</li>
                        <li>{time.thursday_hours}</li>
                        <li>{time.friday_hours}</li>
                    </>
                )
            })
        return (
            <div>
                Hello from TimesheetReport
                <ul>
                    {weekList}
                </ul>


                <p>{JSON.stringify(this.props.timesheet)}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    timesheet: state.timesheet
});

export default connect(mapStateToProps) (TimesheetReport);