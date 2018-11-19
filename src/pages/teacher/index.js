import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import Questionwrapper from '../../common/question';
import TeacherHeader from '../../common/teacherheader';
import Codeeditwrapper from '../../common/code';

import { StudentWhole, MainPage } from './style';
class Teacherpage extends Component{
	
	render(){
		return (
			<div>
			
			<StudentWhole>
			<TeacherHeader/>
				<MainPage>
				
			    <Row>
			      <Col span={12}><Questionwrapper/></Col>
			      <Col span={11}><Codeeditwrapper/></Col>
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

