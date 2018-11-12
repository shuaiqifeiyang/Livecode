const defaultState = {
	username: "3160",
	password: "",
	language: "html",
	login: false,
	identity: "traveller",
	question: "this is a difficult question"
};

export default (state = defaultState, action) => {
	if(action.type === 'change_language'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.language = action.value;
		return newState;
	}
	/*if(action.type === 'change_code'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.codecontent = action.value;
		return newState;
	}*/
	if(action.type === 'change_username'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.username = action.value;

		return newState;
	}
	if(action.type === 'empty_username'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.username = "";
		return newState;
	}
	if(action.type === 'change_password'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.password = action.value;

		return newState;
	}
	if(action.type === 'empty_password'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.password = "";
		return newState;
	}
	if(action.type === 'login_success'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.login = true;
		newState.identity = action.identity;
		newState.username = action.username;
		newState.password = action.password;
		return newState;
	}



	return state;
}