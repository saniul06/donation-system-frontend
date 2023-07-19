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
    SELECT_DONATION,
    LOAD_MORE_ALL_DONATION,
    LOAD_MORE_MY_DONATION,
    CLEAR_MESSAGE
} from '../constants'


export const donationReducer = (state = { donationList: [], myDonationList: [], selectedDonation: {} }, action) => {
    const { message,
        createdDonation,
        donationList,
        myDonationList,
        id,
        selectedDonation,
        updatedDonation,
        allDonationLastId,
        myDonationLastId
    } = action.payload || [];
    switch (action.type) {
        case DONATION_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DONATION_CREATE_SUCCESS:

            return {
                ...state,
                loading: false,
                success: message,
                createdDonation
            }
        case DONATION_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_ALL_DONATION_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_DONATION_SUCCESS:
            return {
                ...state,
                loading: false,
                donationList: [...state.donationList, ...donationList],
                donationListLength: donationList.length
            }
        case GET_ALL_DONATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case MY_DONATION_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MY_DONATION_SUCCESS:
            return {
                ...state,
                loading: false,
                myDonationList: [...state.myDonationList, ...myDonationList],
                myDonationListLength: myDonationList.length
            }
        case MY_DONATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DONATION_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DONATION_UPDATE_SUCCESS:
            state.donationList.forEach(item => {
                if (item.id === updatedDonation.id) {
                    item.category = updatedDonation.category;
                    item.amount = updatedDonation.amount;
                }
            })
            return {
                ...state,
                loading: false,
                success: message,
                // donationList: state.donationList.filter(item => item.id !== id)
            }
        case DONATION_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DONATION_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DONATION_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: message,
                donationList: state.donationList.filter(item => item.id !== id)
            }
        case DONATION_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case SELECT_DONATION:
            return {
                ...state,
                selectedDonation
            }

        case LOAD_MORE_ALL_DONATION:
            return {
                ...state,
                allDonationLastId
            }

        case LOAD_MORE_MY_DONATION:
            return {
                ...state,
                myDonationLastId
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