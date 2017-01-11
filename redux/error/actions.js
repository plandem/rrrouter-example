export const ACTION_PREFIX = '@@error';
export const ERROR_THROW = `${ACTION_PREFIX}/throw`;
export const ERROR_RESET = `${ACTION_PREFIX}/reset`;

/**
 * reset current error
 */
export const reset = () => (dispatch) => {
	dispatch({
		type: ERROR_RESET
	});
};

/**
 * set current error
 */
export const error = (error) => (dispatch) => {
	dispatch({
		type: ERROR_THROW,
		error
	});
};
