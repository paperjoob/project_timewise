import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_PROFILE" actions
function* fetchProfile() {
  try {
    const response = yield axios.get('/profile');
    yield put({ 
      type: 'SET_PROFILE', 
      payload: response.data 
    });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* profileSaga() {
  yield takeLatest('FETCH_PROFILE', fetchProfile);
}

export default profileSaga;
