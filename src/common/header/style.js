import styled from 'styled-components';
import logoPic from '../../statics/logo.png'

export const HeaderWrapper = styled.div`
	position: relative;
	height: 46px;
	background: #001529;
	
`

export const Logo = styled.a`
	position: absolute;
	top: 0;
	left: 0;
	width: 180px;
	height: 46px;
	//border-bottom: 1px solid #f0f0f0;
	background: url(${logoPic});
	background-size: contain;
`

export const UserInfo = styled.div`
	position: absolete;
	top: 0;
	right: 0;
	width: 556px;
	height: 46px;
	float: right;
	//background: red;
`

export const UserInfoItem = styled.div`
	line-height: 46px;
	padding-right: 15px;
	padding-left: 15px;
	&.Online{
		float: left;
	}
	&.Now{
		float: right;
	}
	font-size: 14px;
	color: #969696;
`

export const OnlineUserList = styled.ul`
	
`