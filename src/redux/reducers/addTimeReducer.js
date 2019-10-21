const addTimeReducer = (state = [], action) => {
    switch (action.type) {
      case 'PLACE_TIME':
        return [...state, action.payload];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.addTime
  export default addTimeReducer;