import { useState } from 'react';
import { Modal } from '../../context/Modal';
import RemoveFriendContent from './RemoveFriendContent';

function ConfirmRemoveFriendModal({ friend, setFriends, friends }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<i
				onClick={() => setShowModal(true)}
				id={`f-${friend?.friend?.id}`}
				className="far fa-minus-square"
			></i>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<RemoveFriendContent
						friend={friend}
						onClose={() => setShowModal(false)}
						setFriends={setFriends}
						friends={friends}
					/>
				</Modal>
			)}
		</>
	);
}

export default ConfirmRemoveFriendModal;
