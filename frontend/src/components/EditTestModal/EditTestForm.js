import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import { Redirect, useHistory } from 'react-router';
import { editTest } from '../../store/test';

import './EditTestForm.css';

function EditTestForm({ test, onClose, convertStr }) {
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const id = test?.id;
	const [title, setTitle] = useState(test.title);
	const [body, setBody] = useState(test.body);
	const [language, setLanguage] = useState(test.language);
	const [charCount, setCharCount] = useState(test.charCount);
	const [errors, setErrors] = useState([]);

	const updateBody = (e) => {
		setBody(e.target.value);
		setCharCount(body.length);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		// const edit = async ({ id, title, body, language, charCount }) => {
		// const response = await csrfFetch('/api/tests', {
		// 	method: 'PUT',
		// 	body: JSON.stringify({
		// 		id,
		// 		title,
		// 		body,
		// 		language,
		// 		charCount,
		// 	}),
		// });
		// const data = await response.json();
		// if (data?.errors) return setErrors(data.errors);
		// onClose();
		// console.log(window.location.href);
		// // if (
		// // 	window.location.href.split('/')[
		// // 		window.location.href.split('/').length - 1
		// // 	]
		// // )
		// window.location.reload();
		// return history.push(`/test/${data.id}`);
		// };

		// const data = edit({
		// 	id,
		// 	title,
		// 	body,
		// 	language,
		// 	charCount,
		// });
		await dispatch(editTest({ id, title, body, language, charCount }));
		onClose();

		// return data;
	};

	return (
		<div className="edit-test-form modal">
			<h2>Edit Test</h2>
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
					<textarea
						className="code-input"
						value={body}
						onChange={updateBody}
						required
					/>
				</label>
				<button className="btn" type="submit">
					Save
				</button>
			</form>
		</div>
	);
}

export default EditTestForm;
