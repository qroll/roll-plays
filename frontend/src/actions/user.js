import { callApi } from "src/utils/callApi";

export const checkUserSession = () => dispatch => {
  dispatch({
    type: "USER_CHECK_SESSION"
  });

  return callApi("/auth/user")
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: "LOGIN_USER" });
      } else {
        dispatch({ type: "LOGOUT_USER" });
      }
    })
    .catch(err => {
      dispatch({ type: "LOGOUT_USER" });
      return err;
    });
};

export const login = (username, password) => {
  return dispatch =>
    callApi("/auth/login", "post", { username, password }).then(res => {
      console.log(res.data);
      dispatch({
        type: "LOGIN_USER"
      });
    });
};

export const logout = () => {
  return dispatch => {
    callApi("/auth/logout").then(res => {
      console.log(res.data);
      dispatch({
        type: "LOGOUT_USER"
      });
    });
  };
};
