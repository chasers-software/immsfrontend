import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    username: null,
    role: null,
    error: null,
    loading: false,
    redirect: null
};

const authStart = ( state, action ) => {
    return { ...state, error: null, loading: true };
};

const authSuccess = (state, action) => {
    console.log("In auth suc reducer", action);
    // return updateObject( state, { 
    //     token: action.token,
    //     id: action.id,
    //     role: action.role,
    //     error: null,
    //     loading: false
    //  } );
    return {
        ...state,
        token: action.token,
        username: action.username,
        role: action.role
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
