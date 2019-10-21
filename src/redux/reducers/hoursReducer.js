const hoursReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_HOURS':
        return [...state, action.payload];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.hours
  export default hoursReducer;