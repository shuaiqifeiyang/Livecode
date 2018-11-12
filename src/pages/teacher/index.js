import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Codeandquestion from '../../common/codeandquestion';
import Chatwrapper from '../../common/chat';
import Videowrapper from '../../common/video';

const { Sider } = Layout;
class Teacherpage extends Component{
	
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

			      	<Menu.Item key="4">
			          <Icon type="video-camera" />
			          <span className="nav-text">
			          <NavLink to='/teacher/' 
			          		style={{color: '#969696' }}
  									activeStyle={{
    									color: 'white',
    									textDecoration: "none" }}
    							>
			          	选题
			          </NavLink>
			          </span>
			        </Menu.Item>

			        <Menu.Item key="1">
			          <Icon type="question" />
			          <span className="nav-text">
			          	<NavLink to='/teacher/' 
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
			          	<NavLink to='/teacher/chat' 
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
			          <NavLink to='/teacher/video' 
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
	        <Route path='/teacher/' exact component={ Codeandquestion } />
	        <Route path='/teacher/chat' component={ Chatwrapper } />
	        <Route path='/teacher/video' component={ Videowrapper } />
				</Layout>
			</Layout>
		)
	}

	/*componentDidMount(){

		var stompClient = null;
		var SockJS = require('sockjs-client')
		const Stomp = require('stompjs')
	    
	    SockJS = new SockJS('http://localhost:8080/livecode');
	    stompClient = Stomp.over(SockJS);
	    //stompClient.connect({}, this.onConnected, this.onError);


		stompClient.subscribe('/topic/chat', function (result) {
            //showContent(JSON.parse(result.body));
            this.props.handleCodeReceived(result.body);
        });
	}*/
}

const mapState = (state) => {
	return{
		
	}
}

const mapDispatch = (dispatch) => {
	return{

	}
}


export default connect(mapState, mapDispatch)(Teacherpage);

