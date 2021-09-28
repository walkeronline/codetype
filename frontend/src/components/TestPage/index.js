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
	const [spaces, setSpaces] = useState(0);
	const [activeId, setActiveId] = useState(0);
	const [correctIDs, setCorrectIDs] = useState([]);
	const [incorrectIDs, setIncorrectIDs] = useState([]);
	const [timeSeconds, setTimeSeconds] = useState(null);
	const [wpm, setWPM] = useState(null);
	const [accuracy, setAccuracy] = useState(null);
	const [timer, setTimer] = useState(0);
	const [startTime, setStartTime] = useState(Date.now());
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
		const calcAverageWord = () => {
			const correctWords = test?.randomTest?.body
				.split(' ')
				.filter((str, idx) => correctIDs.indexOf(idx) > -1);
			const correctCharCount = correctWords?.reduce(
				(sum, str) => sum + str.length,
				0
			);
			return correctCharCount;
		};

		calcAverageWord();
		setWPM(((calcAverageWord() + spaces) * (60 / timeSeconds)) / 5);
	}, [spaces, timeSeconds]);

	// useEffect(() => {
	// 	setStartTime(Date.now());
	// }, [hasStarted]);

	useEffect(() => {
		const updateTime = () => {
			setTimeSeconds((Date.now() - startTime) / 1000);
		};

		if (input.length > 0 && !hasStarted) {
			const interval = setInterval(updateTime, 100);

			setTimer(interval);
			setAccuracy(0);
			setHasStarted(true);
			setStartTime(20);
			console.log(accuracy, hasStarted, startTime, timer);
		}
	}, [input, hasStarted, startTime, accuracy, timer]);

	// useEffect(() => {
	// 	const now = Date.now();
	// 	if (input.length > 0 && !startTime) {
	// 		console.log('HIT!');
	// 		setStartTime(now);
	// 		console.log(startTime);
	// 	}
	// }, [input, startTime]);

	useEffect(() => {
		if (input[input.length - 1] === ' ') {
			const currentWord = document.getElementById(activeId);
			if (activeId >= test?.randomTest?.body.split(' ').length - 1) {
				// Test is done
				if (currentWord.innerText === input.trim()) {
					setCorrectIDs([...correctIDs, activeId]);
				} else {
					setIncorrectIDs([...incorrectIDs.values(), activeId]);
				}
				clearInterval(timer);
				return;
			}

			if (currentWord.innerText === input.trim()) {
				setCorrectIDs([...correctIDs, activeId]);
			} else {
				setIncorrectIDs([...incorrectIDs.values(), activeId]);
			}
			setInput('');
			setSpaces(spaces + 1);
			setActiveId(activeId + 1);
			return;
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
						<div className="temp-seconds">Time: {timeSeconds}</div>
						<div className="temp-wpm">WPM: {wpm}</div>
						{/* <div className="temp-accuracy">Accuracy: {accuracy}</div> */}
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
