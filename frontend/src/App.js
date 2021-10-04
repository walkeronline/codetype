import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import SplashPage from './components/SplashPage';
import TestPage from './components/TestPage';
import Friends from './components/Friends';
import UTestPage from './components/UTestPage';
import AllTestPage from './components/AllTestPage';
import NotFound from './components/NotFound';
import UserProfilePage from './components/UserProfilePage';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	const checkUser = () => {
		if (sessionUser) {
			return <TestPage />;
		}
		return <SplashPage />;
	};

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{/* <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */}
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						{checkUser()}
					</Route>
					{sessionUser && (
						<>
							<Route exact path="/test">
								<TestPage />
							</Route>
							<Route path="/all-tests">
								<AllTestPage />
							</Route>
							<Route exact path="/test/:testId">
								<UTestPage />
							</Route>
							<Route exact path="/users/:userId">
								<UserProfilePage />
							</Route>
						</>
					)}
					<Route>
						<NotFound />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
