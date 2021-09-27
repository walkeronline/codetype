import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import { Redirect, useHistory } from 'react-router';

import './TestPage.css';

import CreateTestModal from '../CreateTestModal';
import EditTestModal from '../EditTestModal';

function TestPage() {
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory();
	const [test, setTest] = useState(null);
	const [input, setInput] = useState('');
	const [activeId, setActiveId] = useState(0);
	const [correctIDs, setCorrectIDs] = useState([]);
	const [incorrectIDs, setIncorrectIDs] = useState([]);
	const [timeSeconds, setTimeSeconds] = useState(0);
	const [wpm, setWPM] = useState(null);
	const [timer, setTimer] = useState(null);

	const getClass = (id) => {
		if (correctIDs.indexOf(id) > -1) {
			return 'correct';
		} else if (incorrectIDs.indexOf(id) > -1) {
			return 'incorrect';
		} else {
			return '';
		}
	};

	const convertStr = (str, i) => {
		if (i === activeId) {
			return (
				<div key={i} id={i} className={`active ${getClass(i)}`}>
					{str}
				</div>
			);
		} else {
			return (
				<div key={i} id={i} className={`inactive ${getClass(i)}`}>
					{str}
				</div>
			);
		}
	};

	const addTime = () => {
		const seconds = timeSeconds + 1;
		setTimeSeconds(seconds);
		console.log(seconds);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		const id = e.target.id.split('-')[1];

		const reqDelete = async ({ id }) => {
			const response = await csrfFetch(`/api/tests`, {
				method: 'DELETE',
				body: JSON.stringify({
					id,
				}),
			});
			const data = await response.json();
			return history.push(`/users/${sessionUser.id}`);
		};

		reqDelete({ id });
	};

	useEffect(() => {
		async function getTest() {
			const response = await fetch('/api/tests/random');
			const data = await response.json();
			console.log(data);
			setTest(data);
		}
		getTest();
	}, []);

	// useEffect(() => {
	// 	if (test?.randomTest?.body) {
	// 		const clone = { ...test };
	// 		clone.randomTest.body = clone.randomTest.body.replaceAll('{', 'EE');
	// 		setTest(clone);
	// 	}
	// }, []);

	useEffect(() => {
		if (activeId === 0 && input.length === 1) {
      // Try shorter interval
      // Key Down instead of useEffect
			setTimer(setInterval(addTime, 1000));
		}

		if (input[input.length - 1] === ' ') {
			const currentWord = document.getElementById(activeId);

			if (currentWord.innerText === input.trim()) {
				setCorrectIDs([...correctIDs, activeId]);
			} else {
				setIncorrectIDs([...incorrectIDs.values(), activeId]);
			}
			setInput('');
			setActiveId(activeId + 1);
		}
	}, [input]);

	return (
		<>
			{test?.randomTest && (
				<div className="test-box">
					<h2>{test.randomTest.title}</h2>
					<div className="test-body-container">
						{test.randomTest.body
							.split(' ')
							.map((str, i) => convertStr(str, i))}
					</div>
					<div className="input-container">
						<input
							className="user-input"
							id="user-input"
							onChange={(e) => setInput(e.target.value)}
							value={input}
							type="text"
							placeholder={!activeId ? 'Type here' : ''}
						></input>
						<div className="temp-seconds">{timeSeconds}</div>
					</div>
					{sessionUser?.id === test?.randomTest?.userId && (
						<>
							<button
								className="delete btn"
								id={`test-${test.randomTest.id}`}
								onClick={handleDelete}
							>
								Delete Test
							</button>
							<EditTestModal test={test.randomTest} />
						</>
					)}
					<CreateTestModal />
				</div>
			)}
		</>
	);
}

export default TestPage;
