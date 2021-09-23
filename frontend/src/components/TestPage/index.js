import { useState, useEffect } from 'react';
import './TestPage.css';

function TestPage() {
	const [test, setTest] = useState(null);
	const [input, setInput] = useState('');
	const [activeId, setActiveId] = useState(0);

	const convertStr = (str, i) => {
		if (i > 0 && test.randomTest.body.split(' ')[i - 1] === '{') {
			if (i === activeId) {
				return (
					<>
						<br />
						<div id={i} className="active">
							{str}
						</div>
					</>
				);
			} else {
				return (
					<>
						<br />
						<div id={i} className="inactive">
							{str}
						</div>
					</>
				);
			}
		} else {
			if (i === activeId) {
				return (
					<div id={i} className="active">
						{str}
					</div>
				);
			} else {
				return (
					<div id={i} className="inactive">
						{str}
					</div>
				);
			}
		}
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
		if (input[input.length - 1] === ' ') {
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
					</div>
				</div>
			)}
		</>
	);
}

export default TestPage;
