import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import Questionwrapper from '../../common/question';
import TeacherHeader from '../../common/teacherheader';
import Codeeditwrapper from '../../common/code';
import Chatwrapper from '../../common/chat';
import Videowrapper from '../../common/video';

import { StudentWhole, MainPage } from './style';
class Teacherpage extends Component{
	
	render(){
		return (
			<div>
			
			<StudentWhole>
			<TeacherHeader/>
				<MainPage>
				
			    <Row>
			    	<Col span={12}>
			    		<Questionwrapper/>
			    	</Col>
			    	<Col span={12}>
			    		<Codeeditwrapper/> 
			    		<Row>
			    			<Col span={14}>
			    				<Chatwrapper/> 
			    			</Col>
			    			<Col span={10}>
								<Videowrapper/>
			    			</Col>
			    		</Row>
			    	</Col>
			    </Row>
			  </MainPage>
		  </StudentWhole>
			</div>	
		)
	}

	/*componentDidMount(){

		var stompClient = null;
		var SockJS = require('sockjs-client')
		const Stomp = require('stompjs')
	    
	    SockJS = new SockJS('http://47.99.212.81:80/livecode');
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

