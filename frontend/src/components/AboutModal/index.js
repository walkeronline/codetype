import { useState } from 'react';
import { Modal } from '../../context/Modal';
import AboutModalInfo from './AboutModalInfo';

function AboutModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className="about" onClick={() => setShowModal(true)}>
				About
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AboutModalInfo />
				</Modal>
			)}
		</>
	);
}

export default AboutModal;
