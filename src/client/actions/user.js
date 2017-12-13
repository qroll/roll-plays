import { callApi } from "../util/callApi";

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
            console.log(err);
            dispatch({ type: "LOGOUT_USER" });
        });
};

export const login = (username, password) => {
    return dispatch =>
        callApi("/login", "post", { username, password })
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: "LOGIN_USER"
                });
            })
            .catch(err => {
                console.log(err);
            });
};

export const logout = () => {
    return dispatch => {
        callApi("/logout", "post")
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: "LOGOUT_USER"
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};
