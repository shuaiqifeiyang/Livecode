import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import Questionwrapper from '../../common/question';
import Header from '../../common/header';
import Codeeditwrapper from '../../common/code';
import Chatwrapper from '../../common/chat';
import Videowrapper from '../../common/video';

import { StudentWhole, MainPage } from './style';
class Studentpage extends Component{

	render(){
		return (
			<div>
			
			<StudentWhole>
				<Header/>
					<MainPage>
						<Row>
							<Col span={12}>
								<Questionwrapper/>
							</Col>
							<Col span={12}>
								<Codeeditwrapper/> 
								<Row>
									{/*<Col span={14}>
										<Chatwrapper/> 
									</Col>*/}
									<Chatwrapper/> 
									{/*<Col span={10}>
										<Videowrapper/>
									</Col>*/}
								</Row>
							</Col>
						</Row>
					</MainPage>
				</StudentWhole>
			</div>
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


