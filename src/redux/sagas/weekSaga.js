import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_WEEKS" actions
function* fetchWeeks() {
  try {
    const response = yield axios.get('addtime/weeks');

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ 
      type: 'SET_WEEKS', 
      payload: response.data 
    });
  } catch (error) {
    console.log('-- WEEKS getSaga request failed', error);
  }
}

function* weekSaga() {
  yield takeLatest('FETCH_WEEKS', fetchWeeks);
}

export default weekSaga;