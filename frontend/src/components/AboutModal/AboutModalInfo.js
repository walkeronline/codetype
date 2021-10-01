import { Link } from 'react-router-dom';

function AboutModalInfo() {
	return (
		<div className="about-content">
			<h1>About CodeType</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh lacus,
				imperdiet nec efficitur pellentesque, euismod at enim. Mauris lacinia
				lacus sed eleifend rhoncus. Aliquam accumsan, nulla non placerat
				ullamcorper, enim felis accumsan velit, id rhoncus purus quam quis
				ipsum. Praesent pellentesque nisl sit amet diam ultrices finibus. Fusce
				quis eros id ante dictum aliquam ut sed quam. Aliquam erat volutpat. Nam
				dapibus, dolor sed dignissim maximus, erat dolor volutpat diam, in
				ultricies est enim sed nisl. Sed quis sapien orci. Praesent id vulputate
				est. Cras sodales elit eget dui ornare consequat. Nunc facilisis tempor
				dui, vitae tincidunt mauris finibus non. Cras vitae consectetur nunc.
				Vestibulum vel fermentum nibh. Duis nec est sodales dolor ornare
				placerat ac eget sem. Nulla mollis ex sem, nec varius enim malesuada
				vel. Aenean efficitur mollis odio, ac efficitur nulla scelerisque
				molestie. Morbi mi diam, hendrerit et erat vel, blandit luctus magna.
				Mauris at commodo nisi, sit amet auctor libero. Curabitur id sapien et
				neque interdum finibus quis vel augue. Proin eu urna quis metus posuere
				venenatis eget feugiat risus. Praesent quis interdum risus, vel
				sollicitudin metus. Suspendisse imperdiet, risus in tempus ultricies,
				magna elit hendrerit tellus, et malesuada purus eros quis orci.
			</p>
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
