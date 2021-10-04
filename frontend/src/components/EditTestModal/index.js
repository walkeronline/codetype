import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditTestForm from './EditTestForm';

function EditTestModal({ test, convertStr }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className="edit-test btn" onClick={() => setShowModal(true)}>
				Edit Test
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditTestForm
						test={test}
						convertStr={convertStr}
						onClose={() => setShowModal(false)}
					/>
				</Modal>
			)}
		</>
	);
}

export default EditTestModal;
