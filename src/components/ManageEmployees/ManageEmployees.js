import React, {Component} from 'react';
import { connect } from 'react-redux';

class ManageEmployees extends Component {

    // display employee details
    componentDidMount() {
        this.getProfile();
    }

    // send dispatch to the FETCH_EMPLOYEE_DETAILS from saga
    getProfile = () => {
        this.props.dispatch({
            type: 'FETCH_EMPLOYEE_DETAILS'
        })
        console.log(this.props.empDetail)
    }

    // when add employee button is clicked, bring the admin to the add employee page
    handleAddEmp = () => {
        console.log('in handleAddEmp Button');
        this.props.history.push('/manage/addemployee')
    }

    render() {

        // loop through the profile props to retrieve the the weekdays
        const employeeList = this.props.empDetail.map( (employee) => {
            return (  
                <>  
                    <li>{employee.username} <button>Delete</button></li>
                    <li>{employee.first_name}</li>
                    <li>{employee.last_name}</li>
                    <li>{employee.email}</li>
                    <li>{employee.street}</li>
                    <li>{employee.city}</li>
                    <li>{employee.zipcode}</li>
                    <li>{employee.phone}</li>
                    <li>{employee.user_login_id}</li>
                </>
            )
        })

        return (
            <div>
                <ul>
                    {employeeList}
                </ul>
                <button onClick={this.handleAddEmp}>Add Employee</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    empDetail: state.empDetail
});

export default connect(mapStateToProps) (ManageEmployees);