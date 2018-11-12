import React, { Component } from 'react';
import { connect as connectStore} from 'react-redux';

import brace from 'brace';
import AceEditor from 'react-ace'

import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/html';
import 'brace/mode/python';
import 'brace/theme/chrome';
import 'antd/dist/antd.css'; 
// Render editor

import  {Select}  from 'antd';
import {
	SelectCode,
	CodeEditor
} from './style.js'

const Option = Select.Option;

var stompClient = null
//const onChange="123345556";
class Codeeditwrapper extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			codecontent: ""
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
  	if(this.props.identity==='teacher'){
  		stompClient.subscribe('/teacher/code', this.onMessageReceived);
  	}
  }

  sendCode = (e)=>{

  	//console.log('e:', e);
			this.setState(() => ({
				codecontent: e
			}))
		const data = this.state.codecontent;

  	if(this.props.identity==='student'){
				stompClient.send("/app/code",
	      {},
	      JSON.stringify({ 'codeContext': this.state.codecontent })
    	);
    }
  }
  onError = (error) => {
    console.log("error");
  }

  onMessageReceived = (payload) => {
  	console.log("234");
  	var message = JSON.parse(payload.body);
  	
		this.setState(() => ({
				codecontent: message.codeContext
		}))
	}

	render(){


		return (
			
			<div>
			<SelectCode>
			  <Select defaultValue={"html"} style={{ width: 240 }} onChange={this.props.handleChange}>
		      <Option value="c_cpp">c_cpp</Option>
	  	    <Option value="java">java</Option>
	    	  <Option value="python" >python</Option>
		      <Option value="html">html</Option>
		    </Select>
		  </SelectCode>

		  <CodeEditor>
				<AceEditor
				  mode= {this.props.language}
				  theme="chrome"
				  height="380px"
				  width="555px"
				  value={this.state.codecontent}
				  onChange={ this.sendCode }
				/>
			</CodeEditor>	
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
			language: state.language,
			identity: state.identity
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleChange(e){
			//console.log(e);
			const action = {
				type: 'change_language',
				value: e
			};
			dispatch(action);
		},
	}
}

export default connectStore(mapStateToProps, mapDispatchToProps)(Codeeditwrapper);