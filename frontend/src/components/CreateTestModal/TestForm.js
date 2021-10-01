import { useState } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf.js';
import { Redirect, useHistory } from 'react-router';

import './TestForm.css';

function TestForm({ onClose }) {
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
			}).catch(async (res) => {
				const d = await res.json();
				if (d && d.errors) setErrors(d.errors);
			});
			const data = await response?.json();
			if (data?.errors) return setErrors(data.errors);
			if (data?.id) {
				onClose();
				return history.push(`/test/${data.id}`);
			}
		};

		const data = submit({
			userId: sessionUser.id,
			title,
			body,
			language,
			charCount,
		});

		if (data.errors) {
			console.log(data.errors);
			setErrors(data.errors);
		}

		return data;
	};

	return (
		<div className="test-form modal">
			<h1>Create Test</h1>
			<form onSubmit={handleSubmit}>
				<ul className="errors-list">
					{errors.map((error, idx) => (
						<li className="error-text" key={idx}>
							{error}
						</li>
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
					<textarea
						className="code-input"
						value={body}
						onChange={updateBody}
						required
					/>
				</label>
				<button className="btn" type="submit btn">
					Create
				</button>
			</form>
		</div>
	);
}

export default TestForm;
