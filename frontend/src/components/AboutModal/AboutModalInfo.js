import { Link } from 'react-router-dom';

function AboutModalInfo() {
	return (
		<div className="about-content">
			<h1>CodeType</h1>
			<p>Create by Walker Williams</p>
			{/* https://www.linkedin.com/in/walker-williams-463bb021b/ */}
			{/* https://github.com/walkerwilliamsx */}
			<div className="social-links">
				<a
					href="https://github.com/walkerwilliamsx "
					target="_blank"
					rel="noreferrer"
				>
					<i className="fab fa-github fa-4x"></i>
				</a>
				<a
					href="https://www.linkedin.com/in/walker-williams-463bb021b/"
					target="_blank"
					rel="noreferrer"
				>
					<i className="fab fa-linkedin fa-4x"></i>
				</a>
			</div>
		</div>
	);
}

export default AboutModalInfo;
