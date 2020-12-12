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

export const setTeacherDepartments = (value)=>{
    return {
        type: actionTypes.SET_ADMIN_TEACHER_DEPARTMENTS,
        value: value
    }
}

export const resetAdminState = (value)=>{
    return {
        type: actionTypes.RESET_ADMIN_DEFAULTS
    }
}
