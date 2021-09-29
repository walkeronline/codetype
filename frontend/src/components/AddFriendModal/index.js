import { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddFriendForm from './AddFriendForm';

function AddFriendModal({ friends, setFriends }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<i className="fas fa-plus" onClick={() => setShowModal(true)}></i>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AddFriendForm
						onClose={() => setShowModal(false)}
						friends={friends}
						setFriends={setFriends}
					/>
				</Modal>
			)}
		</>
	);
}

export default AddFriendModal;
