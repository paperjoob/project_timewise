import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//fetch the time for all timesheet
function* getAllTime(){
    try{
    const response = yield axios.get(`/timesheetreport/admin`);
    yield put({type: 'SET_ALL_TIME', payload: response.data});
    console.log('--SET ALL TIME ADMIN ---', response)
    }catch(error){
      console.log('Error while fetching timesheet hours', error);
    }
  }

function* adminTimeSaga() {
  yield takeLatest('GET_ALL_TIME', getAllTime);
}

export default adminTimeSaga;