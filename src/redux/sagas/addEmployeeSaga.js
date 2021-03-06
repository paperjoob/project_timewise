import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// posting a new employee to the database

// worker Saga: will be fired on "ADD_EMPLOYEE" actions
function* addUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_EMPLOYEE_ERROR' });

    // passes the username and password from the payload to the server
    const response = yield axios.post(`/manage/addemployee`, action.payload);
    console.log(response)
    
  } catch (error) {
      console.log('Error with ADDING USER:', error);
      yield put({type: 'ADD_FAILED'});
  }
} // end addUser

function* addEmployeeSaga() {
  yield takeLatest('ADD_EMPLOYEE', addUser);
}

export default addEmployeeSaga;
