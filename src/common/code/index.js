import React, { Component } from 'react';
import { connect as connectStore} from 'react-redux';

import AceEditor from 'react-ace'

import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/html';
import 'brace/mode/python';
import 'brace/mode/javascript';
import 'brace/mode/php';
import 'brace/theme/chrome';
import 'antd/dist/antd.css'; 
// Render editor

import  {Select, Button}  from 'antd';
import {
	SelectCode,
	CodeEditor
} from './style.js'

const Option = Select.Option;

var stompClient = null;
//const onChange="123345556";

class Codeeditwrapper extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			codecontent: "",
			cursorrow: 0,
			cursorcolumn: 0,
			isfocus: false,
			language: "c_cpp"
		}
	}

	componentWillMount(){
		const Stomp = require('stompjs')
		var SockJS = require('sockjs-client')
		SockJS = new SockJS('http://47.99.212.81:80/livecode')
		stompClient = Stomp.over(SockJS)
		stompClient.connect({}, this.onConnected, this.onError);
	}

	onConnected = () => {
		if(this.props.identity==='teacher'){
			stompClient.subscribe('/teacher/code', this.onMessageReceived);
			stompClient.subscribe('/teacher/cursorposition', this.onCursorPositionReceived);
			stompClient.subscribe('/teacher/language', this.onLanguageReceived);
			stompClient.subscribe('/teacher/selection', this.onSelectionReceived);
		}
	}

  sendCode = (e)=>{
		this.setState(() => ({
			codecontent: e
		}))
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

  onLanguageReceived = (payload) => {
  	//this.props.handleChange(payload);
  	var message = JSON.parse(payload.body);
  	this.setState(() => ({
			language: message.codeContext
		}))
  }

  onMessageReceived = (payload) => {
  	var message = JSON.parse(payload.body);
		this.setState(() => ({
				codecontent: message.codeContext
		}))
	}

	onCursorPositionReceived = (payload) => {
		var message = JSON.parse(payload.body);
		
		this.setState(() => ({
				cursorrow: message.row,
				cursorcolumn: message.column
		}))
		//console.log(this.state.cursorcolumn);
		//this.ace.editor.selection.anchor.row= message.row;
		//this.ace.editor.selection.anchor.column= message.column;
		//this.ace.editor.selection.anchor.setPosition(message.row, message.column, true);
		//this.ace.editor.moveCursorToPosition(message);
		//this.ace.editor.moveCursorTo(message.row-1, message.column);
		//this.ace.editor.setWrapBehavioursEnabled(false);
		//this.ace.editor.selection.clearSelection();
		this.ace.editor.gotoLine(message.row, message.column, true);
		//console.log(this.ace.editor.selection.anchor.row);
		//console.log(this.ace.editor.selection.anchor.column);
		//ace.moveCursorToPosition(this.state.cursorrow, this.state.cursorcolumn);
	}
	onSelectionReceived = (payload) => {
		var message = JSON.parse(payload.body);
		const range = this.ace.editor.selection.getRange();
		range.setStart(message.startrow, message.startcolumn);
		range.setEnd(message.endrow, message.endcolumn);
		//console.log(message.isback);
		this.ace.editor.selection.setSelectionRange(range, message.isback);
	}

	render(){

		return (
			<div>
			<SelectCode>
			  <Select 
			  	defaultValue={this.state.language} 
			  	style={{ width: 240 }} 
			  	value={this.state.language} 
			  	onChange={this.handleLanguageChange.bind(this)} 
			  >
		      <Option value="c_cpp">c_cpp</Option>
		      <Option value="java">java</Option>
	    	  <Option value="python">python</Option>
		      <Option value="html">html</Option>
		      <Option value="javascript">javascript</Option>
		      <Option value="php">php</Option>
		    </Select>
		    <Button type='primary' style={{width: 80, left: 282}} onClick={this.test.bind(this)}> 提交 </Button>
		  </SelectCode>

		  <CodeEditor>
				<AceEditor
					ref={c => { this.ace = c; }}
				  mode= {this.state.language}
				  theme="chrome"
				  height="240px"
				  width="600px"
				  value={this.state.codecontent}
				  onChange={this.sendCode}
				  onCursorChange={this.sendCurse}
				  focus={true}
				  //onSelectionChange={this.sendSelection}
				  showPrintMargin={false}
				  //enableBasicAutocompletion={true}
					//enableLiveAutocompletion={true}

				/>
			</CodeEditor>
			

			</div>
		)
	}

	sendSelection(e){

		console.log('selection');
		stompClient.send("/app/selection",
      {},
      JSON.stringify(e.getCursor())
    )
	}

	test(){

		//console.log(flag);
		//const flag = this.ace.editor.selection.isEmpty();
		//const range = this.ace.editor.selection.getRange();
		//const region = this.ace.editor.selection.isBackwards();
		//console.log(region);
		//console.log(flag);
		//range.setStart(0,1);
		//range.setEnd(0,5);
		//this.ace.editor.selection.setSelectionRange(range, false);
	}

	componentDidMount(){
	}

	handleLanguageChange=(e)=>{
		this.setState(() => ({
			language: e 
		}))
		stompClient.send("/app/language",
      {},
      JSON.stringify({ 'codeContext': e })
    );
	}


	sendCurse= (e)=>{
		//console.log("number");
		//console.log(this.ace.editor.getCursorPositionScreen());


		//console.log(region.start.row);
		if(this.props.identity==='student'){
			//const data = this.state.codecontent;
			const region = this.ace.editor.selection.getRange();
			const back = this.ace.editor.selection.isBackwards()
			stompClient.send("/app/cursorposition",
	      {},
	      JSON.stringify(e.getCursor())
    	)
			if(this.ace.editor.selection.isEmpty() === false){
				const range = {
					startrow: region.start.row,
					startcolumn: region.start.column,
					endrow: region.end.row,
					endcolumn: region.end.column,
					isback: back,
				}
				console.log("range:")
				console.log(range);
				stompClient.send("/app/selection",
	      {},
	      JSON.stringify(range)
    	)
			}
    }
		else if(this.props.identity==='teacher'){
		}
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
		/*handleChange(e){
			console.log(e);
			const action = {
				type: 'change_language',
				value: e
			};
			dispatch(action);
		}*/
	}
}

export default connectStore(mapStateToProps, mapDispatchToProps)(Codeeditwrapper);