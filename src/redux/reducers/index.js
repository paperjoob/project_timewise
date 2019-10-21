import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import profile from './profileReducer';
import empDetail from './employeeDetailReducer';
import empUsernames from './employeeUsernamesReducer'
import hours from './hoursReducer';
import addTime from './addTimeReducer';
import timesheet from './timesheetReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  profile, // contains the user details such as first name, last name
  hours, // contains employees hours worked
  empDetail, // contains employee details
  empUsernames, // contains employee usernames and ids
  addTime, // contains time added
  timesheet, // timesheet
});

export default rootReducer;
