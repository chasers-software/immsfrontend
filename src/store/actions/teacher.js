import * as actionTypes from './actionTypes';
// import * as uris from '../uris';

export const setClasses = (values) => {
    return {
        type: actionTypes.SET_TEACHER_CLASSES,
        value: values
    }
};

export const setInfoBox = (values) => {
    return {
        type: actionTypes.SET_TEACHER_INFOBOX,
        value: values
    }
};

export const resetTeacherState = () => {
    return {
        type: actionTypes.RESET_TEACHER_DEFAULTS
    }
};

export const setActiveClass = (Class, sem, group) => {
    return {
        type: actionTypes.SET_TEACHER_ACTIVE_CLASS,
        Class: Class,
        sem: sem,
        group: group
    }
};

export const setActiveStudentIndex = (value) => {
    return {
        type: actionTypes.SET_TEACHER_ACTIVE_CLASS_STUDENT_VALUE_INDEX,
        value: value
    }
};

export const setClassStudentValues = (value) => {
    return {
        type: actionTypes.SET_TEACHER_CLASS_STUDENT_VALUES,
        value: value
    }
};
