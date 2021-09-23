import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SplashPage.css';

function SplashPage() {
	const [test, setTest] = useState(null);

	useEffect(() => {
		async function getTest() {
			const response = await fetch('/api/tests/random');
			const data = await response.json();
			console.log(data);
			setTest(data);
		}
		getTest();
	}, []);

	return (
		<>
			<div className="main-splash-container">
				<div className="motto">Lorem ipsum dolor sit amet</div>
				<div className="sub-motto">
					Donec non sapien vel elit dignissim porta lacinia semper lacus.
					Vestibulum pellentesque, nunc in feugiat mollis, ligula dolor vehicula
					tellus, vel euismod velit neque quis massa.
				</div>
			</div>
			{/* {test && (
				<div className="test-example-container">
					<h2>Try It Out:</h2>
					<div className="test-area"></div>
					<div>{test.randomTest.body}</div>
				</div>
			)} */}
		</>
	);
}

export default SplashPage;
