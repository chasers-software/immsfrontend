import * as actionTypes from './actionTypes';

export const setActiveTeacherUsername = (value)=>{
    return {
        type: actionTypes.SET_ADMIN_ACTIVE_TEACHER_USERNAME,
        value: value
    }
}

export const setActiveTeacherClasses = (value)=>{
    return {
        type: actionTypes.SET_ADMIN_ACTIVE_TEACHER_CLASSES,
        value: value
    }
}

export const setActiveTeacherIndex = (value) => {
    return {
        type: actionTypes.SET_ADMIN_ACTIVE_TEACHER_CLASS_VALUE_INDEX,
        value: value
    }
};

export const setTeacherClassValues = (value) => {
    return {
        type: actionTypes.SET_ADMIN_TEACHER_CLASS_VALUES,
        value: value
    }
};

export const setInfoBox = (values) => {
    return {
        type: actionTypes.SET_ADMIN_INFOBOX,
        value: values
    }
};

export const setTeacherDepartments = (value)=>{
    return {
        type: actionTypes.SET_ADMIN_TEACHER_DEPARTMENTS,
        value: value
    }
}

export const setTeachers = (value)=>{
    return {
        type: actionTypes.SET_ADMIN_TEACHERS,
        value: value
    }
}

export const resetAdminState = (value)=>{
    return {
        type: actionTypes.RESET_ADMIN_DEFAULTS
    }
}

export const resetAdminTeacherClass = (value)=>{
    return {
        type: actionTypes.RESET_ADMIN_TEACHER_CLASS_VALUES
    }
}
