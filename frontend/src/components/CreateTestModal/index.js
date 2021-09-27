import { useState } from 'react';
import { Modal } from '../../context/Modal';
import TestForm from './TestForm';

function CreateTestModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className="create-test btn" onClick={() => setShowModal(true)}>
				Create Test
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<TestForm />
				</Modal>
			)}
		</>
	);
}

export default CreateTestModal;
