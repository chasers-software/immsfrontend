import * as actionTypes from '../actions/actionTypes';

const initialState = {
    infoBox: null,
    classes: []
};

const setTeacherClasses = (state, action) => {
    return {...state, classes: action.value}
};

const setTeacherInfoBox = (state, action) => {
    return {...state, infoBox: action.value}
};

const resetStates = (state, action) => {
    return {...initialState}
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.SET_TEACHER_CLASSES: return setTeacherClasses(state, action);
        case actionTypes.SET_TEACHER_INFOBOX: return setTeacherInfoBox(state, action);
        case actionTypes.RESET_TEACHER_DEFAULTS: return resetStates(state, action);
        default:
            return state;
    }
};

export default reducer;
