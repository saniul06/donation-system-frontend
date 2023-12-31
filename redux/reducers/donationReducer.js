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
    SELECT_DONATION,
    LOAD_MORE_ALL_DONATION,
    LOAD_MORE_MY_DONATION,
    CATEGORY_FILTER_ALL_DONATION,
    CATEGORY_FILTER_MY_DONATION,
    CLEAR_MESSAGE,
    CLEAR_DONATION_STATE
} from '../constants'

const initialState = { donationList: [], myDonationList: [], selectedDonation: {} };


export const donationReducer = (state = initialState, action) => {
    const { message,
        createdDonation,
        donationList,
        myDonationList,
        id,
        selectedDonation,
        updatedDonation,
        allDonationLastId,
        myDonationLastId,
        allDonationCategory,
        myDonationCategory,
        donationSummary,
        loadMore
    } = action.payload || [];
    switch (action.type) {
        case DONATION_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DONATION_CREATE_SUCCESS:
            const { userId } = action.payload;
            if (userId) {
                state.myDonationList = [createdDonation, ...state.myDonationList];
                state.donationList = [createdDonation, ...state.donationList];
            }
            return {
                ...state,
                loading: false,
                success: message,
                createdDonation,
                donationList: [...state.donationList],
                myDonationList: [...state.myDonationList]
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
            let list = [];
            if (loadMore) list = [...state.donationList, ...donationList]
            else list = [...donationList]
            return {
                ...state,
                loading: false,
                donationList: list,
                donationListLength: donationList.length === 10
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
            let myList = [];
            if (loadMore) myList = [...state.myDonationList, ...myDonationList]
            else myList = [...myDonationList]
            return {
                ...state,
                loading: false,
                myDonationList: myList,
                myDonationListLength: myDonationList.length === 10
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

        case DONATION_SUMMARY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DONATION_SUMMARY_SUCCESS:
            return {
                ...state,
                loading: false,
                donationSummary
            }
        case DONATION_SUMMARY_FAIL:
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

        case CATEGORY_FILTER_ALL_DONATION:
            return {
                ...state,
                allDonationCategory
            }

        case CATEGORY_FILTER_MY_DONATION:
            return {
                ...state,
                myDonationCategory
            }

        case CLEAR_MESSAGE:
            return {
                ...state,
                error: null,
                success: null
            }

        case CLEAR_DONATION_STATE:
            return initialState;

        default:
            return state
    }
}