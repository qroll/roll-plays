const initialState = {
  isCheckingSession: true,
  isLoggedIn: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_SESSION":
      return {
        ...state,
        isCheckingSession: true
      };
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: true,
        isCheckingSession: false
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isLoggedIn: false,
        isCheckingSession: false
      };
    default:
      return state;
  }
};

export default user;
