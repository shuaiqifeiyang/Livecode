import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Menu, Dropdown } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
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
			onLineUser: "unlogin",
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

	logout(){
		axios.get('http://47.99.212.81:80/logout?username='+this.props.username).then((res)=>{});
		this.setState(()=>({
			onLineUser: "unlogin",
			chatVisible: false,
		}));
		this.props.handleLogout();
	}
	render(){
		const menu = (
		<Menu>
		    <Menu.Item onClick={this.logout.bind(this)}>
		        <Link to='/'>exit</Link> 
		    </Menu.Item>
		    
		  </Menu>
		);
		return (
			<HeaderWrapper> 
				<Logo /> 
				<UserInfo>
		      <UserInfoItem className='Now'> 
		        <Dropdown overlay={menu} placement="bottomCenter">
      				<Button>{this.props.username}</Button>
    				</Dropdown>
		      </UserInfoItem>
	       </UserInfo>

				{/*<UserInfo>
					<UserInfoItem className='Online'> 
						<i className='iconfont'> &#xe616; </i>
						在线用户：  {this.props.login ? this.state.onLineUser : ""}
					</UserInfoItem>
					<UserInfoItem className='Now'> {this.props.login ? this.props.username : ""} </UserInfoItem>
					<UserInfoItem className='Now'>
						<i className='iconfont'> &#xe617; </i>
						当前用户： 
					</UserInfoItem>
				</UserInfo>*/}
			</HeaderWrapper>
		)
	}


	componentDidMount(){
		if(this.props.login){
			axios.get('http://47.99.212.81:80/onlineuser').then((res)=>{
				this.setState({
	      	onLineUser: res.data,
	    });
			});
		}else{
			this.setState({
				onLineUser: "unlogin",
			})
		}
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
		handleLogout(){
			const action = {
				type: 'logout'
			}
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);