import React, { Component } from 'react';
import 'antd/dist/antd.css';  

import { Card } from 'antd';

class Questionwrapper extends Component{

	render(){
		return (
			<Card
			  title="题目1"
			  //extra={<a href="#">More</a>}
			  style={{ width: 520, bordered: false}}
			>		   
			</Card>
		)
	}
}

export default Questionwrapper;