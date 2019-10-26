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

// fetches employee details
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

function* notificationSaga() {
  yield takeLatest('FETCH_NOTIFICATION_ADMIN', fetchNotification);
  yield takeLatest('FETCH_TIMESHEET_REVIEW', getReviewTimesheet);
}

export default notificationSaga;