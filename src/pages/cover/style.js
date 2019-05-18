import styled from 'styled-components';
import bianPicOriginal from '../../statics/bian.png'

export const LoginWhole = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    
    background-size: cover;
`;

export const Bian = styled.div`
    width: 200px;
    height: 200px;
    position: absolute;
    left: 25%;
    top: 20%;
    background: url(${bianPicOriginal});
    background-size: contain;
    transtion: all 1s ease-in;
`

export const ButtonRowPosition = styled.div`
    position: absolute
    left: 0;
    right: 0;
    top: 70%;
`;
export const ButtonColumnPosition = styled.div`
    width: 100px;
    margin: 0 auto;
`;