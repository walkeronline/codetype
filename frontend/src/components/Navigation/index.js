import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<li>
				<ProfileButton user={sessionUser} />
			</li>
		);
	} else {
		sessionLinks = (
			<>
				<li>
					<NavLink className="sign-up" to="/signup">
						Sign Up
					</NavLink>
				</li>
				<li>
					<LoginFormModal />
				</li>
			</>
		);
	}

	return (
		<div class="nav-container">
			<NavLink className="hero-logo" exact to="/">
				CodeType
			</NavLink>
			<ul className="links">{isLoaded && sessionLinks}</ul>
		</div>
	);
}

export default Navigation;
