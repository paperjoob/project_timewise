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

// sends put request to router
function* updateProfile(action) {
  try {
    const response = yield axios.put(`/profile`, action.payload);
    console.log(response);
  } catch (error) {
      console.log('Error updating user in updatePROFILE SAGA', error)
  }
}

function* profileSaga() {
  yield takeLatest('FETCH_PROFILE', fetchProfile);
  yield takeLatest('UPDATE_PROFILE', updateProfile);
}

export default profileSaga;
