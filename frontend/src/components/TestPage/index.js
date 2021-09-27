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
	const [timeSeconds, setTimeSeconds] = useState(null);
	const [wpm, setWPM] = useState(null);
	const [accuracy, setAccuracy] = useState(null);
	const [timer, setTimer] = useState(0);
	const [start, setStart] = useState(0);
	const [hasStarted, setHasStarted] = useState(false);

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
			setTest(data);
		}
		getTest();
	}, []);

	useEffect(() => {
		if (input[input.length - 1] === ' ') {
			if (activeId >= test?.randomTest?.body.split(' ').length) {
				// Test is done
				return;
			}
			const currentWord = document.getElementById(activeId);

			if (currentWord.innerText === input.trim()) {
				setCorrectIDs([...correctIDs, activeId]);
			} else {
				setIncorrectIDs([...incorrectIDs.values(), activeId]);
			}
			setInput('');
			setActiveId(activeId + 1);
		}
	}, [activeId, correctIDs, incorrectIDs, input]);

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
						<div className="temp-seconds">Time: {timeSeconds}</div>
						<div className="temp-wpm">WPM: {wpm}</div>
						<div className="temp-accuracy">Accuracy: {accuracy}</div>
						<div className="temp-progress">
							Progress: {activeId}/{test.randomTest.body.split(' ').length}
						</div>
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
