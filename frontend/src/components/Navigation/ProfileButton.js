import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		history.push('/');
	};

	return (
		<>
			<button className="btn" onClick={openMenu}>
				<i className="fas fa-user"></i>
			</button>
			{showMenu && (
				<ul className="profile-dropdown">
					<li>
						<Link to={`/users/${user.id}`}>My Profile</Link>
					</li>
					<li>
						<button className="log-out np nm" onClick={logout}>
							Log Out
						</button>
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
