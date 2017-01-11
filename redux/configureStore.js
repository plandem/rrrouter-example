import { applyMiddleware, createStore, compose } from 'redux';
import { createMiddleware, navigate } from 'rrrouter-redux';
import thunk from 'redux-thunk';
import { createAuthMiddleware } from 'rrrouter-redux-auth';
import rootReducer from './rootReducer';

export default function configureStore ({ history, location }) {
	const routerMiddleware = createMiddleware(history);
	const authMiddleware = createAuthMiddleware();

	const middleware = [thunk, routerMiddleware, authMiddleware];

	const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);
	const store = createStore(
		rootReducer,
		compose(
			applyMiddleware(...middleware),
			devtools(),
		),
	);

	if(location) {
		//initialize state of 'router' with current location
		store.dispatch(navigate(window.location.href));
	}

	return store;
}


