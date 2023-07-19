import {
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    CURRENT_USER_REQUEST,
    CURRENT_USER_SUCCESS,
    CURRENT_USER_FAIL,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    CLEAR_MESSAGE,
    SIGN_OUT_FAIL,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS
} from '../constants'


export const authReducer = (state = {}, action) => {
    const { message, token, user } = action.payload || {};
    switch (action.type) {
        case SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case SIGN_IN_SUCCESS:
            localStorage.setItem('token', token)
            return {
                loading: false,
                success: message,
                user: user,
                isAuthenticated: true
            }

        case SIGN_IN_FAIL:
            return {
                loading: false,
                error: action.payload,
                isAuthenticated: false
            }

        case SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: message,
            }

        case SIGN_UP_FAIL:
            return {
                loading: false,
                error: action.payload,
                isAuthenticated: false
            }

        case SIGN_OUT_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case SIGN_OUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
            }
        case SIGN_OUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CURRENT_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case CURRENT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                user: action.payload.user,
                isAuthenticated: true
            }

        case CURRENT_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            }

        case GET_ALL_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userList: user,
            }

        case GET_ALL_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                // isAuthenticated: false
            }

        case CLEAR_MESSAGE:
            return {
                ...state,
                error: null,
                success: null
            }

        default:
            return state
    }
}