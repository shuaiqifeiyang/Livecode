import styled from 'styled-components';
import coverPicOptical from '../../statics/cover2.png'
export const LoginWhole = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: url(${coverPicOptical});
    background-size: cover;

`;

export const LoginWrapper = styled.div`
    
    width: 240px;
    margin: 0 auto;
    padding-top: 35px;
    bottom: 0;
`;

export const LoginBox = styled.div`
    width: 330px;
    height: 380px;
    margin: 80px auto;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.1);·    
`;
export const TitleWrapper = styled.div`
 	text-align:center;
    padding-top: 28px;
   	margin: 0 auto;
    font-size: 30px;
    color: #7b7b8c;
    letter-spacing: 3px;
`;
