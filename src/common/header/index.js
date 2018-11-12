import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
	HeaderWrapper,
	Logo,
	UserInfo,
	UserInfoItem
} from './style'

var stompClient = null
class Header extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			onLineUser: ""
		}
	}

	componentWillMount(){
    const Stomp = require('stompjs')
    var SockJS = require('sockjs-client')
    SockJS = new SockJS('http://localhost:8080/livecode')
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, this.onConnected, this.onError);
	}

  onConnected = () => {
  		stompClient.subscribe('/head/onlineuser', this.onMessageReceived);
  }

  onError = (error) => {
    console.log("error");
  }

  onMessageReceived = (payload) => {
  	var message = JSON.parse(payload.body);
  	console.log(message);
		this.setState(() => ({
				onLineUser: message.onlineUser
		}))
	}


	render(){

		return (
			<HeaderWrapper> 
				<Logo /> 

				<UserInfo>
					<UserInfoItem className='Online'> 
						<i className='iconfont'> &#xe616; </i>
						在线用户：  {this.props.login ? this.state.onLineUser : ""}
					</UserInfoItem>
					<UserInfoItem className='Now'> {this.props.login ? this.props.username : ""} </UserInfoItem>
					<UserInfoItem className='Now'>
						<i className='iconfont'> &#xe617; </i>
						当前用户： 
					</UserInfoItem>
				</UserInfo>
			</HeaderWrapper>
		)
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

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);