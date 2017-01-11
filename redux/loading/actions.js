export const ACTION_PREFIX = '@@loading';
export const BLOCK = `${ACTION_PREFIX}/block`;
export const UNBLOCK = `${ACTION_PREFIX}/unblock`;

const blockAction = (name) => {
	return {
		type: BLOCK,
		name,
	}
};

const unblockAction = (name) => {
	return {
		type: UNBLOCK,
		name,
	}
};

export const blockingAction = (action, ...args) => (dispatch) => (name) => {
	return Promise.all([
		dispatch(blockAction(name)),
		action(...args),
	]).then(
		response => { dispatch(unblockAction(name)); return response; },
		error => { dispatch(unblockAction(name)); return error; }
	);
};
