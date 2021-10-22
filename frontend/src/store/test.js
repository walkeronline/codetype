import { csrfFetch } from './csrf';

const GET_TEST = 'session/getTest';
const EDIT_TEST = 'session/editTest';

const getTestAction = (test) => ({
	type: GET_TEST,
	test,
});

const editTestAction = (test) => ({
	type: EDIT_TEST,
	test,
});

export const editTest = (test) => async (dispatch) => {
	const response = await csrfFetch('/api/tests', {
		method: 'PUT',
		body: JSON.stringify(test),
	});
	const newTest = await response.json();
	dispatch(editTestAction(newTest));
};

export const getTest =
	(id = null) =>
	async (dispatch) => {
		if (id) {
			const response = await fetch(`/api/tests/${id}`);
			const data = await response.json();
			dispatch(getTestAction(data.test));
			return response;
		} else {
			const response = await fetch('/api/tests/random');
			const data = await response.json();
			dispatch(getTestAction(data.randomTest));
			return response;
		}
	};

const initialState = { test: null };

function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_TEST:
			newState = { ...state };
			newState.test = action.test;
			return newState;
		case EDIT_TEST:
			newState = { ...state };
			newState.test = action.test;
			return newState;
		default:
			return state;
	}
}

export default reducer;
