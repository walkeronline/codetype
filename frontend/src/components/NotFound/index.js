import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
	return (
		<div className="not-found-container">
			<h2>404 Not Found</h2>
			<Link className="btn" to="/">
				Take Me Back
			</Link>
		</div>
	);
}

export default NotFound;
