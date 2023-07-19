import api from '../api';
import {
    DONATION_CREATE_REQUEST,
    DONATION_CREATE_SUCCESS,
    DONATION_CREATE_FAIL,
    GET_ALL_DONATION_REQUEST,
    GET_ALL_DONATION_SUCCESS,
    GET_ALL_DONATION_FAIL,
    DONATION_DELETE_REQUEST,
    DONATION_DELETE_SUCCESS,
    DONATION_DELETE_FAIL,
    CLEAR_MESSAGE
} from '../constants'

export const createDonation = (payload) => async dispatch => {
    try {
        dispatch({ type: DONATION_CREATE_REQUEST })
        const { data } = await api.post('/donation', payload);
        dispatch({ type: DONATION_CREATE_SUCCESS, payload: data });
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: DONATION_CREATE_FAIL, payload: err?.response?.data?.message })
    }
}

export const getAllDonations = () => async dispatch => {
    try {
        dispatch({ type: GET_ALL_DONATION_REQUEST })
        const { data } = await api.get('/donation');
        dispatch({ type: GET_ALL_DONATION_SUCCESS, payload: data });
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: GET_ALL_DONATION_FAIL, payload: err?.response?.data?.message })
    }
}

export const deleteDonation = (id, setShowModal) => async dispatch => {
    try {
        dispatch({ type: DONATION_DELETE_REQUEST })
        const { data } = await api.delete(`/donation/${id}`);
        dispatch({ type: DONATION_DELETE_SUCCESS, payload: { ...data, id } });
        setShowModal(false);
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: DONATION_DELETE_FAIL, payload: err?.response?.data?.message })
    }
}

export const clearMessage = () => async dispatch => {
    dispatch({ type: CLEAR_MESSAGE })
}