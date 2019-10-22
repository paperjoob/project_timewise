import React, {Component} from 'react';
import { connect } from 'react-redux';

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
        total: 0
    }

    componentDidMount(){
        this.setDates();
        this.getWeek();
    }

    getWeek = () => {
        this.props.dispatch({
            type: 'FETCH_TIME',
        })
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
        console.log('in handleSubmit');
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
                friday_hours: parseFloat(this.state.friday_hours)
            }
        });
    }

    handleSave = () => {
        this.props.dispatch({
            type: 'ADD_TIME_TO_REDUX', 
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
                friday_hours: parseFloat(this.state.friday_hours)
            }
        })
        this.calculateHours();
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
            console.log(this.state.daysWorked);
        }
        this.setState({state: this.state})
    }

    calculateHours = () => {
        console.log('in CalculateHours');
        let mon = this.state.monday_hours;
        let tue = this.state.tuesday_hours;
        this.setState({
            ...this.state.total,
            total: parseFloat(mon) + parseFloat(tue)
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
                            <td><input type='number' step="0.25" onChange={(event) => {this.inputHours(event, 'monday_hours')}} placeholder={this.props.timesheet.monday_hours} ></input></td>
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
                <button onClick={this.calculateHours}>Calculate Hours</button>
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