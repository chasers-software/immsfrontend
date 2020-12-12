import * as actionTypes from '../actions/actionTypes';

const initialState = {
    infoBox: null,
    loading: true,
    activeTeacherUsername: null,
    activeTeacherClasses: [],
    teacherDepartments: [],
    teachers: []
};

const reducer=(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.SET_ADMIN_ACTIVE_TEACHER_USERNAME: return {...state, activeTeacherUsername: action.value, loading: true};
        case actionTypes.SET_ADMIN_ACTIVE_TEACHER_CLASSES: return {...state, activeTeacherClasses: [...state.activeTeacherClasses, action.value],
                                                                            loading: false};
        case actionTypes.SET_ADMIN_TEACHER_DEPARTMENTS: return {...state, teacherDepartments: action.value};
        case actionTypes.SET_ADMIN_TEACHERS: return {...state, teachers: action.value, loading: false};
        case actionTypes.RESET_ADMIN_DEFAULTS: return {...initialState};
        default:
            return state;
    }
}

export default reducer;
