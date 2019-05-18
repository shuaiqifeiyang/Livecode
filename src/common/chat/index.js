import React, { Component } from 'react';
import { connect as connectStore} from 'react-redux';

import './style.css';

var stompClient = null;
class Chatwrapper extends Component{

	constructor(props){
		super(props);
		this.state = {
			chatcontent: [],
			inputcontent: ""
		}
	}

	componentWillMount(){
		const Stomp = require('stompjs')
		var SockJS = require('sockjs-client')
		SockJS = new SockJS('http://47.99.212.81:80/livecode')
		stompClient = Stomp.over(SockJS);
		stompClient.connect({}, this.onConnected, this.onError);
	}
	onConnected = () => {
		stompClient.subscribe('/all/chatlist', this.onMessageReceived);
	}
	onMessageReceived = (payload) => {
		console.log("111")
		
		var message = JSON.parse(payload.body);
		this.setState((prevState)=>({
			chatcontent: [...prevState.chatcontent, message],
		}))
		console.log(this.state.chatcontent);
	}
	onError = (error) => {
		console.log("error");
	}
	handleInputChange(e){
		const value = e.target.value;
		this.setState(() => ({
			inputcontent: value
		}))
	}

	render(){
		return (
			<div>
				<div className='chatbox'>
					<ul className='messagelist'>
						{this.getItem()}
					</ul>
				</div>
				<input 
					className='message' 
					type="text" 
					autoComplete="off" 
					spellCheck='false' 
					onChange={this.handleInputChange.bind(this)}
					value={this.state.inputcontent}
				>
				</input>
				<button className='send' onClick={this.sendmessage.bind(this)}> 发送 </button>
			</div>
		)
	}

	getItem(){
		return this.state.chatcontent.map((item, index) => {
			return (
				<div key={index}>
					<li 
						key={index} 
					>					
						<div className='messagetime'> {item.time} </div>
						<div className='messagename'> {item.from} </div>
						<div className='messagecontent'> {item.content} </div>
					</li>
				</div>
			)
		})
	}

	sendmessage(){
		stompClient.send("/app/chatlist", {}, JSON.stringify({ 'from': this.props.username, 'content': this.state.inputcontent }));
		this.setState(()=>({
			inputcontent: ""
		}))
	}
}
const mapStateToProps = (state) => {
	return {
		username: state.username,
		login: state.login
	}
}

const mapDispatchToProps = (dispatch) => {
	
	return {
		/*handleChange(e){
			console.log(e);
			const action = {
				type: 'change_language',
				value: e
			};
			dispatch(action);
		}*/
	}
}

export default connectStore(mapStateToProps, mapDispatchToProps)(Chatwrapper);