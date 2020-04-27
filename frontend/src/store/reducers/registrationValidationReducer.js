import { USER_REGISTRATION } from "../types";

const initState = {
    email: '',	
    code: '',	
    username: '',
    password: '',	
    password_repeat: '',	
    first_name: '',	
    last_name: ''
}
export const registrationValidationReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_REGISTRATION:
            return {
                ...state, email: action.payload
            }
    }
    return state;
}