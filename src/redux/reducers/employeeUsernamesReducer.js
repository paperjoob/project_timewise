const employeeUsernamesReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_USERNAMES':
        return action.payload;
    //   case 'UNSET_USER':
    //     return {};
      default:
        return state;
    }
  };
  
  // weeks will be on the redux state at:
  // state.empUsernames
  export default employeeUsernamesReducer;