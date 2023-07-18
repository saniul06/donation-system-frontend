import {
    DONATION_CREATE_REQUEST,
    DONATION_CREATE_SUCCESS,
    DONATION_CREATE_FAIL,
    CLEAR_MESSAGE
} from '../constants'


export const donationReducer = (state = {}, action) => {
    switch (action.type) {
        case DONATION_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DONATION_CREATE_SUCCESS:
            const { message, createdDonation } = action.payload;
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