import React from 'react';
import Router from 'rrrouter';
import Panel from '../panel';

const AbsoluteLocal404 = <Panel title="[Local] Not found - absolute">Unknown route</Panel>;

const NotFound = (props) => (
	<div>
		<Panel title="Not found routes">
			<ul>
				<li><Router.Link to="/404-global">Global 404 - absolute router</Router.Link></li>
				<li><Router.Link to="/404/absolute">Local 404 - absolute router</Router.Link></li>
				<li><Router.Link to="/relative/404-relative">Local 404 - relative router</Router.Link></li>
			</ul>
		</Panel>
		<Router.Match path="/404/absolute" handler={AbsoluteLocal404}/>
	</div>
);

export default NotFound;