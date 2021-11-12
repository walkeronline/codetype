import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import AddFriendModal from '../AddFriendModal';

import ConfirmRemoveFriendModal from '../ConfirmRemoveFriendModal';
import MessagesPage from '../MessagesPage';

import './Friends.css';

let socket;

function Friends() {
	const sessionUser = useSelector((state) => state.session.user);

	const [friends, setFriends] = useState(null);
	const [showMenu, setShowMenu] = useState(false);
	const [showMessages, setShowMessages] = useState(false);
	const [currentMessage, setCurrentMessage] = useState(null);
	const [statusChanges, setStatusChanges] = useState([]);

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

	useEffect(() => {
		window.onbeforeunload = (e) => {
			socket.emit('log-out', sessionUser);
		};
	}, [sessionUser]);

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
		const removeButton = document.querySelector(`#b-${id}`);
		if (removeButton) {
			removeButton.style.visibility = type === 0 ? 'visible' : 'hidden';
		}
	};

	const getFriend = (friend) => {
		if (+friend?.friend?.id === +sessionUser.id) {
			return friend?.user;
		}
		return friend?.friend;
	};

	useEffect(() => {
		async function getFriends() {
			const response = await fetch(`/api/friends/${sessionUser?.id}`);
			const data = await response.json();
			setFriends(data);
		}
		getFriends();
	}, [sessionUser, statusChanges]);

	useEffect(() => {
		socket = io();

		socket.on('new-log-in', (user) => {
			setStatusChanges([...statusChanges, user]);
		});
		socket.on('new-log-out', (user) => {
			setStatusChanges([...statusChanges, user]);
		});
		return () => {
			return socket.close();
		};
	}, [sessionUser, statusChanges]);

	function getId(friend) {
		if (+friend.friendId === +sessionUser.id) {
			return friend.userId;
		}
		return friend.friendId;
	}

	function insertMessages(friendId, friend) {
		const messagesComponent = (
			<MessagesPage
				friendId={friendId}
				showMessages={showMessages}
				setShowMessages={setShowMessages}
			></MessagesPage>
		);
		setShowMessages(true);
		setCurrentMessage(messagesComponent);
		// const containerEle = document.querySelector('#message-box-container');
		// if (containerEle) {
		// 	console.log(messagesComponent, typeof messagesComponent);
		// 	// containerEle.appendChild(messagesComponent);
		// }
	}

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
					friends.map((friend, idx) => (
						<div
							className="custom-spacing"
							onMouseEnter={(e) => changeVis(getId(friend), 0)}
							onMouseLeave={(e) => changeVis(getId(friend), 1)}
							key={idx}
						>
							<div className="friend-info">
								<div
									className={`status ${
										getFriend(friend).online ? 'online' : 'offline'
									}`}
								></div>
								<Link className="friend-name" to={`/users/${getId(friend)}`}>
									<img
										className="friend-image"
										src={checkProfile(friend)}
										alt={`${friend?.username}'s profile`}
									/>
									<h3 className="friend-username">
										{getFriend(friend).username}
									</h3>
								</Link>
							</div>
							<div id={`b-${getId(friend)}`} className="action-buttons">
								<i
									className="far fa-comment-alt"
									onClick={() => {
										setShowMessages(true);
										insertMessages(getId(friend));
									}}
								></i>
								<ConfirmRemoveFriendModal
									friend={friend}
									setFriends={setFriends}
									friends={friends}
								/>
							</div>
						</div>
					))}
				<div id="message-box-container">{showMessages && currentMessage}</div>
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
