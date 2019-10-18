const employeeDetailReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EMPLOYEE_DETAIL':
        return action.payload;
    //   case 'UNSET_USER':
    //     return {};
      default:
        return state;
    }
  };
  
  // addEmployee will be on the redux state at:
  // state.addEmployee
  export default employeeDetailReducer;