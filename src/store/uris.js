const baseURI = 'https://immsnode.herokuapp.com';
export const LOGIN = baseURI+'/api/users/login';
export const ASSIGN_TEACHER = baseURI+'/api/users/assignTeacher';
export const ADD_TEACHER = baseURI+"/api/classes/addTeacher";
export const FETCH_CLASS_LIST = baseURI+'/api/lecturers/';
export const FETCH_CLASS_STUDENT_lIST = baseURI+'/api/marks/class/';
export const POST_MARKS = baseURI+'/api/record/class/';
export const STUDENT_MARKS = baseURI+'/api/marks/';
export const FETCH_TEACHER_LIST = baseURI+'/api/users?role=teacher';