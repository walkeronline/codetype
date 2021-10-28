import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
import { io } from 'socket.io-client';
import { csrfFetch } from '../../store/csrf';
import crypto from 'crypto';

import './MessagesPage.css';

let socket;

function MessagesPage() {
	const sessionUser = useSelector((state) => state.session.user);
	const { friendId } = useParams();

	const [friend, setFriend] = useState(null);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [roomId, setRoomId] = useState(null);

	useEffect(() => {
		const div = document.getElementById('message-list');
		div.scrollTo(0, div.scrollHeight * 2);
	}, []);

	useEffect(() => {
		setRoomId(getRoomId(sessionUser?.id, friendId));
	}, [sessionUser, friendId]);

	useEffect(() => {
		socket = io();

		socket.emit('joinRoom', roomId);

		socket.on('incoming', (msg) => {
			setMessages([...messages, msg]);
			// console.log(msg);
		});

		return () => {
			socket.emit('leaveRoom', roomId);
			return socket.close();
		};
	}, [messages, roomId]);

	useEffect(() => {
		const div = document.getElementById('message-list');
		div.scrollTo(0, div.scrollHeight * 2);
	}, [messages]);

	useEffect(() => {
		(async () => {
			// console.log(sessionUser.id, friendId);
			const temp = await fetch(`/api/messages/${sessionUser.id}/${friendId}`);
			const data = await temp.json();
			const tempFriend = await fetch(`/api/users/${friendId}`);
			const friendData = await tempFriend.json();
			setMessages(data);
			setFriend(friendData);
		})();
	}, [friendId, sessionUser.id]);

	function getRoomId(userId, friendId) {
		const min = Math.min(userId, friendId);
		const max = Math.max(userId, friendId);
		let toHash = `${min}${max}`;
		return crypto.createHash('sha256').update(toHash).digest('hex');
	}

	function sendMessage(e) {
		e.preventDefault();
		const input = e.target.children[0];

		console.log(message.length);

		if (!message) {
			input.className = 'error';
			return (input.placeholder = 'Please enter a message');
		}

		if (message.length > 255) {
			input.className = 'error';
			input.value = '';
			const temp = message;

			input.placeholder = 'Message must be less than 255 characters';

			input.disabled = true;

			return setTimeout(() => {
				input.value = temp;
				input.className = '';
				input.disabled = false;
				input.placeholder = 'Type here';
			}, 1500);
		}

		const payload = {
			user: { ...sessionUser },
			friendId,
			message,
			roomId,
		};

		socket.emit('msg', payload);
		setMessage('');
		e.target.children[0].className = '';
		e.target.children[0].placeholder = 'Type here';
	}

	function getClass(msg) {
		if (msg.userM.id === sessionUser.id) {
			return 'to';
		}
		return 'from';
	}

	function getLastMessageFromUser() {
		const sortedMessages = [...messages].sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);
		const lastMessage = sortedMessages.find((x) => x.userId === sessionUser.id);
		return lastMessage;
	}

	function getTime(msg, bypass = false) {
		const now = new Date(Date.now()).getTime();
		const messageDate = new Date(msg?.createdAt).getTime();
		const lastMessageTime = new Date(
			getLastMessageFromUser()?.createdAt
		).getTime();
		// if (!bypass) {
		// 	if (
		// 		lastMessageTime - messageDate < 300000 &&
		// 		(messages[messages.length - 1].userId === sessionUser.id ||
		// 			messages[messages.length - 1].friendId === sessionUser.id)
		// 	) {
		// 		return '';
		// 	}
		// }
		// if (now - messageDate < 60000) {
		// 	return '';
		// }
		if (now - messageDate < 86400000) {
			return new Date(msg?.createdAt).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});
		}
	}

	return (
		<>
			{/* <h2>{`Messages with user ${friendId}`}</h2> */}
			<div className="messages-container">
				<div className="friend-info-container">
					<Link to={`/users/${friend?.id}`}>
						<img
							className="friend-chat-picture"
							src={
								'https://lh3.googleusercontent.com/Q3TExTusD0FdRQL-Y_sobhGB09x-Bw-kMsSsd2Y1RpXu91XMbyAxNqBgPFWEEWlVYhvR5xTKHGP3CvhLjiwgyE-cr-w_p42M54W55w=w600'
							}
							alt={`${friend?.username}'s profile`}
						/>
					</Link>
					<h4>{friend?.username}</h4>
				</div>
				<ul id="message-list">
					{messages &&
						messages.map((msg, idx) => (
							<li className={getClass(msg)} key={idx} id={idx}>
								{/* <h4>
									{getClass(msg) === 'to'
										? ''
										: getTime(msg) && msg.userM.username}
								</h4> */}
								<div className={`message-body ${getClass(msg)}`}>
									{msg.message}
								</div>
								<div className="message-time">
									{getTime(msg)
										? getTime(msg)
										: idx === messages.length - 1
										? getTime(msg, true)
										: ''}
								</div>
							</li>
						))}
				</ul>
				<form className="message-input-box" onSubmit={sendMessage}>
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Type here"
					></input>
					<button type="submit">
						<i className="fas fa-arrow-up fa-2x"></i>
					</button>
				</form>
			</div>
		</>
	);
}

export default MessagesPage;
