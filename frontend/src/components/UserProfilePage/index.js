import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import './UserProfilePage.css';

function UserProfilePage() {
	const sessionUser = useSelector((state) => state.session.user);
	const { userId } = useParams();
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function getUser() {
			const response = await fetch(`/api/users/${userId}`);
			const data = await response.json();
			setUser(data);
		}
		getUser();
	}, [userId]);


	const getImage = (user) => {
		return user?.imageUrl
			? user.imageUrl
			: `https://lh3.googleusercontent.com/Q3TExTusD0FdRQL-Y_sobhGB09x-Bw-kMsSsd2Y1RpXu91XMbyAxNqBgPFWEEWlVYhvR5xTKHGP3CvhLjiwgyE-cr-w_p42M54W55w=w600`;
	};

	return (
		<div className="user-profile-container">
			<div className="user-information-container">
				<div className="user-info">
					<img
						className="user-page-pic"
						src={getImage(user)}
						alt={`${user?.username}
        's profile`}
					/>
					<div className="text-container">
						<h2>{user?.username}</h2>
						<div>{user?.location}</div>
						<div>{`User since ${new Date(user?.createdAt)
							.toDateString()
							.split(' ')
							.slice(1)
							.join(' ')}`}</div>
						<div>{`${user?.Tests?.length} Tests`}</div>
					</div>
				</div>
			</div>
			<div className="user-tests-container">
				<h2>{`Tests by ${user?.username}`}</h2>
				{user?.Tests &&
					user.Tests.map((test) => (
						<div className="test-container-user-page">
							<Link to={`/test/${test.id}`}>{test.title}</Link>
						</div>
					))}
			</div>
		</div>
	);
}

export default UserProfilePage;
