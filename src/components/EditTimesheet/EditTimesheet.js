import React, {Component} from 'react';
import {connect} from 'react-redux';
import './EditTimesheet.css';
import Swal from 'sweetalert2'

class EditTimesheet extends Component {

    state = {
        editTime: {
            monday_hours: '',
            tuesday_hours: '',
            wednesday_hours: '',
            thursday_hours: '',
            friday_hours: '',
            comments: '',
            total: '',
            id: this.props.match.params.id
        }
    }

    // renders dates/hours onto the DOM
    componentDidMount() {
        this.getTime();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.userNotification !== prevProps.userNotification) {
            console.log('in Component DID UPDATE', this.props.userNotification)
            let edit = this.props.userNotification[0]
            this.setState({
                editTime: {
                    monday_hours: edit.monday_hours,
                    tuesday_hours: edit.tuesday_hours,
                    wednesday_hours: edit.wednesday_hours,
                    thursday_hours: edit.thursday_hours,
                    friday_hours: edit.friday_hours,
                    comments: edit.comments,
                    total: edit.total,
                    id: this.props.match.params.id
                }
            })
        }
    }

    // sends dispatch to saga to grab dates/hours for employee
    getTime = () => {
        this.props.dispatch({
            type: 'GRAB_HOURS_USER',
            payload: this.props.match.params.id
        })
        console.log('get Edit TIME', this.props.userNotification)
    }

    // sends dispatch to Saga to update hours
    handleSave = () => {
        this.calculateHours();

        Swal.fire({
            title: 'Are the times entered correct?',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((willAdd) => {
            if (willAdd.value) {
                this.props.dispatch({ 
                    type: 'UPDATE_HOURS', 
                    payload: this.state.editTime
                });
                console.log('in HANDLE SAVE',this.state.editTime)
              Swal.fire(
                'Success!',
                'Time has been added.',
                'success'
              )
            }
            this.getTime();   
        })
    }

    // sums up week hours
    calculateHours = () => {
        let mon = this.state.editTime.monday_hours;
        let tue = this.state.editTime.tuesday_hours;
        let wed = this.state.editTime.wednesday_hours;
        let thu = this.state.editTime.thursday_hours;
        let fri = this.state.editTime.friday_hours;
        this.setState({
            ...this.state.editTime.total,
            total: parseFloat(mon) + parseFloat(tue) + parseFloat(wed) + parseFloat(thu) + parseFloat(fri)
        })
        console.log('in CALCULATE HOURS', this.state.editTime.total);
    }

    handleBack = () => {
        console.log('in handleBack');
        this.props.history.push('/home')
    }

    handleChange = (event, propertyName) => {
        console.log(event.target.value);
        this.setState({
            editTime: {
                ...this.state.editTime,
                [propertyName]: event.target.value
            }
        })
    }

    render() {

        const timeDetails = this.props.userNotification.map( (time) => {
            return (  
                <>
                <p>Name: {time.first_name} {time.last_name}</p>
                <p>Employee ID: {time.id}</p>
                <table >
                    <tbody>
                        <tr>
                            <td>{time.monday}</td>
                            <td>{time.tuesday}</td>
                            <td>{time.wednesday}</td>
                            <td>{time.thursday}</td>
                            <td>{time.friday}</td>
                        </tr>
                        <tr>  
                            <td><input type='number' step="0.25" value={this.state.editTime.monday_hours} onChange={(event) => {this.handleChange(event, 'monday_hours')}}></input></td>
                            <td><input type='number' step="0.25" value={this.state.editTime.tuesday_hours} onChange={(event) => {this.handleChange(event, 'tuesday_hours')}}></input></td>
                            <td><input type='number' step="0.25" value={this.state.editTime.wednesday_hours} onChange={(event) => {this.handleChange(event, 'wednesday_hours')}}></input></td>
                            <td><input type='number' step="0.25" value={this.state.editTime.thursday_hours} onChange={(event) => {this.handleChange(event, 'thursday_hours')}}></input></td>
                            <td><input type='number' step="0.25" value={this.state.editTime.friday_hours} onChange={(event) => {this.handleChange(event, 'friday_hours')}}></input></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <textarea onChange={(event) => {this.handleChange(event, 'comments')}} value={this.state.editTime.comments}></textarea>
                <br />
                <button onClick={this.handleBack}>Back</button>
                <button onClick={this.handleSave}>Submit</button>
                </>
            )
        })

        return (

            <div className='editTimeDiv'>
                <h1>Edit Timesheet</h1>
                    {timeDetails}
                <p>{JSON.stringify(this.props.userNotification)}</p>
                <p onChange={(event) => {this.handleChange(event, 'total')}}>Total Hours: {this.state.editTime.total} </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    userNotification: state.userNotification,
  });

export default connect(mapStateToProps) (EditTimesheet);