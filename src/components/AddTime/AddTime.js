import React, {Component} from 'react';
import { connect } from 'react-redux';

import Swal from 'sweetalert2';
import './AddTime.css';

import Moment from 'moment';
import { extendMoment } from 'moment-range';


const moment = extendMoment(Moment);

class AddTime extends Component {

    state = {
        employee_id: this.props.user.id,
        daysWorked: [],
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        monday_hours: 0,
        tuesday_hours: 0,
        wednesday_hours: 0,
        thursday_hours: 0,
        friday_hours: 0,
        total: 0,
        submitted: false,
        is_approved: false,
        deny_request: false
    }

    // renders onto the DOM
    componentDidMount(){
        this.setDates();
        this.getWeek();
    }

    // sends a dispatch to the Saga to FETCH_TIME for timesheet hours
    getWeek = () => {
        this.props.dispatch({
            type: 'FETCH_TIME',
        })
    }

    componentDidUpdate = (prevProps) => {
        console.log('DID UPDATE', this.props)
        if (this.props.timesheet !== prevProps.timesheet) {
            let time = this.props.timesheet[0]
            if(this.props.timesheet[0]){
                this.setState({
                        monday_hours: time.monday_hours || 0,
                        tuesday_hours: time.tuesday_hours || 0,
                        wednesday_hours: time.wednesday_hours || 0,
                        thursday_hours: time.thursday_hours || 0,
                        friday_hours: time.friday_hours || 0,
                        total: time.total || 0,
                        submitted: time.submitted
                })
            }
            else{
                this.setState({
                    monday_hours:  0,
                    tuesday_hours: 0,
                    wednesday_hours: 0,
                    thursday_hours: 0,
                    friday_hours: 0,
                    total: 0,
                    submitted: false
                })
            }
        }
    }

    inputHours = (event, propertyName) => {
        // console.log('in inputHours', event.target.value);
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
    }

    // posts the information to the database
    handleSubmit = () => {
        console.log('in handleSubmit', parseFloat(this.state.monday_hours));
        this.setState({
            ...this.state.submitted,
            submitted: true
        });
        this.calculateHours();
            Swal.fire({
                title: 'Are all of the information correct?',
                text: "You will not be able to make any changes after submittal. Proceed?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.value) {
                    this.props.dispatch({
                        type: 'ADD_TIME', 
                        payload: {
                            employee_id: this.props.user.id,
                            monday: this.state.daysWorked[0],
                            tuesday: this.state.daysWorked[1],
                            wednesday: this.state.daysWorked[2],
                            thursday: this.state.daysWorked[3],
                            friday: this.state.daysWorked[4],
                            monday_hours: this.state.monday_hours,
                            tuesday_hours: this.state.tuesday_hours,
                            wednesday_hours: parseFloat(this.state.wednesday_hours),
                            thursday_hours: parseFloat(this.state.thursday_hours),
                            friday_hours: parseFloat(this.state.friday_hours),
                            total: parseFloat(this.state.total),
                            submitted: this.state.submitted,
                            is_approved: this.state.is_approved,
                            deny_request: this.state.deny_request
                        }  
                    });
                    this.props.dispatch({
                        type: 'CLEAR_TIME',
                    });
                  Swal.fire(
                    'Success',
                    'Timesheet submitted!',
                    'success'
                  );
                }
              })
        // }
    }

    setDates = () => {

        // moment JS
        // loop through the starting date of Monday through Friday
        // then push the days into the state of TIME

        let date = moment(),
        begin = moment(date).day(1);
        let dates = [];
        for (var i=0; i<5; i++) {
            dates = begin.format('MMM Do YYYY');
            let splits = dates.split(',');
            let dateString = splits.toString();
            this.state.daysWorked.push(dateString)
            begin.add(1, 'd');
        }
        this.setState({state: this.state})
    }

    // sums up week hours
    calculateHours = () => {
        let mon = this.state.monday_hours;
        let tue = this.state.tuesday_hours;
        let wed = this.state.wednesday_hours;
        let thu = this.state.thursday_hours;
        let fri = this.state.friday_hours;
        this.setState({
            ...this.state.total,
            total: parseFloat(mon) + parseFloat(tue) + parseFloat(wed) + parseFloat(thu) + parseFloat(fri)
        })
        console.log('in CALCULATE HOURS', this.state.total);
    }

    // takes user back to home page
    handleCancel = () => {
        this.props.history.push('/home');
    }
    
    render() {

        console.log('RENDER', this.state)

        return (
            <div className='timecardDiv'>
                <h1>My Timecard</h1>
                <h4>Please only submit your timesheet once per week.</h4>
                <table >
                    <tbody>
                        <tr><th>Current Week</th></tr>
                        <tr>
                            <td>Monday<br/>{this.state.daysWorked[0]}</td>
                            <td>Tuesday<br/>{this.state.daysWorked[1]}</td>
                            <td>Wednesday<br/>{this.state.daysWorked[2]}</td>
                            <td>Thursday<br/>{this.state.daysWorked[3]}</td>
                            <td>Friday<br/>{this.state.daysWorked[4]}</td>
                        </tr>
                        <tr>
                            <td><input type='number' step="0.25" onChange={(event) => {this.inputHours(event, 'monday_hours')}} placeholder={this.state.monday_hours} ></input></td>
                            <td><input type='number' step="0.25" onChange={(event) => {this.inputHours(event, 'tuesday_hours')}} placeholder={this.state.tuesday_hours}></input></td>
                            <td><input type='number' step="0.25" onChange={(event) => {this.inputHours(event, 'wednesday_hours')}} placeholder={this.state.wednesday_hours}></input></td>
                            <td><input type='number' step="0.25" onChange={(event) => {this.inputHours(event, 'thursday_hours')}} placeholder={this.state.thursday_hours}></input></td>
                            <td><input type='number' step="0.25" onChange={(event) => {this.inputHours(event, 'friday_hours')}} placeholder={this.state.friday_hours}></input></td>
                        </tr>
                    </tbody>
                </table>
                <div>Total Hours: {this.state.total} </div>
                                {/* <p>{JSON.stringify(this.props.timesheet)}</p> */}
                <button onClick={this.handleCancel}>Cancel</button>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    timesheet: state.timesheet,
    userNotification: state.userNotification
  });

export default connect(mapStateToProps) (AddTime);