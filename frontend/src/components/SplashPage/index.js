import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUpFormModal from '../SignUpFormModal';
import { useHistory } from 'react-router';

import './SplashPage.css';

function SplashPage() {
	const [test, setTest] = useState(null);
	const history = useHistory();
	const sessionUser = useSelector((state) => state?.session?.user);

	useEffect(() => {
		async function getTest() {
			const response = await fetch('/api/tests/random');
			const data = await response.json();
			console.log(data);
			setTest(data);
		}
		getTest();
	}, []);

	if (sessionUser) {
		history.push('/test');
	}

	return (
		<>
			<div className="main-splash-container">
				<div id="motto-splash" className="motto hero-logo">
					CodeType
				</div>
				<div className="sub-motto">
					CodeType helps programmers become more efficient by improving typing
					speeds.
				</div>
				<SignUpFormModal
					buttonContent={'Get Started Now 🧑‍💻'}
					buttonClass={'btn-big'}
				/>
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
