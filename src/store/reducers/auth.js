import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    username: null,
    fullname: null,
    role: null,
    error: null,
    loading: false,
    redirect: null,
    email: null
};

const authStart = ( state, action ) => {
    return { ...state, error: null, loading: true };
};

const authSuccess = (state, action) => {
    // return updateObject( state, { 
    //     token: action.token,
    //     id: action.id,
    //     role: action.role,
    //     error: null,
    //     loading: false
    //  } );
    // TODO: remove below hardcodes
    // let username = null;
    // if (action.username === '073BCE001A') {
    //     username = '074BCT001';
    // } else if (action.role === 'teacher') {
    //     username = 'teacher';
    // }
    return {
        ...state,
        token: action.token,
        username: action.username,
        fullname: action.fullname,
        role: action.role,
        email: action.email
    }
};

const authFail = (state, action) => {
    return { ...state, error: action.error, loading: false };
};

const authLogout = (state, action) => {
    return {...initialState};
};

const setAuthRedirect = (state, action) => {
    return { ...state, redirect: action.value }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT: return setAuthRedirect(state,action);
        default:
            return state;
    }
};

export default reducer;
