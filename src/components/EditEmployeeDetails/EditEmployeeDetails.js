import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddEmployeeDetails extends Component {

    state = {
        editUser: {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',
            id: this.props.match.params.id
        }
    }

    // display employee details
    componentDidMount() {
        this.getProfile();
    }

    getProfile = () => {
        this.props.dispatch({
            type: 'FETCH_EMP_DETAILS',
            payload: this.props.match.params.id
        })
        console.log(this.props.empDetail)
    }

    handleChange = (event, propertyName) => {
        console.log(event.target.value);
        this.setState({
            editUser: {
                ...this.state.editUser,
                [propertyName]: event.target.value
            }
        })

    }

    render() {

        const employeeDetails = this.props.empDetail.map( (employee) => {
            return (  
                <form key={employee.id}>
                    <label><span>Username</span><input onChange={this.handleChange} value={employee.username}></input></label>
                    <br />
                    <label><span>First Name</span><input onChange={(event) => {this.handleChange(event, 'first_name')} } value={employee.first_name}></input></label>
                    <br />
                    <label><span>Last Name</span><input onChange={(event) => {this.handleChange(event, 'last_name')}} value={employee.last_name}></input></label>
                    <br />
                    <label><span>Email</span><input onChange={(event) => {this.handleChange(event, 'email')}} value={employee.email}></input></label>
                    <br />
                    <label><span>Street</span><input onChange={(event) => {this.handleChange(event, 'street')}} value={employee.street}></input></label>
                    <br />
                    <label><span>City</span><input onChange={(event) => {this.handleChange(event, 'city')}} value={employee.city}></input></label>
                    <br />
                    <label><span>State</span><input onChange={(event) => {this.handleChange(event, 'state')}} value={employee.state}></input></label>
                    <br />
                    <label><span>Zipcode</span><input onChange={(event) => {this.handleChange(event, 'zipcode')}} value={employee.zipcode}></input></label>
                    <br />
                    <label><span>Phone</span><input onChange={(event) => {this.handleChange(event, 'phone')}} value={employee.phone}></input></label>
                    <br />
                    <button>Cancel</button>
                    <button>Save Changes</button>
                </form>
            )
        })

        return (
            <div>
                <h1>Edit Employee</h1>
                <div>
                    {employeeDetails}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    empDetail: state.empDetail,
});

export default connect(mapStateToProps) (AddEmployeeDetails);