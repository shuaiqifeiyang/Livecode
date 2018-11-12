import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';  

import { Card } from 'antd';


class Debugpage extends Component{


	render(){
		return (

			
			<div>
			<Card
			  title={this.props.question}
			  //extra={<a href="#">More</a>}
			  style={{ width: 520, bordered: false}}
			>		
			  
			</Card>
			<button onClick={this.handleClick.bind(this)}> yes </button> 
			</div>
		)
	}

	handleClick(){
		/*var stompClient = null;
		var socket = new SockJS('/gs-guide-websocket');

		stompClient = Stomp.over(socket);

		stompClient.connect({}, function (frame) {

	        console.log('Connected: ' + frame);
	        stompClient.subscribe('/topic/greetings', function (greeting) {
	            console.log(greeting.body);
	        });
	    });
		stompClient.send("/app/hello", {}, JSON.stringify({'name': 'lee'}));*/
		/*var stompClient = null;
		var SockJS = require('sockjs-client')
		const Stomp = require('stompjs')
	    
	    SockJS = new SockJS('http://localhost:8080/gs-guide-websocket')
	    stompClient = Stomp.over(SockJS);
	    stompClient.connect({}, this.onConnected, this.onError);*/
	}
}



const mapState = (state) => {
	return{
		question: state.question
		
	}
}

const mapDispatch = (dispatch) => {
	return{
		
	}
}


export default connect(mapState, mapDispatch)(Debugpage);