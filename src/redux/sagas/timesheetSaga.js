import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetch the time for all timesheet
function* fetchTime(){
    try{
    const response = yield axios.get(`/timesheetreport`);
    yield put({type: 'SET_TIME', payload: response.data});
    console.log('--FETCH TIME---', response)
    }catch(error){
      console.log('Error while fetching timesheet hours', error);
    }
}

function* timesheetSaga() {
  yield takeLatest('FETCH_TIME', fetchTime);
}

export default timesheetSaga;