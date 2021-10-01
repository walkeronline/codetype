import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

function LoginForm() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

	const handleDemo = (e) => {
		e.preventDefault();
		return dispatch(
			sessionActions.login({ credential: 'demo', password: 'password' })
		);
	};

	return (
		<>
			<h1>Log In</h1>
			<form className="log-in-form" onSubmit={handleSubmit}>
				<ul className="errors-list">
					{errors.map((error, idx) => (
						<li className="error-text" key={idx}>
							{error}
						</li>
					))}
				</ul>
				<label>
					Username or Email
					<input
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<button className="btn" type="submit">
					Log In
				</button>
			</form>
			<button onClick={handleDemo} className="btn">
				Demo
			</button>
		</>
	);
}

export default LoginForm;
