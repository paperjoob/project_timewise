import React, {Component} from 'react';

class AddEmployeeDetails extends Component {

    // display employee details
    componentDidMount() {
        this.getProfile();
        this.getUsernames();
    }

    getUsernames = () => {
        this.props.dispatch({
            type: 'FETCH_EMPLOYEE_USERNAMES',
            payload: this.props.match.params.id
        })
        console.log(this.props.empDetail)
    }

    render() {
        return (
            <div>
                Hello from AddEmployeeDetails
            </div>
        )
    }
}

export default AddEmployeeDetails;