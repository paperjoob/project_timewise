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

// fetches employee details
function* grabEmployeeDetails(action) {
  try {
    const response = yield axios.get(`/manage/edit/${action.payload}`);
    yield put({ 
      type: 'SET_EMPLOYEE_DETAIL', 
      payload: response.data 
    });
  } catch (error) {
    console.log('-- fetchEmpDetails getSaga request failed', error);
  }
}

// sends delete request to its corresponding router for deletion
function* deleteUser(action) {
  try {
      yield axios.delete(`/manage/${action.payload}`)
      yield put({
          type: 'FETCH_EMPLOYEE_DETAILS'
      })
  } catch (error) {
      console.log(error)
  }
}

// sends put request to router
function* updateUser(action) {
  try {
    const response = yield axios.put(`/manage/`, action.payload);
    console.log(response);
  } catch (error) {
      console.log('Error updating user in UpdateUser SAGA', error)
  }
}

function* employeeDetailSaga() {
  yield takeLatest('FETCH_EMPLOYEE_DETAILS', fetchEmpDetails);
  yield takeLatest('FETCH_EMP_DETAILS', grabEmployeeDetails);
  yield takeLatest('DELETE_EMPLOYEE', deleteUser);
  yield takeLatest('UPDATE_EMPLOYEE', updateUser);
}

export default employeeDetailSaga;