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
                        <li>{time.monday}: {time.monday_hours} hours</li>
                        <li>{time.tuesday}: {time.tuesday_hours} hours</li>
                        <li>{time.wednesday}: {time.wednesday_hours} hours</li>
                        <li>{time.thursday}: {time.thursday_hours} hours</li>
                        <li>{time.friday}: {time.friday_hours} hours</li>
                    </>
                )
            })
        return (
            <div>
                <h1>Timesheet Report</h1>
                <ul>
                    {weekList}
                </ul>
                {/* <p>{JSON.stringify(this.props.timesheet)}</p> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    timesheet: state.timesheet
});

export default connect(mapStateToProps) (TimesheetReport);