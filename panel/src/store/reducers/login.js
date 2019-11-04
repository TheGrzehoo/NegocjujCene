import * as actionTypes from '../actions';

const initialState = window.sessionStorage.getItem('appState') ? JSON.parse(window.sessionStorage.getItem('appState')) : {
    isLogged: false,
    login: null,
    error: false,
    errorMessage: ''
}

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.LOGIN) {
        // window.sessionStorage.setItem('appState', JSON.stringify({
        //     ...state,
        //     isLogged: true,
        //     login: action.login
        // }));
        return {
            ...state,
            isLogged: true,
            error: false,
            login: action.login
        }
    }
    if (action.type === actionTypes.LOGIN_ERROR) {
        return {
            ...state,
            error: true,
            errorMessage: action.errorMessage
        }
    }
    if (action.type === actionTypes.REMOVE_ERROR) {
        return {
            error: false
        }
    }
    return state;
};

export default reducer;