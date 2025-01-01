const initialState = {
    isAuthenticated: false,
    user: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SET_USER':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  