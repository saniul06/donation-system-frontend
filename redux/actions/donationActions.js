import api from '../api';
import {
    DONATION_CREATE_REQUEST,
    DONATION_CREATE_SUCCESS,
    DONATION_CREATE_FAIL,
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

export const clearMessage = () => async dispatch => {
    dispatch({ type: CLEAR_MESSAGE })
}