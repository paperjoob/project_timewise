import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// POST SAGA for Adding Time
function* addTime(action) {
  console.log('ADD TIME ____', action.payload)
  try {
    const response = yield axios.post('/addtime', action.payload);
    console.log(response);
    // yield fetchTime();
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* hoursSaga() {
  yield takeLatest('ADD_TIME', addTime);
//   yield takeLatest('FETCH_TIME', fetchTime);
}

export default hoursSaga;