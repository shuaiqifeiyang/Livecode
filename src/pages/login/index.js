import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import axios from 'axios';
import { Input, Icon, Button } from 'antd';
import NormalLoginForm from './loginform'
import { 
	LoginWrapper, 
	LoginBox,
	TitleWrapper,
	LoginWhole
} from './style';



class Loginpage extends Component{
	
	/*ComponentWillMount(){
		console.log(this.props.login);
	}*/
	render(){
		const Islogin = this.props.login;
    	const Identity = this.props.identity;
		if(!Islogin){
			return (
				<LoginWhole>
					<LoginBox>
						<TitleWrapper> 登录 </TitleWrapper>
						<LoginWrapper>
							<NormalLoginForm/>
						</LoginWrapper>
					</LoginBox>	
				</LoginWhole>
			)
		}    
		else {
		    if( Identity === 'student'){
		      return <Redirect to='/student'/>
		    }
		    else if( Identity === 'teacher'){
		      return <Redirect to='/teacher'/>
		    }
		    else{
		      return <div>{Identity}</div>
		    }
	    }
	}
}

const mapState = (state) => {
	return{
		username: state.username,
		password: state.password,
		login: state.login,
		identity: state.identity
	}
}

const mapDispatch = (dispatch) => {
	return{
		
		
	}
}

export default connect(mapState, mapDispatch)(Loginpage);


