import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './AllTestPage.css';

function AllTestPage() {
	const [tests, setTests] = useState([]);

	useEffect(() => {
		async function getTest() {
			const response = await fetch('/api/tests');
			const data = await response.json();
			setTests(data);
		}
		getTest();
	}, []);

	return (
		<div className="all-tests-container">
			{tests &&
				tests.map((test) => (
					<div key={test?.id} className="test-info">
						<Link to={`/test/${test?.id}`}>{test?.title}</Link>
						<div className="test-owner">{test?.User?.username}</div>
					</div>
				))}
		</div>
	);
}

export default AllTestPage;
