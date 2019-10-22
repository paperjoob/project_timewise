const addTimeToReduxReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TIME_TO_REDUX':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.addTimeToRedux
  export default addTimeToReduxReducer;