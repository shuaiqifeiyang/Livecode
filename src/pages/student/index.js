import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Codeandquestion from '../../common/codeandquestion';
import Chatwrapper from '../../common/chat';
import Videowrapper from '../../common/video';

const { Sider } = Layout;
class Studentpage extends Component{
	

	/*componentDidMount(){
		var stompClient = null;
		var SockJS = require('sockjs-client')
		const Stomp = require('stompjs')
	    
	    SockJS = new SockJS('http://localhost:8080/livecode')
	    stompClient = Stomp.over(SockJS);
	    stompClient.connect({}, this.onConnected, this.onError);
	}*/

	render(){
		
		return (
				<Layout>
				  <Sider
		      breakpoint="lg"
		      collapsedWidth="0"
		      onBreakpoint={(broken) => { console.log(broken); }}
		      onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
		      width={150}
		    	>
			      <Menu 
			      	theme="dark" mode="inline" defaultSelectedKeys={['4']} 
			      	style={{width: 150}} 
			      	
			      >
			      
			        <Menu.Item key="1">
			          <Icon type="question" />
			          <span className="nav-text">
			          	<NavLink to='/student/' 
			          		style={{color: '#969696' }}
  									activeStyle={{
    									color: 'white',
    									textDecoration: "none" }}
    							>
			          		题目&&代码
			          	</NavLink>
			          </span>
			        </Menu.Item>
			      

			      
			        <Menu.Item key="2">
			          <Icon type="message" />
			          <span className="nav-text">
			          	<NavLink to='/student/chat' 
			          		style={{color: '#969696' }}
  									activeStyle={{
    									color: 'white',
    									textDecoration: "none" }}
    							>
    								聊天
    							</NavLink>
    						</span>
			        </Menu.Item>
			      

			        <Menu.Item key="3">
			          <Icon type="video-camera" />
			          <span className="nav-text">
			          <NavLink to='/student/video' 
			          		style={{color: '#969696' }}
  									activeStyle={{
    									color: 'white',
    									textDecoration: "none" }}
    							>
			          	视频语音
			          </NavLink>
			          </span>
			        </Menu.Item>
			      </Menu>
	    		</Sider>
		    <Layout>
	        <Route path='/student/' exact component={ Codeandquestion } />
	        <Route path='/student/chat' component={ Chatwrapper } />
	        <Route path='/student/video' component={ Videowrapper } />
	        
			</Layout>
			</Layout>
		)
	}
}

const mapState = (state) => {
	return{
		code: state.code
	}
}

const mapDispatch = (dispatch) => {
	return{

		handleCodeReceived(e){
			console.log(e);
			const action = {
				type: 'code_received',
			}
			dispatch(action);
		},		
	}
}


export default connect(mapState, mapDispatch)(Studentpage);


