const adminNotification = (state = [], action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION_ADMIN':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.adminNotification
  export default adminNotification;