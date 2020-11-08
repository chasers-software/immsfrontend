import * as actionTypes from '../actions/actionTypes';

const initialState = {
    infoBox: null,
    loading: true,
    activeSem: null,
    sems: [],
    semSubjectValues: [],
    activeSemSubjectValuesIndex: null
};

const reducer=(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.SET_STUDENT_ACTIVE_SEM: return {...state, activeSem: action.value, loading: true}
        case actionTypes.SET_STUDENT_SEMS: return {...state, sems: action.value, loading: false}
        case actionTypes.SET_STUDENT_SEM_SUBJECT_VALUES: return {...state, semSubjectValues: [...state.semSubjectValues, action.value],
                                                                    loading: false}
        case actionTypes.SET_STUDENT_INFOBOX: return {...state, infoBox: action.value}
        case actionTypes.RESET_STUDENT_DEFAULTS: return {...initialState}
        case actionTypes.SET_STUDENT_ACTIVE_SEM_SUBJECT_VALUE_INDEX: return {...state, activeSemSubjectValuesIndex: action.value}
        default:
            return state;
    }
}

export default reducer;
