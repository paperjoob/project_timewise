import React, {Component} from 'react';
import { connect } from 'react-redux';

import './ManageEmployees.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(1),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

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

        const { classes } = this.props;

        // loop through the profile props to retrieve the the weekdays
        const employeeList = this.props.empDetail.map( (employee) => {
            return (  
                <TableRow key={employee.id}>  
                    <TableCell align="center">{employee.username}</TableCell>
                    <TableCell align="center">{employee.id}</TableCell>
                    <TableCell align="center">{employee.first_name}</TableCell>
                    <TableCell align="center">{employee.last_name}</TableCell>
                    <TableCell align="center">{employee.email}</TableCell>
                    <TableCell align="center">{employee.street}</TableCell>
                    <TableCell align="center">{employee.city}</TableCell>
                    <TableCell align="center">{employee.state}</TableCell>
                    <TableCell align="center">{employee.zipcode}</TableCell>
                    <TableCell align="center">{employee.phone}</TableCell>
                    <TableCell align="center"><button onClick={() => {this.handleEdit(employee)} }>Edit</button></TableCell>
                    <TableCell align="center"><button onClick={() => {this.handleDelete(employee)} }>Delete</button></TableCell>
                </TableRow>
            )
        })

        return (
            <div className='manageDiv'>
                <h1>Employee Information</h1>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Username</TableCell>
                            <TableCell align="center">User ID</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Street</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">State</TableCell>
                            <TableCell align="center">Zipcode</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeList}
                        </TableBody>
                    </Table>
                </Paper>
                <div>
                    <input
                      className="addEmp"
                      value="Add Employee"
                      type='submit'
                      onClick ={this.handleAddEmp}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    empDetail: state.empDetail,
});

ManageEmployees.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles) (connect(mapStateToProps) (ManageEmployees));