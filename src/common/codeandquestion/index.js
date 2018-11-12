import React, { Component } from 'react';


import Questionwrapper from '../question';
import Codeeditwrapper from '../code';

import{
	WholePage,
	LeftArea,
	RightArea
}from './style'


class Codeandquestion extends Component{

	render(){
		return (

				<WholePage>
					<LeftArea>
						<Questionwrapper/>
					</LeftArea>
					<RightArea>
						<Codeeditwrapper/>
					</RightArea>
				</WholePage>	


		)
	}
}

export default Codeandquestion;