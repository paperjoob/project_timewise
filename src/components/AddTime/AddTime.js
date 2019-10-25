import React, {Component} from 'react';
import { connect } from 'react-redux';

import Swal from 'sweetalert2'

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

    // sends a dispatch to the Saga to FETCH_TIME
    getWeek = () => {
        this.props.dispatch({
            type: 'FETCH_TIME',
        })
    }

    // componentDidUpdate = (prevProps) => {
    //     if (this.props.timesheet !== prevProps.timesheet) {
    //         let time = this.props.timesheet[0]
    //         this.setState({
    //                 monday_hours: time.monday_hours,
    //                 tuesday_hours: time.tuesday_hours,
    //                 wednesday_hours: time.wednesday_hours,
    //                 thursday_hours: time.thursday_hours,
    //                 friday_hours: time.friday_hours,
    //                 total: time.total,
    //                 submitted: time.submitted
    //         })
    //     }
    // }

    inputHours = (event, propertyName) => {
        // console.log('in inputHours', event.target.value);
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
    }

    // posts the information to the database
    handleSubmit = () => {
        console.log('in handleSubmit');
        this.setState({
            ...this.state.submitted,
            submitted: true
        });
        if (this.state.submitted === true) {
            alert ('Your time for this week has already been submitted.');
        } else {
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
                            monday_hours: parseFloat(this.state.monday_hours),
                            tuesday_hours: parseFloat(this.state.tuesday_hours),
                            wednesday_hours: parseFloat(this.state.wednesday_hours),
                            thursday_hours: parseFloat(this.state.thursday_hours),
                            friday_hours: parseFloat(this.state.friday_hours),
                            total: parseFloat(this.state.total),
                            submitted: this.state.submitted,
                            is_approved: this.state.is_approved,
                            deny_request: this.state.deny_request
                        }
                    });
                  Swal.fire(
                    'Success',
                    'Timesheet submitted!',
                    'success'
                  )
                }
              })
        }
        
        this.calculateHours();
        console.log(this.state.submitted)
    }

    handleSave = () => {
        this.setState({
            ...this.state.submitted,
            submitted: true
        });
        this.props.dispatch({
            type: 'ADD_TIME_TO_REDUX', 
            payload: [{
                employee_id: this.props.user.id,
                monday: this.state.daysWorked[0],
                tuesday: this.state.daysWorked[1],
                wednesday: this.state.daysWorked[2],
                thursday: this.state.daysWorked[3],
                friday: this.state.daysWorked[4],
                monday_hours: parseFloat(this.state.monday_hours),
                tuesday_hours: parseFloat(this.state.tuesday_hours),
                wednesday_hours: parseFloat(this.state.wednesday_hours),
                thursday_hours: parseFloat(this.state.thursday_hours),
                friday_hours: parseFloat(this.state.friday_hours),
                submitted: this.state.submitted
            }]
        })
        this.calculateHours();
    }

    setDates = () => {

        // moment JS
        // loop through the starting date of Monday through Friday
        // then push the days into the state of TIME

        let date = moment(),
        begin = moment(date).day(1);
        console.log(begin)
        let dates = [];
        for (var i=0; i<5; i++) {
            dates = begin.format('MMM Do YYYY');
            let splits = dates.split(',');
            let dateString = splits.toString();
            this.state.daysWorked.push(dateString)
            begin.add(1, 'd');
            console.log('SET DATES CONSOLE', this.state.daysWorked, begin);
        }
        this.setState({state: this.state})
    }

    calculateHours = () => {
        console.log('in CalculateHours');
        let mon = this.state.monday_hours;
        let tue = this.state.tuesday_hours;
        let wed = this.state.wednesday_hours;
        let thu = this.state.thursday_hours;
        let fri = this.state.friday_hours;
        this.setState({
            ...this.state.total,
            total: parseFloat(mon) + parseFloat(tue) + parseFloat(wed) + parseFloat(thu) + parseFloat(fri)
        })
        console.log(this.state.total);
    }
    
    render() {

        // const dateList = this.state.daysWorked.map( (day, id) => {
        //     return (
        //         <tr key={id}>
        //             <td >{day}</td><td><input type='number' step="0.25" onChange={(event) => {this.inputHours(event, 'hours_worked')}} placeholder='hours'></input></td>
        //         </tr>
        //     )
        // })

        return (
            <div>
                <h1>My Timecard</h1>
                <table >
                    <tbody>
                        <tr><th>Current Week</th></tr>
                        <tr>
                            <td>MON <br/>{this.state.daysWorked[0]}</td>
                            <td>TUE <br/>{this.state.daysWorked[1]}</td>
                            <td>WED <br/>{this.state.daysWorked[2]}</td>
                            <td>THU <br/>{this.state.daysWorked[3]}</td>
                            <td>FRI <br/>{this.state.daysWorked[4]}</td>
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
                                <p>{JSON.stringify(this.props.timesheet)}</p>
                                <p>{JSON.stringify(this.props.timesheet.monday_hours)}</p>
                                <p>{JSON.stringify(this.props.addTimeToRedux)}</p>
                <button>Cancel</button>
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.handleSubmit}>Submit</button>
                <div>Total Hours: {this.state.total} </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    timesheet: state.timesheet,
    addTimeToRedux: state.addTimeToRedux
  });

export default connect(mapStateToProps) (AddTime);