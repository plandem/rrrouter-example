import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import Router from 'rrrouter';

import Main from '../layout/main';
import Login from '../layout/login';
import { makeError } from '../layout/error';

const NotFound = makeError("Not found");

class App extends React.Component {
	componentWillReceiveProps(nextProps) {
		if(nextProps.error && nextProps.error != this.props.error) {
			message.error(nextProps.error.message);
		}
	}

	render() {
		return (
			<Router>
				<Router.Match path="/" handler={Main}/>
				<Router.Match path="/login" handler={Login}/>
				<Router.Miss handler={NotFound}/>
			</Router>
		);
	}
}

export default connect(({ error }) => ({ error }))(App);