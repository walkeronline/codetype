import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Friends from '../Friends';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignUpFormModal from '../SignUpFormModal';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<>
				<li>
					<NavLink className="sign-up" to="/test">
						Practice
					</NavLink>
				</li>
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			</>
		);
	} else {
		sessionLinks = (
			<>
				<li>
					<SignUpFormModal
						className="sign-up"
						buttonContent={'Sign Up'}
						buttonClass={'sign-up'}
					/>
				</li>
				<li>
					<LoginFormModal />
				</li>
			</>
		);
	}

	return (
		<>
			<div className="nav-container">
				<NavLink className="hero-logo" exact to="/">
					CodeType
				</NavLink>
				<ul className="links">{isLoaded && sessionLinks}</ul>
			</div>
			{sessionUser && <Friends />}
		</>
	);
}

export default Navigation;
