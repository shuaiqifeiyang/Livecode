import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import NormalLoginForm from './loginform'
import { 
	LoginWrapper, 
	LoginBox,
	TitleWrapper,
	LoginWhole,
} from './style';

class Loginpage extends Component{
	
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
		login: state.login,
		identity: state.identity
	}
}

const mapDispatch = (dispatch) => {
	return{
	}
}

export default connect(mapState, mapDispatch)(Loginpage);


