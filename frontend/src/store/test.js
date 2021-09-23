const SET_TEST = 'session/setTest';

const setTest = (test) => ({
	type: SET_TEST,
	payload: test,
});

export const getTest = () => async (dispatch) => {
	const response = await fetch('/api/tests/random');
	const data = await response.json();
	dispatch(setTest(data.randomTest));
	return response;
};

const initialState = { test: null };

function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_TEST:
			newState = Object.assion({}, state, { test: action.payload });
			return newState;
		default:
			return state;
	}
}

export default reducer;
