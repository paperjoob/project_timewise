import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// sagas will get employee details from the database
// worker Saga: will be fired on "FETCH_WEEKS" actions
function* fetchEmpDetails() {
  try {
    const response = yield axios.get('/manage');


    yield put({ 
      type: 'SET_EMPLOYEE_DETAIL', 
      payload: response.data 
    });
  } catch (error) {
    console.log('-- fetchEmpDetails getSaga request failed', error);
  }
}

// saga will be fired on "ADD_EMPLOYEE_DETAILS" for usernames ONLY
function* fetchEmpUsernames() {
  try {
    const response = yield axios.get('/manage/usernames');
    // get usernames from database
    yield put({ 
      type: 'GET_USERNAMES', 
      payload: response.data 
    });
  } catch (error) {
    console.log('Username get request failed', error);
  }
}

function* employeeDetailSaga() {
  yield takeLatest('FETCH_EMPLOYEE_DETAILS', fetchEmpDetails);
  yield takeLatest('FETCH_EMPLOYEE_USERNAMES', fetchEmpUsernames);
}

export default employeeDetailSaga;