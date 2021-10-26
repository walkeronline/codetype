import { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { io } from 'socket.io-client';

import './MessagesPage.css';

const socket = io('http://localhost:8000');

function MessagesPage() {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	function sendMessage(e) {
		e.preventDefault();
		// console.log(socket.emit('hello', 'world'));
		socket.emit('msg', message);
	}

	socket.on('incoming', (msg) => {
		setMessages([...messages, msg]);
	});

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	return (
		<div className="messages-container">
			<h2>Messages</h2>
			<form onSubmit={sendMessage}>
				<input type="text" onChange={(e) => setMessage(e.target.value)}></input>
				<button type="submit">Send</button>
			</form>
		</div>
	);
}

export default MessagesPage;
