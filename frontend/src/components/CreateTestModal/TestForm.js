import { useState } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf.js';
import { Redirect, useHistory } from 'react-router';

import './TestForm.css';

function TestForm() {
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	// CHANGE WHEN MORE THAN ONE LANGUAGE SUPPORTED
	const [language, setLanguage] = useState('JavaScript');
	const [charCount, setCharCount] = useState(0);
	const [errors, setErrors] = useState([]);

	const updateBody = (e) => {
		setBody(e.target.value);
		setCharCount(body.length);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		const submit = async ({ userId, title, body, language, charCount }) => {
			const response = await csrfFetch('/api/tests', {
				method: 'POST',
				body: JSON.stringify({
					userId,
					title,
					body,
					language,
					charCount,
				}),
			});
			const data = await response.json();
			if (data?.errors) return setErrors(data.errors);
			return history.push(`/tests/${data.id}`);
		};

		const data = submit({
			userId: sessionUser.id,
			title,
			body,
			language,
			charCount,
		});

		return data;
	};

	return (
		<div className="test-form modal">
			<h1>Create Test</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Title
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</label>
				<label>
					Body
					<input type="textarea" value={body} onChange={updateBody} required />
				</label>
				<button className="btn" type="submit btn">
					Create
				</button>
			</form>
		</div>
	);
}

export default TestForm;
