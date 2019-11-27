import React, {Component} from 'react';
import { connect } from 'react-redux';

import './TimeReportAdmin.css';

class TimeReportAdmin extends Component {

    // display profile details by calling the getAllTime function
    componentDidMount() {
        this.getAllTime();
    }

    // send dispatch to the GET_ALL_TIME saga
    getAllTime = () => {
        this.props.dispatch({
            type: 'GET_ALL_TIME'
        })
    }

    render() {

            //loop through the timesheet reduxstate to retrieve the the weekdays
            const weekList = this.props.adminTime.map( (time) => {
                return ( 
                    <>
                    <p key={time.id}>{time.first_name} {time.last_name}, Employee ID: {time.id}</p>
                    <table >
                        <tbody>
                            <tr>
                                <td>{time.monday}</td>
                                <td>{time.tuesday}</td>
                                <td>{time.wednesday}</td>
                                <td>{time.thursday}</td>
                                <td>{time.friday}</td>
                                <td>Total Hours</td>
                            </tr>
                            <tr>  
                                <td>{time.monday_hours}</td>
                                <td>{time.tuesday_hours}</td>
                                <td>{time.wednesday_hours}</td>
                                <td>{time.thursday_hours}</td>
                                <td>{time.friday_hours}</td>
                                <td>{time.total}</td>
                            </tr>
                        </tbody>

                    </table> 
                    </>
                )
            })
        return (
            <div className='adminTimesheetDiv'>
                <h1>Timesheet Report</h1>
                    {weekList}
                <p>{JSON.stringify(this.props.timesheet)}</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({ 
    adminTime: state.adminTime
});

export default connect(mapStateToProps) (TimeReportAdmin);