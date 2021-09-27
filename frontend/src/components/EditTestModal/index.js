import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditTestForm from './EditTestForm';

function EditTestModal({ test }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className="edit-test btn" onClick={() => setShowModal(true)}>
				Edit Test
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditTestForm test={test} />
				</Modal>
			)}
		</>
	);
}

export default EditTestModal;
