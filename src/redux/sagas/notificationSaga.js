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

function* notificationSaga() {
  yield takeLatest('FETCH_NOTIFICATION_ADMIN', fetchNotification);
}

export default notificationSaga;