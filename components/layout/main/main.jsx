import React from 'react';
import Router from 'rrrouter';

export default (props) => (
	<div>
		<h3>Main</h3>
		<Router.Link to="/user">Link with route: /user</Router.Link>
		<Router.Link onClick={()=>console.log(this.props)}/>
	</div>
);