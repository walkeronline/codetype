import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { csrfFetch } from '../../store/csrf';
import { Redirect, useHistory } from 'react-router';

import './TestPage.css';

import CreateTestModal from '../CreateTestModal';
import EditTestModal from '../EditTestModal';
import { Link } from 'react-router-dom';

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
	const [formatted, setFormatted] = useState([]);

	const getClass = (id) => {
		if (correctIDs.indexOf(id) > -1) {
			return 'correct';
		} else if (incorrectIDs.indexOf(id) > -1) {
			return 'incorrect';
		} else {
			return '';
		}
	};

	useEffect(() => {
		const scroll = () => {
			const firstIndex =
				document.querySelector('#word-container').children[0].id;

			for (let i = firstIndex; i < activeId; i++) {
				const word = document.getElementById(i);
				word.remove();
			}
		};

		const wordOffset = document.getElementById(+activeId)?.offsetTop;
		const boxOffset = document.getElementById('word-container')?.offsetTop;

		if (wordOffset > boxOffset + 11) {
			scroll();
		}
	}, [activeId, spaces]);

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
	}, [correctIDs, spaces, test?.randomTest?.body, timeSeconds]);

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
		}
	}, [input, hasStarted, startTime, accuracy, timer]);

	useEffect(() => {
		if (input[input.length - 1] === ' ') {
			const currentWord = document.getElementById(activeId);
			if (activeId >= test?.randomTest?.body.split(' ').length - 1) {
				// Test is done
				if (currentWord && currentWord.innerText === input.trim()) {
					setCorrectIDs([...correctIDs, activeId]);
				} else {
					setIncorrectIDs([...incorrectIDs.values(), activeId]);
				}
				clearInterval(timer);
				setInput('');
				return;
			}

			if (currentWord && currentWord.innerText === input.trim()) {
				setCorrectIDs([...correctIDs, activeId]);
			} else {
				setIncorrectIDs([...incorrectIDs.values(), activeId]);
			}
			setInput('');
			setSpaces(spaces + 1);
			setActiveId(activeId + 1);
			return;
		}
	}, [
		activeId,
		correctIDs,
		incorrectIDs,
		input,
		spaces,
		test?.randomTest?.body,
		timer,
	]);

	// useEffect(() => {
	// 	if (typeof test?.randomTest?.body === 'string') {
	// 		const formatted = [];
	// 		let newInd = 0;
	// 		let curInd = 0;
	// 		let lineInd = 0;
	// 		while (curInd < test?.randomTest?.body.length) {
	// 			if (
	// 				test?.randomTest?.body[curInd] === ';' ||
	// 				test?.randomTest?.body[curInd] === '{' ||
	// 				test?.randomTest?.body[curInd] === '}'
	// 			) {
	// 				formatted.push(
	// 					<div className={`line ${lineInd}`}>
	// 						{test?.randomTest?.body
	// 							.slice(newInd, curInd + 1)
	// 							.split(' ')
	// 							.map((str) => (
	// 								<div>{str}</div>
	// 							))}
	// 					</div>
	// 				);
	// 				newInd = curInd + 1;
	// 				curInd = newInd;
	// 				lineInd++;
	// 			} else {
	// 				curInd++;
	// 			}
	// 		}
	// 		setFormatted(formatted);
	// 	}
	// }, [test]);

	return (
		<>
			{test?.randomTest && (
				<div className="test-box">
					<h2>{test.randomTest.title}</h2>
					<div className="test-body-container">
						{/* <div className="word-container">
							{test.randomTest.body
								.split(' ')
								.map((str, i) => convertStr(str, i))}
						</div> */}
						<div className="word-container" id="word-container">
							{test?.randomTest?.body
								.split(' ')
								.map((ele, i) => convertStr(ele, i))}
						</div>
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
						{/* <div className="temp-accuracy">Accuracy: {accuracy}</div> */}
					</div>
					<Link to="/all-tests">View All Tests</Link>
					<div className="test-stats">
						<div className="temp-seconds">{Math.round(timeSeconds)}</div>
						<div className="temp-wpm">{Math.round(wpm)}</div>
					</div>
					<div className="manage-tests-container">
						<CreateTestModal />
						{sessionUser?.id === test?.randomTest?.userId && (
							<>
								<EditTestModal test={test.randomTest} />
								<button
									className="delete btn red"
									id={`test-${test?.randomTest?.id}`}
									onClick={handleDelete}
								>
									Delete Test
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default TestPage;
