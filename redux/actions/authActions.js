import api from '../api';
import {
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_FAIL,
    CURRENT_USER_REQUEST,
    CURRENT_USER_SUCCESS,
    CURRENT_USER_FAIL,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    CLEAR_MESSAGE
} from '../constants'

export const signin = (payload) => async dispatch => {
    try {
        dispatch({ type: SIGN_IN_REQUEST })
        const { data } = await api.post('/auth/signin', payload);
        console.log('dddddd: ', data)
        dispatch({ type: SIGN_IN_SUCCESS, payload: data });
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: SIGN_IN_FAIL, payload: err?.response?.data?.message })
    }
}

export const signup = (payload, router) => async dispatch => {
    try {
        dispatch({ type: SIGN_UP_REQUEST })
        const { data } = await api.post('/auth/signup', payload);
        dispatch({ type: SIGN_UP_SUCCESS, payload: data });
        router.push('login')
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: SIGN_UP_FAIL, payload: err?.response?.data?.message })
    }
}

export const signout = () => async dispatch => {
    try {
        dispatch({ type: SIGN_OUT_REQUEST })
        localStorage.removeItem('token');
        dispatch({ type: SIGN_OUT_SUCCESS });
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: SIGN_OUT_FAIL, payload: err.toString() })
    }
}

export const getCurrentUser = () => async dispatch => {
    try {
        dispatch({ type: CURRENT_USER_REQUEST })
        const { data } = await api.get('/user/me');
        dispatch({ type: CURRENT_USER_SUCCESS, payload: data });
    } catch (err) {
        console.log('get current user error: ', err);
        dispatch({ type: CURRENT_USER_FAIL, payload: err?.response?.data?.message })
    }
}

export const getAllUser = () => async dispatch => {
    try {
        dispatch({ type: GET_ALL_USER_REQUEST })
        const { data } = await api.get('/user');
        dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
    } catch (err) {
        console.log('get current user error: ', err);
        dispatch({ type: GET_ALL_USER_FAIL, payload: err?.response?.data?.message })
    }
}

export const clearMessage = () => async dispatch => {
    dispatch({ type: CLEAR_MESSAGE })
}