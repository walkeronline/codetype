import { useState } from 'react';
import { useSelector } from 'react-redux';

function UserProfilePage() {
	const sessionUser = useSelector((state) => state.session.user);


}

export default UserProfilePage;
