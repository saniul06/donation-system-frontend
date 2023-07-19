import api from '../api';
import {
    DONATION_CREATE_REQUEST,
    DONATION_CREATE_SUCCESS,
    DONATION_CREATE_FAIL,
    GET_ALL_DONATION_REQUEST,
    GET_ALL_DONATION_SUCCESS,
    GET_ALL_DONATION_FAIL,
    MY_DONATION_REQUEST,
    MY_DONATION_SUCCESS,
    MY_DONATION_FAIL,
    DONATION_UPDATE_REQUEST,
    DONATION_UPDATE_SUCCESS,
    DONATION_UPDATE_FAIL,
    DONATION_DELETE_REQUEST,
    DONATION_DELETE_SUCCESS,
    DONATION_DELETE_FAIL,
    DONATION_SUMMARY_REQUEST,
    DONATION_SUMMARY_SUCCESS,
    DONATION_SUMMARY_FAIL,
    CLEAR_MESSAGE,
    SELECT_DONATION,
    LOAD_MORE_ALL_DONATION,
    LOAD_MORE_MY_DONATION
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

export const getAllDonations = (query) => async (dispatch) => {
    try {
        let queryString = '';
        for (const key in query) {
            if (query[key]) {
                queryString += `${key}=${query[key]}&`
            }
        }
        dispatch({ type: GET_ALL_DONATION_REQUEST })
        const { data } = await api.get(`/donation?${queryString}`);
        dispatch({ type: GET_ALL_DONATION_SUCCESS, payload: data });
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: GET_ALL_DONATION_FAIL, payload: err?.response?.data?.message })
    }
}

export const getDonationSummary = (query) => async (dispatch) => {
    try {
        let queryString = '';
        for (const key in query) {
            if (query[key]) {
                queryString += `${key}=${query[key]}&`
            }
        }
        dispatch({ type: DONATION_SUMMARY_REQUEST })
        const { data } = await api.get(`/donation/summary?${queryString}`);
        dispatch({ type: DONATION_SUMMARY_SUCCESS, payload: data });
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: DONATION_SUMMARY_FAIL, payload: err?.response?.data?.message })
    }
}

export const myDonations = (query) => async dispatch => {
    try {
        let queryString = '';
        for (const key in query) {
            if (query[key]) {
                queryString += `${key}=${query[key]}&`
            }
        }
        dispatch({ type: MY_DONATION_REQUEST })
        const { data } = await api.get(`/donation/me?${queryString}`);
        dispatch({ type: MY_DONATION_SUCCESS, payload: data });
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: MY_DONATION_FAIL, payload: err?.response?.data?.message })
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

export const updateDonation = (payload, setShowUpdateModal) => async dispatch => {
    try {
        const { id, ...rest } = payload;
        dispatch({ type: DONATION_UPDATE_REQUEST })
        const { data } = await api.patch(`/donation/${id}`, rest);
        dispatch({ type: DONATION_UPDATE_SUCCESS, payload: data });
        setShowUpdateModal(false);
    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: DONATION_UPDATE_FAIL, payload: err?.response?.data?.message })
    }
}

export const selectDonation = (donation) => async dispatch => {
    dispatch({ type: SELECT_DONATION, payload: { selectedDonation: donation } })
}

export const allDonationLoadMore = (lastId) => async dispatch => {
    console.log('ll: ', lastId)
    dispatch({ type: LOAD_MORE_ALL_DONATION, payload: { allDonationLastId: lastId } })
}

export const myDonationLoadMore = (lastId) => async dispatch => {
    dispatch({ type: LOAD_MORE_MY_DONATION, payload: { myDonationLastId: lastId } })
}

export const clearMessage = () => async dispatch => {
    dispatch({ type: CLEAR_MESSAGE })
}