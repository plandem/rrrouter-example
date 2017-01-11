import { BLOCK, UNBLOCK } from './actions';

const initialState = { };

export default function loading(state = initialState, action) {
	switch (action.type) {
		case BLOCK:
			return { ...state, [action.name]: true };

		case UNBLOCK:
			return { ...state, [action.name]: false };

		default:
			return state;
	}
};