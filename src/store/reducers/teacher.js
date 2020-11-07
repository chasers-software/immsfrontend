import * as actionTypes from '../actions/actionTypes';

const initialState = {
    infoBox: null,
    activeClass: null,
    activeSem: null,
    activeGroup: null,
    activeClassStudentValuesIndex: null,
    classes: [],
    classStudentValues: [],
    loading: false
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

const setActiveClass = (state, action) => {
    return {...state, activeClass: action.Class, activeSem: action.sem, activeGroup: action.group, loading: false};
};

const setActiveClassStudentIndex = (state, action) => {
    return {...state, activeClassStudentValuesIndex: action.value, loading: false}
};

const setClassStudentValues = (state, action) => {
    return {
        ...state,
        classStudentValues: [...state.classStudentValues, action.value],
        loading: false
    }
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.SET_TEACHER_CLASSES: return setTeacherClasses(state, action);
        case actionTypes.SET_TEACHER_INFOBOX: return setTeacherInfoBox(state, action);
        case actionTypes.RESET_TEACHER_DEFAULTS: return resetStates(state, action);
        case actionTypes.SET_TEACHER_ACTIVE_CLASS: return setActiveClass(state, action);
        case actionTypes.SET_TEACHER_CLASS_STUDENT_VALUES: return setClassStudentValues(state, action);
        case actionTypes.SET_TEACHER_ACTIVE_CLASS_STUDENT_VALUE_INDEX: return setActiveClassStudentIndex(state, action);
        default:
            return state;
    }
};

export default reducer;
