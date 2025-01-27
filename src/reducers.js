import {combineReducers, createStore} from 'redux'

const initialStateSignup = {
    signupErrorMessage:'',
}
const initialStateLogin={
    loginErrorMessage:''
}

function errorLoginReducer(state=initialStateLogin, action){
    switch(action.type){
        case 'error/login':
            return {...state,loginErrorMessage:action.payload}
        default:
            return state
    }
}
function errorSignupReducer(state=initialStateSignup, action){
    switch(action.type){
        case 'error/signup':
            return {...state,  signupErrorMessage: action.payload}
        default:
                return state
    }
}

const rootReducer = combineReducers({
    signup:errorSignupReducer,
    login: errorLoginReducer
})
export const store = createStore(rootReducer);

export function errorSignup(message){
    return {type:'error/signup',payload:message}
}
export function errorLogin(message){
    return {type:'error/login',payload:message}
}
