import { useState } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';

import './ConfirmRemoveFriendModal.css';

function RemoveFriendContent({ onClose, friend, friends, setFriends }) {
	const sessionUser = useSelector((state) => state.session.user);

	const handleDelete = (e) => {
		e.preventDefault();

		const remove = async () => {
			const response = await csrfFetch('/api/friends', {
				method: 'DELETE',
				body: JSON.stringify({
					id: friend.id,
				}),
			});
			const data = await response.json();
			setFriends(friends.filter((f) => f.id !== friend.id));
			onClose();
		};

		remove();
	};

	return (
		<div className="confirm-remove-friend-modal">
			<h2>{`Remove '${friend?.friend?.username}'`}</h2>
			<h4>{`Are you sure you want to remove ${friend?.friend?.username} from your friends list?`}</h4>
			<button className="btn red" onClick={handleDelete}>
				Remove Friend
			</button>
			<button className="btn" onClick={() => onClose()}>
				Cancel
			</button>
		</div>
	);
}

export default RemoveFriendContent;
