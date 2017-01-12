import { applyMiddleware, createStore, compose } from 'redux';
import { createMiddleware, navigate } from 'rrrouter-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default function configureStore ({ history, location }) {
	const routerMiddleware = createMiddleware(history);

	const middleware = [thunk, routerMiddleware];

	const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);
	const store = createStore(
		rootReducer,
		compose(
			applyMiddleware(...middleware),
			devtools(),
		),
	);

	if(location) {
		store.dispatch(navigate(location));
	}

	return store;
}


