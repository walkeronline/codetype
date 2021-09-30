import { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal({ buttonContent, buttonClass = '' }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className={`${buttonClass}`} onClick={() => setShowModal(true)}>
				{buttonContent}
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignUpForm onClose={() => setShowModal(false)} />
				</Modal>
			)}
		</>
	);
}

export default SignUpFormModal;
