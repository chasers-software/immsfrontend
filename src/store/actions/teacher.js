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
