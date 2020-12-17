import * as actionTypes from '../actions/actionTypes';

const initialState = {
    infoBox: null,
    activeClass: null,
    activeSectionSubject: [],
    activeClassStudentValuesIndex: null,
    classes: [],
    classStudentValues: [],
    loading: true
};

const setTeacherClasses = (state, action) => {
    return {...state, classes: action.value, loading: false}
};

const setTeacherInfoBox = (state, action) => {
    return {...state, infoBox: action.value}
};

const setActiveClass = (state, action) => {
    return {...state, activeClass: action.Class, loading: true};
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

const updateClassStudentValues = (state, action) => {
    let tempClass = [...state.classStudentValues];
    tempClass[state.activeClassStudentValuesIndex].data = action.value
    return {...state, classStudentValues: tempClass}
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.SET_TEACHER_CLASSES: return setTeacherClasses(state, action);
        case actionTypes.SET_TEACHER_INFOBOX: return setTeacherInfoBox(state, action);
        case actionTypes.RESET_TEACHER_DEFAULTS: return {...initialState};
        case actionTypes.SET_TEACHER_ACTIVE_CLASS: return setActiveClass(state, action);
        case actionTypes.SET_TEACHER_CLASS_STUDENT_VALUES: return setClassStudentValues(state, action);
        case actionTypes.SET_TEACHER_ACTIVE_SECTION_SUBJECT: return {...state, activeSectionSubject: action.value};
        case actionTypes.UPDATE_TEACHER_CLASS_STUDENT_VALUES: return updateClassStudentValues(state, action);
        case actionTypes.SET_TEACHER_ACTIVE_CLASS_STUDENT_VALUE_INDEX: return setActiveClassStudentIndex(state, action);
        default:
            return state;
    }
};

export default reducer;
