const defaultState = {
	username: "unlogin",
	password: "",
	language: "c_cpp",
	login: false,
	identity: "traveller",
	previewtitle: "",
	previewcontent: "",
	problemlist: [],
	verifyproblem: false
};

//reducer可以接收state，但是不能修改state
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
	if(action.type === 'received_problemlist'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.problemlist = action.value;
		return newState;
	}
	if(action.type === 'received_previewproblem'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.previewtitle = action.title;
		newState.previewcontent = action.content;
		return newState;
	}
	if(action.type === 'verify_problem'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.verifyproblem = true;
		return newState;
	}
	if(action.type === 'logout'){
		const newState = JSON.parse(JSON.stringify(state));
		newState.username = "unlogin";
		newState.password = "";
		newState.language = "c_cpp";
		newState.login = false;
		newState.identity = "traveller";
		newState.previewtitle = "";
		newState.previewcontent = "";
		newState.problemlist = [];
		newState.verifyproblem = false;
		return newState;
	}

	return state;
}