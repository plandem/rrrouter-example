import { navigate } from 'rrrouter-redux';
import * as auth from 'rrrouter-redux-auth';
import { error } from '../error';
import Api from '../../common/api';

const token = 'auth-token';
const api = new Api({ prefix: 'http://localhost:8989', cookieToken: token, headerToken: token, credentials: null, mode: 'no-cors' });

const getCurrentUser = (silent = false) => (dispatch) => {
	dispatch(auth.request());

	return api.request('/auth/user')
		.then((response) => Promise.all([
			dispatch(auth.receive(response.user)),
			dispatch(navigate('/')),
		]))
		.catch(e => silent
			? dispatch(logout())
			: Promise.all([ dispatch(error(e)), dispatch(logout()),
		]));
};

export const login = (username, password) => (dispatch) => {
	return api.request('/auth/login', 'POST', { username, password })
		.then(() => dispatch(getCurrentUser()))
		.catch(e => Promise.all([
			dispatch(error(e)),
			dispatch(logout())
		]));
};

export const logout = () => (dispatch) => {
	return Promise.all([
		dispatch(auth.reset()),
		dispatch(navigate('/'))
	]);
};

/**
 * in real app it must request current user only in case if there is no session token (e.g. accessToken of OAuth2).
 * this version always fails, because 'getCurrentUser' will not return any identity at start
 */
export const init = () => (dispatch) => {
	dispatch(getCurrentUser(true));
};