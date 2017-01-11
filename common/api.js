import 'whatwg-fetch';
import Path from 'path-parser';
import Cookies from 'js-cookie';

class Api {
	/**
	 * @param prefix to prepend any url
	 * @param headers to use by default
	 * @param cookieToken name of cookie that holds session token
	 * @param headerToken name of header that will hold session token for request
	 * @param credentials type of credentials: 'omit', 'same-origin', 'include'
	 * @param mode that will be used for cross-domain request: 'same-origin', 'no-cors', 'cors'
	 */
	constructor({ prefix = '', headers = {}, cookieToken, headerToken, credentials = 'same-origin', mode }) {
		this.cookieToken = cookieToken;
		this.headerToken = headerToken;
		this.credentials = credentials;
		this.prefix = prefix;
		this.headers = headers;
		this.mode = mode;
	}

	/**
	 * request remote server
	 * @param url to request. It can be pattern, e.g.: /api/user/:id
	 * @param method to use.
	 * @param params to use to request url. will be used to build url to request and as body part
	 * @param headers additional headers to use. will be merged with default headers.
	 * @returns {Promise}
	 */
	request = (url, method = 'GET', params = {}, headers = {}) => {
		headers = { ...this.headers, ...headers };

		//auto attach token to headers if both (cookie and header) tokens were provided
		if(this.cookieToken && this.headerToken) {
			const token = Cookies.get(this.cookieToken);
			if(token) {
				headers[this.headerToken] = Cookies.get(this.cookieToken);
			}
		}

		const settings = {
			method,
			headers,
		};

		if(this.credentials) {
			settings.credentials = this.credentials;
		}

		if(method != 'GET' && method != 'HEAD') {
			const type = headers['Content-Type'] ? headers['Content-Type'] : '';
			if(type.indexOf('x-www-form-urlencoded') !== -1) {
				settings.body = Object.keys(params).reduce((result, next) => (result + '&' + encodeURIComponent(next) + '=' + encodeURIComponent(params[next])), '');
			} else {
				settings.body = JSON.stringify(params)
			}
		}

		const path = new Path(url);
		return fetch(this.prefix + path.build(params), settings).then(this.checkStatus).then(this.parseResponse);
	};

	/**
	 * check response for valid http code
	 * @param response
	 * @returns {*}
	 */
	checkStatus = (response) => {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			const error = new Error(response.statusText);
			error.response = response;
			throw error
		}
	};

	/**
	 * parse response and return valid promise
	 * @param response
	 * @returns {*}
	 */
	parseResponse = (response) => {
		return response.headers.get("content-type") ? response.json() : null;
	};
}

export default Api;