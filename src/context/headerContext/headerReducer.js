import { UPDATE_HEADER, DROPDOWN_HEADER } from '../types';

export default (state, action) => {
    switch (action.type){
        case UPDATE_HEADER:
            return {
                ...state,
                team: action.payload
            }

        case DROPDOWN_HEADER:
            return {
                ...state,
                teams: action.payload
            }
        default:
            return state
    }
}