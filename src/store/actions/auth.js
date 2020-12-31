import * as actionTypes from './actionTypes';
import * as uris from '../uris';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, username, role, fullname, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username,
        role: role,
        fullname: fullname,
        email: email
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password,
        };
        fetch(uris.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success'){
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('id', res.data.user.username);
                    localStorage.setItem('role', ['admin','teacher','student'][res.data.user.role]);
                    dispatch(authSuccess(res.token, res.data.user.person_id, ['admin','teacher','student'][res.data.user.role], res.data.user.full_name, res.data.user.email));
                } else {
                    dispatch(authFail(res.message));
                }
            })
            .catch(err => {
                dispatch(authFail(err));
        });
    };
};

export const setAuthRedirect = (value) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        value: value
    };
};
