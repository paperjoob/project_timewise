const timesheetReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TIME':
        return action.payload;
      default:
        return state;
    }
  };
  
  // timesheet will be on the redux state at:
  // state.timesheet
  export default timesheetReducer;