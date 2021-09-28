import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Friends.css';

function Friends() {
	const sessionUser = useSelector((state) => state.session.user);

	const [friends, setFriends] = useState([]);

	const checkProfile = (friend) => {
		return friend?.friend?.imageUrl
			? friend.friend.imageUrl
			: 'https://lh3.googleusercontent.com/Q3TExTusD0FdRQL-Y_sobhGB09x-Bw-kMsSsd2Y1RpXu91XMbyAxNqBgPFWEEWlVYhvR5xTKHGP3CvhLjiwgyE-cr-w_p42M54W55w=w600';
	};

	useEffect(() => {
		async function getFriends() {
			const response = await fetch(`/api/friends/${sessionUser?.id}`);
			const data = await response.json();
			setFriends(data);
		}
		getFriends();
	}, [sessionUser]);

	return (
		<div className="friends-container">
			<div className="friends-header">
				<h2 className="friends-list-header">Friends List</h2>
				<i className="fas fa-plus"></i>
			</div>
			<div className="friends-list">
				{friends.length &&
					friends.map((friend) => (
						<div className="friend-info">
							<Link className="friend-name" to={`/users/${friend?.id}`}>
								<img
									className="friend-image"
									src={checkProfile(friend)}
									alt={`${friend?.friend?.username}'s profile`}
								/>
								<h3 className="friend-username">{friend?.friend?.username}</h3>
							</Link>
						</div>
					))}
			</div>
		</div>
	);
}

export default Friends;
