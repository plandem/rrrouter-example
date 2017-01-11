import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashHistory } from 'rrrouter';
import { Provider as RouteProvider } from 'rrrouter-redux';
import configureStore from './redux/configureStore';
import { init } from './redux/api';
import App from './components/app';

const history = new HashHistory();
const location = window.location.href;
const store = configureStore({ history, location });

store.dispatch(init());

ReactDOM.render(
	<Provider store={store}>
		<RouteProvider stateKey='router'>
			<App/>
		</RouteProvider>
	</Provider>,
	document.getElementById('root')
);