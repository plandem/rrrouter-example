import React from 'react';
import { connect } from 'react-redux';
import { Row, Form, Input, Button } from 'antd';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import { login } from '../../../redux/api';
import { blockingAction } from '../../../redux/loading';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			hasErrors: false
		};

		this.validateIdentity = (username, password) => props.blockingAction(props.login, username, password)('isValidating');
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { username, password } = this.state;

		this.validateIdentity(username, password).catch(() => {
			this.setState({
				hasErrors: true
			});
		});
	};

	onEnterHeaderAnimation = (e) => {
		switch(e.key) {
			case 'title': return { opacity: 1, duration: 300, repeat: 0, translateY: 0 };
			case 'subtitle': return { opacity: 1, duration: 300, repeat: 0, translateX: 0 };
		}
	};

	onChangeIdentity(changes) {
		this.setState({
			...changes,
			hasErrors: false
		});
	};

	renderForm() {
		const { hasErrors, username, password } = this.state;
		const { loading: { isValidating } } = this.props;
		const validateProps = hasErrors && !isValidating ? {
				help: 'Wrong login or password.',
				validateStatus: "error"
			} : {};

		return (
			<div className="layout-main">
				<header className="layout-header">
					<Row type="flex" justify="center" align="middle">
						<div>
							<TweenOne animation={[{ opacity: 1, duration: 300, repeat: 0, scale: 1.2 }, { duration: 200, repeat: 0, scale: 1 }]} style={{ opacity: 0, transform: 'perspective(100px) scale(0.1)' }}>
								<div className="layout-logo">
									Logo
								</div>
							</TweenOne>
						</div>
						<div className="layout-title">
							<TweenOneGroup enter={this.onEnterHeaderAnimation}>
								<div key="title" style={{ opacity: 0, transform: 'translateY(-15px)' }}><p className="title">[Company]</p></div>
								<div key="subtitle" style={{ opacity: 0, transform: 'translateX(15px)' }}><p className="subtitle">Admin Panel</p></div>
							</TweenOneGroup>
						</div>
					</Row>
				</header>
				<div className="layout-container">
					<p className="welcome">Login with your [Company] account</p>
					<Form horizontal onSubmit={this.handleSubmit}>
						<Form.Item {...validateProps}>
							<Input type="text" value={username} placeholder="E-mail" onChange={(e) => this.onChangeIdentity({ username: e.target.value })} />
						</Form.Item>
						<Form.Item validateStatus={validateProps.validateStatus}>
							<Input type="password" value={password} placeholder="Password" onChange={(e) => this.onChangeIdentity({ password: e.target.value })} />
						</Form.Item>
						<Form.Item className="layout-footer">
							<Button type="primary" htmlType="submit" loading={isValidating} size="large">Login to your account</Button><br/>
							<p>Forgot your password?</p>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}

	renderLoading() {
		return (
			<div className="layout-loading">
				<TweenOne animation={[{ opacity: 1, duration: 1000, repeat: -1, rotateY: 180}, { duration: 1500, repeat: -1, rotateY: 360 }]} style={{ transform: 'perspective(100px)' }}>
					<div className="layout-logo">[Logo]</div>
				</TweenOne>
			</div>
		)
	}

	render() {
		const { auth: { requesting } } = this.props;

		return (
			<div className="layout-login">
				{ requesting ? this.renderLoading() : this.renderForm() }
			</div>
		)
	}
}

export default connect(({ auth, loading }) =>({ auth, loading }), { login, blockingAction })(LoginPage);