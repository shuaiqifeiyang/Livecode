import React, { Component } from 'react';
import { connect as connectStore} from 'react-redux';
import 'antd/dist/antd.css';  
import { Card } from 'antd';
import { QuestionCard } from './style'

const ReactMarkdown = require('react-markdown')


var stompClient = null;
class Questionwrapper extends Component{

	componentWillMount(){
    const Stomp = require('stompjs')
    var SockJS = require('sockjs-client')
    SockJS = new SockJS('http://localhost:8080/livecode')
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, this.onConnected, this.onError);
	}
  onConnected = () => {
  	//if(this.props.identity==='student'){
  		stompClient.subscribe('/student/problem', this.onProblemReceived);

  }

  onProblemReceived=(payload)=>{
  	var message = JSON.parse(payload.body);
  	this.props.handlePreview(message);
  	this.props.verifyProblem();
  }
	render(){
		return (
			<QuestionCard>
				<Card
				  title={this.props.problemverify ? this.props.title : (this.props.identity==="teacher" ? "please select question" : "please wait teacher select")}
				  //extra={<a href="#">More</a>}
				  style={{ width: 600, bordered: false}}
				>

				<ReactMarkdown source={this.props.problemverify?this.props.content:""} />		   
				</Card>
			</QuestionCard>
		)
	}
}
const mapStateToProps = (state) => {
	return {
			identity: state.identity,
			problemverify: state.verifyproblem,
			title: state.previewtitle,
			content: state.previewcontent
	}
}

const mapDispatchToProps = (dispatch) => {
	
	return {
		handlePreview(data){
			const action = {
				type: 'received_previewproblem',
				title: data.title,
				content: data.content
			}
			dispatch(action);
		},
		verifyProblem(){
			const action = {
				type: 'verify_problem',
			}
			dispatch(action);
		}
	}
}

export default connectStore(mapStateToProps, mapDispatchToProps)(Questionwrapper);
