import React, {Component} from 'react';
import { connect } from 'react-redux';

class ManageEmployees extends Component {

    // display employee details
    componentDidMount() {
        this.getProfile();
        this.getUsernames();
    }

    // send dispatch to the FETCH_EMPLOYEE_DETAILS from saga
    getProfile = () => {
        this.props.dispatch({
            type: 'FETCH_EMPLOYEE_DETAILS'
        })
        console.log(this.props.empDetail)
    }

    getUsernames = () => {
        this.props.dispatch({
            type: 'FETCH_EMPLOYEE_USERNAMES',
            payload: this.props.match.params.id
        })
        console.log(this.props.empDetail)
    }

    // when add employee button is clicked, bring the admin to the add employee page
    handleAddEmp = () => {
        console.log('in handleAddEmp Button');
        this.props.history.push('/manage/addemployee')
    }

    // opens employee information
    handleEdit = (employee) => {
        console.log('in employee edit')
        this.props.history.push(`/manage/edit/${employee.id}`);
    }

    handleDelete = (employee) => {
        console.log('in handleDELETE');
        this.props.dispatch({
            type: 'DELETE_EMPLOYEE',
            payload: employee.id
        })
    }

    render() {

        // loop through the profile props to retrieve the the weekdays
        const employeeList = this.props.empDetail.map( (employee) => {
            return (  
                <tr key={employee.id}>  
                    <td>{employee.username}</td>
                    <td>{employee.id}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.street}</td>
                    <td>{employee.city}</td>
                    <td>{employee.state}</td>
                    <td>{employee.zipcode}</td>
                    <td>{employee.phone}</td>
                    <td><button onClick={() => {this.handleEdit(employee)} }>Edit</button></td>
                    <td><button onClick={() => {this.handleDelete(employee)} }>Delete</button></td>
                </tr>
            )
        })

        return (
            <div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zipcode</th>
                                <th>Phone</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            {employeeList}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={this.handleAddEmp}>Add Employee</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    empDetail: state.empDetail,
});

export default connect(mapStateToProps) (ManageEmployees);