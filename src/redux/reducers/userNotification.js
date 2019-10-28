const userNotifcation = (state = [], action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION_USER':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.userNotification
  export default userNotifcation;