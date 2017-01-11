import React from 'react';
import { Layout } from 'antd';

const Error = ({ message, ...props }) => (
	<Layout>
		<Layout.Content {...props}>{message}</Layout.Content>
		<Layout.Footer>&copy;[Company] copyright</Layout.Footer>
	</Layout>
);

export default Error;
export const makeError = (message, props = {}) => () => <Error {...props} message={message}/>;