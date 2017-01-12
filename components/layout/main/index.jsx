import React from 'react';
import Router from 'rrrouter';
import Panel from '../../panel';

const Main = (props) => (
	<Panel title="Main page">
		<ul>
			<li><Router.Link to="/links">Links</Router.Link></li>
			<li><Router.Link to="/relative">Relative router</Router.Link></li>
			<li><Router.Link to="/404">Unknown routes</Router.Link></li>
		</ul>
	</Panel>
);

export default Main;