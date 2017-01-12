import React from 'react';
import Router from 'rrrouter';

import Main from '../layout/main';
import Links from '../links';
import Panel from '../panel';

import NotFound from '../404';
import Relative from '../relative';

const AbsoluteGlobal404 = <Panel title="[Global] Not found - absolute">Unknown route</Panel>;

/*
const

	<a href={"#aaa?id=" + Math.random() * 100}>dynamic #url</a><br/>
<a onClick={() => this.props.router.navigate("#bbbb")}>navigate, props router #url</a><br/>
<a href="#aaa">static #url</a><br/>
<br/>
<a href={"/aaa?id=" + Math.random() * 100}>dynamic /aaa?id=xxx</a><br/>
		<a onClick={() => this.props.router.navigate('/bbb')}>navigate, props router /bbb</a><br/>
<a href="/aaa">static /aaa</a><br/>
<a href="/ccc">static miss route /ccc</a><br/>

<br/>
<Router.Link to="/aaa">Link /aaa</Router.Link><br/>
	<Router.Link to="/aaa/:id" params={{ id: 1 }}>Link /aaa/1</Router.Link><br/>
<Router.Link to="/ccc">Miss Link /ccc</Router.Link><br/>

<a onClick={() => this.props.router.back()}>back</a><br/>
<a onClick={() => this.props.router.forward()}>forward</a><br/>

<hr/>
<Router.Match path="/aaa" handler={EmptyContainer}/>
	<Router.Match path="/bbb" handler={this._match0}/>
<Router.Match path="/aaa/:id" handler={this._match1}/>
<Router.Match path="/aaa?:id" handler={this._match2}/>
<Router.Miss handler={this._matchMiss}/>
<hr/>

<Router>
<Router.Link to="/aaa">absolute router Link /aaa</Router.Link><br/>
</Router>


<Router.Match path="/aaa" handler={() =>
<Router relative>
	<Router.Link to="/bbb">relative router Link /aaa/bbb</Router.Link><br/>
</Router>

*/

const App = () => (
	<Router>
		<Router.Match path="/" handler={Main}/>
		<Router.Match path="/links" handler={Links}/>
		<Router.Match path="/relative(/*)" handler={Relative}/>
		<Router.Match path="/404(/*)" handler={NotFound}/>
		<Router.Miss handler={AbsoluteGlobal404}/>
	</Router>
);

export default App;