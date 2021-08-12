import React, { Component } from 'react';
import '../stylesheets/Login/Login.css';
import { Row, Col, Alert} from 'antd';

import LoginCmp from "../Components/Login/LoginForm";
import logo from "../assets/pictures/logo-cuadrado.png";

import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";


class Login extends Component {
    render() { 
        const {isAuthenticated,errorLogin} = this.props;

        if (isAuthenticated) {
            return (
                <Redirect to='/dashboard' />
            )
        }

        function ErrorLoginAlert(props) {
            if (!props.errorLogin) {
                return null;
            }

            return (
                <Alert message="Inicio de sesión inválida. Por favor intente de nuevo." type="error" showIcon />
            );
        }

        return (
            <div className="login-form">
                <br/>
                <br/>
                <br/>
                <Row type="flex" justify="space-around">
                    <Col xs={23} md={23}><img alt="Kali" src={logo} className="login-logo"/></Col>
                </Row>
                <br/>
                <br/>
                <Row type="flex" justify="space-around">
                    <Col span={9}><ErrorLoginAlert errorLogin={errorLogin} /></Col>
                </Row>

                <Row type="flex" justify="space-around">
                    <Col xs={23} sm={9}><LoginCmp/></Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
	    isAuthenticated: state.LoginReducer.isAuthenticated,
	    errorLogin: state.LoginReducer.errorLogin,
	};
};

export default connect(mapStateToProps) (Login);

