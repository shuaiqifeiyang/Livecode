import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './loginformstyle.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleLogin(values.userName, values.password);
      }
    });
  }

  render() {


    const { getFieldDecorator } = this.props.form;

      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="http://www.github.com">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="http://www.github.com">register now!</a>
          </FormItem>
        </Form>
      )

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
    handleLogin(account, password){
      axios.get('http://localhost:8080/login?username=' + account + "&password=" + password).then((res)=>{
        const data=res.data;
        console.log(data);
        if(data.login){
          const action = {
            type: 'login_success',
            identity: data.identity,
            username: account,
            password: password
          };
          dispatch(action);
        }else{
          alert("username or password is wrong");
        }
      }).catch(() => {
        console.log("error");
      })
    }, 
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default connect(mapState, mapDispatch)(WrappedNormalLoginForm);
