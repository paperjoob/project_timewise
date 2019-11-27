import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import UserPage from '../UserPage/UserPage';
import AppNavBar from '../AppNavBar/AppNavBar';
import Profile from '../Profile/Profile';
import AddTime from '../AddTime/AddTime';
import TimesheetReport from '../TimesheetReport/TimesheetReport';
import ManageEmployees from '../ManageEmployees/ManageEmployees';
import AddEmployee from '../AddEmployee/AddEmployee';
import EditEmployeeDetails from '../EditEmployeeDetails/EditEmployeeDetails';
import ReviewRequest from '../ReviewRequest/ReviewRequest';
import TimeReportAdmin from '../TimeReportAdmin/TimeReportAdmin';
import EditTimesheet from '../EditTimesheet/EditTimesheet';

import './App.css';



class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <AppNavBar />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
            />
            <ProtectedRoute
              exact
              path="/addtime"
              component={AddTime}
            />
            <ProtectedRoute
              exact
              path="/timesheetreport"
              component={TimesheetReport}
            />
            <ProtectedRoute
              exact
              path="/manage"
              component={ManageEmployees}
            />
            <ProtectedRoute
              exact
              path="/manage/addemployee"
              component={AddEmployee}
            />
            <ProtectedRoute
              exact
              path="/manage/edit/:id"
              component={EditEmployeeDetails}
            />
            <ProtectedRoute
              exact
              path="/review/:id"
              component={ReviewRequest}
            />
            <ProtectedRoute
              exact
              path="/timesheetreport/admin"
              component={TimeReportAdmin}
            />
            <ProtectedRoute
              exact
              path="/edit/:id"
              component={EditTimesheet}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
