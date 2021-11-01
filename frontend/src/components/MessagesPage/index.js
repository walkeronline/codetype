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

function MessagesPage({ friendId, showMessages, setShowMessages }) {
	const sessionUser = useSelector((state) => state.session.user);

	const [friend, setFriend] = useState(null);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [roomId, setRoomId] = useState(null);
	const [isTyping, setIsTyping] = useState(false);
	const [typingString, setTypingString] = useState('');
	const [newMessage, setNewMessage] = useState('');

	useEffect(() => {
		if (message !== '') {
			setIsTyping(true);
		} else {
			setIsTyping(false);
		}
		console.log(isTyping);
	}, [isTyping, message]);

	useEffect(() => {
		const chats = document.getElementsByClassName('message-list');
		if (chats) {
			Array.from(chats).forEach((ele) => ele.scrollTo(0, ele.scrollHeight * 2));
		}
	}, [showMessages, friendId, setShowMessages, messages]);

	useEffect(() => {
		setRoomId(getRoomId(sessionUser?.id, friendId));
	}, [sessionUser, friendId]);

	useEffect(() => {
		const payload = {
			roomId,
			user: sessionUser,
		};
		if (isTyping) {
			socket?.emit('userTyping', payload);
			console.log('STARTED');
		} else {
			console.log('STOPPED');
			console.log(socket);
			socket?.emit('userStoppedTyping', payload);
		}
	}, [isTyping, roomId, sessionUser]);

	useEffect(() => {
		socket = io();

		socket.emit('joinRoom', roomId);

		socket.on('incoming', (msg) => {
			setMessages([...messages, msg]);
		});

		socket.on('showTyping', (payload) => {
			setTypingString(`${payload.username} is typing`);
		});

		socket.on('hideTyping', (payload) => {
			setTypingString('');
		});

		socket.on('msg-deleted', (msgId) => {
			const newMessages = messages.filter((msg) => msg.id !== msgId);
			setMessages(newMessages);
		});

		socket.on('msg-edited', (newMsg) => {
			const newMessages = messages.filter((msg) => msg.id !== newMsg.id);
			setMessages(newMessages);
		});

		return () => {
			socket.emit('leaveRoom', roomId);
			return socket.close();
		};
	}, [messages, roomId]);

	useEffect(() => {
		const div = document.getElementById('message-list');
		div?.scrollTo(0, div.scrollHeight * 2);
	}, [messages]);

	useEffect(() => {
		(async () => {
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

	function delMessage(e, msgId) {
		e.preventDefault();
		e.stopPropagation();
		if (socket) {
			socket.emit('del-msg', { msgId, roomId });
		}
	}

	// function editMessage(e, msgId) {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	if (socket) {
	// 		socket.emit('edit-msg', { msgId, roomId });
	// 	}
	// }

	// function editForm(msgId) {
	// 	const editBox = document.getElementById(`msg-${msgId}`);
	// 	const oldMessage = editBox.innerText;
	// 	const form = (
	// 		<form onSubmit={(e) => editMessage(e, msgId)}>
	// 			<input
	// 				type="text"
	// 				value={oldMessage}
	// 				onChange={(e) => setNewMessage(e.target.value)}
	// 			></input>
	// 		</form>
	// 	);
	// }

	function sendMessage(e) {
		e.preventDefault();
		const input = e.target.children[0];

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
		setIsTyping(false);
		setTypingString('');
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
		if (now - messageDate < 86400000) {
			return new Date(msg?.createdAt).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});
		}
		return getNumDaysPassed(msg?.updatedAt);
	}

	function getNumDaysPassed(date) {
		const now = new Date(Date.now()).getTime();
		const tempDate = new Date(date).getTime();
		const timeDiff = now - tempDate;
		const numDays = Math.round(timeDiff / 86400000);
		if (numDays === 1) {
			return `1 day ago`;
		}
		if (numDays < 31) {
			return `${numDays} days ago`;
		}
		if (numDays < 365) {
			const months = Math.round(numDays / 30);
			if (months === 1) {
				return `1 month ago`;
			}
			return `${months} months ago`;
		}
		return `Over a year ago`;
	}

	return (
		<>
			<div className="messages-container">
				<div className="friend-info-container">
					<i
						onClick={() => setShowMessages(false)}
						className="fas fa-times"
					></i>
					<div className="message-icon-name-container">
						<div
							className={`status small ${
								friend && friend?.online ? 'online' : 'offline'
							}`}
						></div>
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
				</div>
				<ul className="message-list">
					{messages &&
						messages.map((msg, idx) => (
							<li className={getClass(msg)} key={idx} id={idx}>
								<div className="to-flex">
									{getClass(msg) === 'to' && (
										<div className="msg-edit-buttons">
											{/* <i
												onClick={(e) => editForm(e)}
												id={`edit${msg.id}`}
												className="fas fa-pencil-alt"
											></i> */}
											<i
												onClick={(e) => delMessage(e, msg.id)}
												id={`del${msg.id}`}
												className="far fa-trash-alt"
											></i>
										</div>
									)}
									<div
										className={`message-body ${getClass(msg)}`}
										id={`msg-${msg.id}`}
									>
										{msg.message}
									</div>
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
				<div className={`user-typing${typingString ? ' typing' : ''}`}>
					{typingString}
				</div>
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
