import { useState } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import './AddFriendForm.css';

function AddFriendForm({ onClose, friends, setFriends }) {
	const sessionUser = useSelector((state) => state.session.user);

	const [username, setUsername] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const add = async ({ id, username }) => {
			const response = await csrfFetch('/api/friends', {
				method: 'POST',
				body: JSON.stringify({
					id,
					username,
				}),
			}).catch(() => setErrors(["That user doesn't exist"]));
			const data = await response?.json();
			if (data?.friends) {
				setFriends(data.friends);
				onClose();
			}
			if (data?.errors) {
				setErrors(data.errors);
			}
			return data;
		};

		if (friends.find((f) => f.friend.username === username)) {
			return setErrors([`${username} is already your friend`]);
		}
		if (sessionUser.username === username) {
			return setErrors(["You can't add yourself"]);
		}
		return add({ id: sessionUser?.id, username: username });
	};

	return (
		<div className="add-friend-form modal">
			<h2>Add a Friend</h2>
			<form id="xyz" onSubmit={handleSubmit}>
				<ul className="errors-list">
					{errors.map((error, idx) => (
						<li className="error-text" key={idx}>
							{error}
						</li>
					))}
				</ul>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						defaultValue="hi"
						required
					/>
				</label>
				<button className="btn" type="submit">
					Add Friend
				</button>
			</form>
		</div>
	);
}

export default AddFriendForm;
