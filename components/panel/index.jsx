import './index.less';
import React from 'react';

const clsPrefix = 'panel';

const Panel = ({ title, children }) => (
	<div className={clsPrefix}>
		<h3 className={`${clsPrefix}-title`}>{title}</h3>
		<div className={`${clsPrefix}-content`}>{children}</div>
	</div>
);

export default Panel;