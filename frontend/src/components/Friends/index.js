import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddFriendModal from '../AddFriendModal';

import ConfirmRemoveFriendModal from '../ConfirmRemoveFriendModal';

import './Friends.css';

function Friends() {
	const sessionUser = useSelector((state) => state.session.user);

	const [friends, setFriends] = useState(null);
	const [showMenu, setShowMenu] = useState(false);

	const checkProfile = (friend) => {
		return friend?.friend?.imageUrl
			? friend.friend.imageUrl
			: 'https://lh3.googleusercontent.com/Q3TExTusD0FdRQL-Y_sobhGB09x-Bw-kMsSsd2Y1RpXu91XMbyAxNqBgPFWEEWlVYhvR5xTKHGP3CvhLjiwgyE-cr-w_p42M54W55w=w600';
	};

	const getIcon = () => {
		if (showMenu) {
			return <i className="fas fa-sort-down"></i>;
		}
		return <i className="fas fa-sort-up"></i>;
	};

	const toggleMenu = () => {
		const friendsList = document.querySelector('.friends-container');
		const friendClass = friendsList.className;
		setShowMenu(!showMenu);

		if (friendClass.includes('opened')) {
			friendsList.className = 'friends-container closed';
		} else if (
			friendClass.includes('closed') ||
			friendClass.includes('start')
		) {
			friendsList.className = 'friends-container opened';
		} else {
			friendsList.className += ' opened';
		}
	};

	const changeVis = (id, type) => {
		const removeButton = document.querySelector(`#f-${id}`);
		if (removeButton) {
			removeButton.style.visibility = type === 0 ? 'visible' : 'hidden';
		}
	};

	const getFriend = (friend) => {
		if (friend?.friend?.username === sessionUser.username) {
			return friend?.user?.username;
		}
		return friend?.friend?.username;
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
		<div className="friends-container start">
			<div className="menu-expand" onClick={toggleMenu}>
				{getIcon()}
			</div>
			<div className="friends-header">
				<h2 className="friends-list-header">Friends List</h2>
				<AddFriendModal friends={friends} setFriends={setFriends} />
			</div>
			<div className="friends-list">
				{friends &&
					friends.map((friend) => (
						<div
							className="custom-spacing"
							onMouseEnter={(e) => changeVis(friend?.friend?.id, 0)}
							onMouseLeave={(e) => changeVis(friend?.friend?.id, 1)}
							key={friend.id}
						>
							<div className="friend-info">
								<Link
									className="friend-name"
									to={`/users/${friend?.friend?.id}`}
								>
									<img
										className="friend-image"
										src={checkProfile(friend)}
										alt={`${friend?.friend?.username}'s profile`}
									/>
									<h3 className="friend-username">{getFriend(friend)}</h3>
								</Link>
							</div>
							<ConfirmRemoveFriendModal
								friend={friend}
								setFriends={setFriends}
								friends={friends}
							/>
						</div>
					))}
			</div>
		</div>
	);
}

export default Friends;

// function niceLoop(arr) {
// 	let sum = 0;
// 	for (let i = 0; i < arr.length; i++) {
// 		sum += arr[i];
// 	}
// 	return;
// 	sum;
// }
