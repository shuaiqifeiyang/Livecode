import React, { Component } from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { Spring } from 'react-spring';
import './style.css';
import { 
	LoginWhole,
	ButtonRowPosition,
	ButtonColumnPosition
} from './style';


class Coverpage extends Component{
	
	render(){
			return(
				<LoginWhole>
					<Spring
						config={{tension: 100, friction: 26, precision: 0.01, delay: 0}}
						from={{ opacity: 0 }}
						to={{ opacity: 1 }}>
						{props => <div style={props} className='mian'></div>}
					</Spring>
					<Spring
						config={{tension: 100, friction: 26, precision: 0.01, delay: 0}}
						from={{ opacity: 0 }}
						to={{ opacity: 1 }}>
						{props => <div style={props} className='shi'></div>}
					</Spring>

					<Spring
						config={{tension: 100, friction: 26, precision: 0.01, delay: 250}}
						from={{ opacity: 0 }}
						to={{ opacity: 1 }}>
						{props => <div style={props} className='bian'></div>}
					</Spring>
					<Spring
						config={{tension: 100, friction: 26, precision: 0.01, delay: 125}}
						from={{ opacity: 0 }}
						to={{ opacity: 1 }}>
						{props => <div style={props} className='cheng'></div>}
					</Spring>

					<Spring
						config={{tension: 100, friction: 26, precision: 0.01, delay: 125}}
						from={{ opacity: 0 }}
						to={{ opacity: 1 }}>
						{props => <div style={props} className='xi'></div>}
					</Spring>
					<Spring
						config={{tension: 100, friction: 26, precision: 0.01, delay: 250}}
						from={{ opacity: 0 }}
						to={{ opacity: 1 }}>
						{props => <div style={props} className='tong'></div>}
					</Spring>

					<ButtonRowPosition>
                        <p style={{textAlign: "center"}}><a href="https://www.youtube.com/watch?v=Qg42OakU8HQ"> How to use the website? </a></p>
                        
						<ButtonColumnPosition>
							<NavLink to='/login/'>
							<Button type="primary" style={{width: 100}}> Enter </Button>
							</NavLink>
                            
						</ButtonColumnPosition>
					</ButtonRowPosition>
				</LoginWhole>
			)

	} 
}


export default Coverpage;