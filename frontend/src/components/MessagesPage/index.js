import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import openSocket from 'socket.io-client';
import { io } from 'socket.io-client';
import { csrfFetch } from '../../store/csrf';

import './MessagesPage.css';

let socket;

function MessagesPage() {
	const sessionUser = useSelector((state) => state.session.user);
	const { friendId } = useParams();

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket = io();

		socket.on('incoming', (msg) => {
			setMessages([...messages, msg]);
			// console.log(msg);
		});

		return () => socket.close();
	}, [messages]);

	useEffect(() => {
		(async () => {
			const temp = await fetch(`/api/messages/${sessionUser.id}/${friendId}`);
			const data = await temp.json();
			setMessages(data);
		})();
	}, [friendId, sessionUser.id]);

	function sendMessage(e) {
		e.preventDefault();

		if (!message) {
			e.target.children[0].className = 'error';
			return (e.target.children[0].placeholder = 'Please enter a message');
		}

		const payload = {
			user: { ...sessionUser },
			friendId,
			message,
		};

		socket.emit('msg', payload);
		setMessage('');
		const div = document.getElementById('message-list');
		div.scrollTo(0, div.scrollHeight);
		e.target.children[0].className = '';
		e.target.children[0].placeholder = 'Type here';
	}

	function getClass(msg) {
		if (msg.userM.id === sessionUser.id) {
			return 'to';
		}
		return 'from';
	}

	function getTime(msg) {
		const now = new Date(Date.now()).getTime();
		const messageDate = new Date(msg.createdAt).getTime();
		if (now - messageDate < 86400000) {
			return new Date(msg.createdAt).toLocaleTimeString();
		}
	}

	return (
		<>
			{/* <h2>{`Messages with user ${friendId}`}</h2> */}
			<div className="messages-container">
				<ul id="message-list">
					{messages &&
						messages.map((msg, idx) => (
							<li className={getClass(msg)} key={idx} id={idx}>
								<h4>{msg.userM.username}</h4>
								<div className={`message-body ${getClass(msg)}`}>
									{msg.message}
								</div>
								<div className="message-time">{getTime(msg)}</div>
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
