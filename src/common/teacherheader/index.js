import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { Drawer, Button, Menu, Dropdown, List } from 'antd';
import { Link } from "react-router-dom";

import { 
	HeaderWrapper,
	Logo,
	UserInfo,
	UserInfoItem,
	QuestionTitleList
} from './style'

var stompClient = null
const ReactMarkdown = require('react-markdown')

class TeacherHeader extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			onLineUser: "",
			chatVisible: false,
			selectVisible: false,
			childrenDrawer: false
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
		axios.get('http://47.99.212.81:80/api/logout?username='+this.props.username).then((res)=>{});
		this.setState(()=>({
			onLineUser: "unlogin",
			selectVisible: false,
			childrenDrawer: false
		}));
		this.props.handleLogout();

	}
	render(){
		const menu = (
			<Menu style={{color: 'red'}}>
			    <Menu.Item onClick={this.logout.bind(this)}>
			        <Link to='/'>
			      		exit
			      	</Link>
			    </Menu.Item>
			</Menu>
		);
		//const input = "#This is title";

		return (
			<HeaderWrapper> 
				<Logo /> 
				<UserInfo>

					<UserInfoItem className='Online'> 
						<Button onClick={this.showSelectDrawer}>
		          SelectQuestion
		        </Button>
		      </UserInfoItem>
		      
		      <UserInfoItem className='Now'> 
		        <Dropdown overlay={menu} placement="bottomCenter">
      				<Button>{this.props.username}</Button>
    				</Dropdown>
		      </UserInfoItem>

	       </UserInfo>

      	{/*the select problem draw*/}
      	<Drawer
          title="problem list"
          placement="right"
          closable={false}
          width={480}
          onClose={this.onCloseSelect}
          visible={this.state.selectVisible}
        >
	        <List
			      //header={<div>Header</div>}
			      //footer={<div>Footer</div>}
			      bordered={true}
			      dataSource={this.props.problemlist}
			      renderItem={
			      	(item, index) => (
			      		<List.Item onClick={this.handleSelected.bind(this, index)}>
										<QuestionTitleList>{item}</QuestionTitleList>
			      		</List.Item>
			      	)
			      }
	    		/>
	    	{/*the draw show the whole question*/}
	    		<Drawer
            title={this.props.previewtitle}
            width={500}
            closable={false}
            onClose={this.onChildrenDrawerClose.bind(this)}
            visible={this.state.childrenDrawer}
          >
          	<div className="result-pane">
          		<ReactMarkdown 
          			source={this.props.previewcontent}  
          			skipHtml={true} 
          			className="result" 
          		/>
          	</div>

            <div
	            style={{
	              position: 'absolute',
	              bottom: 0,
	              width: '100%',
	              borderTop: '1px solid #e8e8e8',
	              padding: '10px 16px',
	              textAlign: 'right',
	              left: 0,
	              background: '#fff',
	              borderRadius: '0 0 4px 4px',
	            }}
	          >
	            <Button type="primary" onClick={this.verify.bind(this)}>
	              Submit
	            </Button>
	          </div>
          </Drawer>
        </Drawer>

		</HeaderWrapper>
		)
	}

	componentDidMount(){
		if(this.props.login){
			axios.get('http://47.99.212.81:80/api/onlineuser').then((res)=>{
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

	onChildrenDrawerClose(){
		this.setState({
      childrenDrawer: false,
    });
	}

	handleSelected(index){
		this.props.handlePreview(index);
		this.setState({
      childrenDrawer: true,
    });
	}

  showSelectDrawer = () => {
    
  	this.props.handleProblemList();
    this.setState({
      selectVisible: true,
    });
  }

  onCloseSelect = () => {
    this.setState({
      selectVisible: false,
    });
  }

  verify = () => {
  	axios.get('http://47.99.212.81:80/api/verifyproblem').then((res)=>{});
  	this.setState({
  		childrenDrawer: false,
  		selectVisible: false,
  	})
  	this.props.verifyProblem();
  }

}

const mapStateToProps = (state) => {
	return {
		username: state.username,
		login: state.login,
		problemlist: state.problemlist,
		previewtitle: state.previewtitle,
		previewcontent: state.previewcontent,
		verifyproblem: state.verifyproblem
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleProblemList(){
			axios.get('http://47.99.212.81:80/api/problemlist').then((res)=>{
				const data=res.data;
				const action = {
					type: 'received_problemlist',
					value: data
				}
				dispatch(action);
			})
		},
		handlePreview(index){
			index=index+1;
			axios.get('http://47.99.212.81:80/api/previewproblem?index='+index).then((res)=>{
				const data=res.data;
				console.log(data);
				const action = {
					type: 'received_previewproblem',
					title: data.title,
					content: data.content
				}
				dispatch(action);
			})
		},
		verifyProblem(){
			const action = {
				type: 'verify_problem',
			}
			dispatch(action);
		},
		handleLogout(){
			const action = {
				type: 'logout'
			}
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherHeader);