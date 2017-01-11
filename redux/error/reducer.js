import { ERROR_THROW, ERROR_RESET } from './actions';

const initialState = {
	message: null,
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		case ERROR_THROW:
			return { ...state, message: action.error.toString() };

		case ERROR_RESET:
			return { ...initialState };

		default:
			return state;
	}
};