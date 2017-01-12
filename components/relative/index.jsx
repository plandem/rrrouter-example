import React from 'react';
import Router from 'rrrouter';
import Panel from '../panel';

const RelativeLocal404 = <Panel title="[Local] Not found - relative">Unknown route</Panel>;
const Content1 = <Panel title="Link1">some content for relative /link1</Panel>;
const Content2 = <Panel title="Link2">some content for relative /link2</Panel>;

const Index = (props) => (
	<Panel title="Content with relative links">
		<ul>
			<li><Router.Link to="/callback">Link to route with non-visual callback: /callback</Router.Link></li>
			<li><Router.Link to="/link1">Link to /link1</Router.Link></li>
			<li><Router.Link to="/link2">Link to /link2</Router.Link></li>
			<li><Router.Link to="/404">Unknown Link to /404</Router.Link></li>
		</ul>
	</Panel>
);

const RelativeContent = (props) => (
	<Router relative>
		<Router.Match path="/" handler={Index}/>
		<Router.Match path="/callback" handler={() => {
			console.log('Matched route with non visual handler');
			window.alert('Non visual route was matched!');
		}}/>
		<Router.Match path="/link1" handler={Content1}/>
		<Router.Match path="/link2" handler={Content2}/>
		<Router.Miss handler={RelativeLocal404}/>
	</Router>
);

export default RelativeContent;