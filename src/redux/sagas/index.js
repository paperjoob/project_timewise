import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import profileSaga from './profileSaga';
import employeeDetailSaga from './employeeDetailSaga';
import addEmployeeSaga from './addEmployeeSaga';
import hoursSaga from './hoursSaga';
import timesheetSaga from './timesheetSaga'
import notificationSaga from './notificationSaga';
import adminTimeSaga from './adminTimeSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    profileSaga(),
    employeeDetailSaga(),
    addEmployeeSaga(),
    hoursSaga(),
    timesheetSaga(),
    notificationSaga(),
    adminTimeSaga(),
  ]);
}
