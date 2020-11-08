import * as actionTypes from './actionTypes';

export const setActiveSem=(sem)=>{
    return {
        type: actionTypes.SET_STUDENT_ACTIVE_SEM,
        value: sem
    }
}

export const setSemSubjectValues=(value)=>{
    return {
        type: actionTypes.SET_STUDENT_SEM_SUBJECT_VALUES,
        value: value
    }
}

export const setSems=(value)=>{
    return {
        type: actionTypes.SET_STUDENT_SEMS,
        value: value
    }
}

export const setInfoBox = (value) => {
    return {
        type: actionTypes.SET_STUDENT_INFOBOX,
        value: value
    }
};

export const resetStudentState = () => {
    return {
        type: actionTypes.RESET_STUDENT_DEFAULTS
    }
};

export const setActiveSemIndex = (value) => {
    return {
        type: actionTypes.SET_STUDENT_ACTIVE_SEM_SUBJECT_VALUE_INDEX,
        value: value
    }
};
