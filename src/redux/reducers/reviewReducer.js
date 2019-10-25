const reviewReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_REVIEW_TIMESHEET':
        return action.payload;
    //   case 'UNSET_USER':
    //     return {};
      default:
        return state;
    }
  };
  
  // weeks will be on the redux state at:
  // state.weeks
  export default reviewReducer;