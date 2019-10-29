import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "SET NOTIFICATION ADMIN"
function* fetchNotification() {
  try {
    const response = yield axios.get('/notification');
    yield put({ 
      type: 'SET_NOTIFICATION_ADMIN', 
      payload: response.data 
    });
  } catch (error) {
    console.log('--NOTIFICATION get request failed', error);
  }
}

// fetches an individual employee timesheet data
function* getReviewTimesheet(action) {
    try {
      const response = yield axios.get(`/review/${action.payload}`);
      yield put({ 
        type: 'SET_REVIEW_TIMESHEET', 
        payload: response.data 
      });
    } catch (error) {
      console.log('-- fetchEmpDetails getSaga request failed', error);
    }
  }

  // put router to update the status of the time request - APPROVE
  function* updateRequest(action) {
    try {
      const response = yield axios.put(`/review/:id`, action.payload);
      console.log('in UPDATE REQUEST', response)
    } catch (error) {
      console.log('Error while updating time request', error);
      
    }
  }

    // put router to update the status of the time request - DENY
    function* denyRequest(action) {
      try {
        const response = yield axios.put(`/review/:id/deny`, action.payload);
        console.log('Deny REQUEST SAGA---', response)
      } catch (error) {
        console.log('Error while updating time request', error);
        
      }
    }

//////////////// USER NOTIFICATIONS ///////////////

// worker Saga: will be fired on "SET NOTIFICATION USER" -- USERS ONLY 
// if deny_request is false, do this
function* grabNotificationUser() {
    try {
      const response = yield axios.get('/notification/user');
      yield put({ 
        type: 'SET_NOTIFICATION_USER', 
        payload: response.data 
      });
    } catch (error) {
      console.log('--NOTIFICATION get request failed', error);
    }
  }

  // fetches the own employees' timesheet data
function* getEditUser(action) {
    try {
      const response = yield axios.get(`/edit/${action.payload}`);
      yield put({ 
        type: 'SET_EDIT_USER', 
        payload: response.data 
      });
    } catch (error) {
      console.log('-- fetchEmpDetails getSaga request failed', error);
    }
  }

   // put router to update the status of the time request
   function* updateHours(action) {
    try {
      const response = yield axios.put(`/edit/:id`, action.payload);
      console.log('in UPDATE Hours Saga for User', response)
    } catch (error) {
      console.log('Error while updating time request', error);
      
    }
  }

function* notificationSaga() {
  yield takeLatest('FETCH_NOTIFICATION_ADMIN', fetchNotification);
  yield takeLatest('FETCH_TIMESHEET_REVIEW', getReviewTimesheet);
  yield takeLatest('UPDATE_REQUEST', updateRequest);
  yield takeLatest('DENY_REQUEST', denyRequest);
  yield takeLatest('GRAB_NOTIFICIATION_USER', grabNotificationUser);
  yield takeLatest('GRAB_HOURS_USER', getEditUser);
  yield takeLatest('UPDATE_HOURS', updateHours);
}

export default notificationSaga;