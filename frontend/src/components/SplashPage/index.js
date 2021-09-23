import { useState, useEffect } from 'react';

import './SplashPage.css';

function SplashPage() {
	const [test, setTest] = useState('');

	// useEffect(() => {
	// 	const getTest = async () => {
	// 		const test = await fetch('http://localhost:5000/api/tests');
	// 		return JSON.parse(test);
	// 	};
	// 	setTest(getTest());
	// 	console.log(test);
	// }, []);

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
		</>
	);
}

export default SplashPage;
