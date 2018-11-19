import React, { Component } from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { 
	LoginWhole,
	ButtonPosition
} from './style';

class Coverpage extends Component{
	
	render(){
			return(
				<LoginWhole>
					<ButtonPosition>
						<NavLink to='/login/'>
						<Button type="primary" style={{width: 100}}> 进入 </Button>
						</NavLink>
					</ButtonPosition>
				</LoginWhole>
			)

	} 
}


export default Coverpage;