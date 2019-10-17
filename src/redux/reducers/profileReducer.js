const profileReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROFILE':
        return action.payload;
    //   case 'UNSET_USER':
    //     return {};
      default:
        return state;
    }
  };
  
  // profile will be on the redux state at:
  // state.profile
  export default profileReducer;