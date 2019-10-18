import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_WEEKS" actions
function* fetchEmpDetails() {
  try {
    const response = yield axios.get('/manage');

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ 
      type: 'SET_EMPLOYEE_DETAIL', 
      payload: response.data 
    });
  } catch (error) {
    console.log('-- WEEKS getSaga request failed', error);
  }
}

function* employeeDetailSaga() {
  yield takeLatest('FETCH_EMPLOYEE_DETAILS', fetchEmpDetails);
}

export default employeeDetailSaga;