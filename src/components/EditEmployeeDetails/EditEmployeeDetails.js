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

    componentDidUpdate = (prevProps) => {
        if (this.props.empDetail !== prevProps.empDetail) {
            console.log(this.props.empDetail)
            let edit = this.props.empDetail[0]
            this.setState({
                editUser: {
                    username: edit.username,
                    first_name: edit.first_name,
                    last_name: edit.last_name,
                    email: edit.email,
                    street: edit.street,
                    city: edit.city,
                    state: edit.state,
                    zipcode: edit.zipcode,
                    phone: edit.phone,
                    id: this.props.match.params.id
                }
            })
        }
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

    // cancels changes and brings user back to /manage
    cancelEdit = () => {
        this.props.history.push('/manage');
    }

    // saves changes to user updates
    saveChanges = (event) => {
        event.preventDefault();
        console.log(this.state.editUser)
        this.props.dispatch({ type: 'UPDATE_EMPLOYEE', payload: this.state.editUser})
    }

    render() {

        const employeeDetails = this.props.empDetail.map( (employee) => {
            return (  
                <form key={employee.id} onSubmit={this.saveChanges}>
                    <label><span>Username</span><input onChange={(event) => {this.handleChange(event, 'username')}} value={this.state.editUser.username}></input></label>
                    <br />
                    <label><span>First Name</span><input onChange={(event) => {this.handleChange(event, 'first_name')} } value={this.state.editUser.first_name}></input></label>
                    <br />
                    <label><span>Last Name</span><input onChange={(event) => {this.handleChange(event, 'last_name')}} value={this.state.editUser.last_name}></input></label>
                    <br />
                    <label><span>Email</span><input onChange={(event) => {this.handleChange(event, 'email')}} value={this.state.editUser.email}></input></label>
                    <br />
                    <label><span>Street</span><input onChange={(event) => {this.handleChange(event, 'street')}} value={this.state.editUser.street}></input></label>
                    <br />
                    <label><span>City</span><input onChange={(event) => {this.handleChange(event, 'city')}} value={this.state.editUser.city}></input></label>
                    <br />
                    <label><span>State</span><input onChange={(event) => {this.handleChange(event, 'state')}} value={this.state.editUser.state}></input></label>
                    <br />
                    <label><span>Zipcode</span><input onChange={(event) => {this.handleChange(event, 'zipcode')}} value={this.state.editUser.zipcode}></input></label>
                    <br />
                    <label><span>Phone</span><input onChange={(event) => {this.handleChange(event, 'phone')}} value={this.state.editUser.phone}></input></label>
                    <br />
                    <button onClick={this.cancelEdit}>Cancel</button>
                    <button type="submit">Save Changes</button>
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