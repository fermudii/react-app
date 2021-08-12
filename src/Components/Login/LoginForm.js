import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../../stylesheets/Login/LoginForm.css';

import { connect } from "react-redux";

const FormItem = Form.Item;

class Login extends Component {
  render() {
  	const { getFieldDecorator } = this.props.form;
  	const { fetchingLogin, tokenLogin, onRequestLogin, errorLogin, usuario } = this.props;

  	const handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, loginInfo) => {
	      if (!err) {
	      	onRequestLogin(loginInfo);
	      }
	    });
	  }

    return (
    	<Form onSubmit={handleSubmit}>
	        <FormItem>
	          {getFieldDecorator('userName', {
	            rules: [{ required: true, message: 'Por favor ingrese el usuario.' }],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: 'Por favor ingrese la contraseña.' }],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
	          )}
	        </FormItem>
	        <FormItem className="btnCenter">
	          <Button htmlType="submit" className="btnLogin" size="large" loading={fetchingLogin}>
	            Iniciar Sesión
	          </Button>
	        </FormItem>
	    </Form>
    );
  }
}

const mapStateToProps = state => {
	return {
	    fetchingLogin: state.LoginReducer.fetchingLogin,
	    usuario: state.LoginReducer.usuario,
	    errorLogin: state.LoginReducer.errorLogin,
	  };
};

const mapDispatchToProps = dispatch => {
	return {
	  	onRequestLogin: (loginInfo) => {
	    	dispatch({ type: "LOGIN_API_CALL_REQUEST", loginInfo:loginInfo });
	    }
	};
};


export default connect(mapStateToProps, mapDispatchToProps) (Form.create()(Login));

