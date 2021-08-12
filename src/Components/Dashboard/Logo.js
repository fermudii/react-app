import React, { Component } from 'react';
import '../../stylesheets/dashboard/dashboard.css';
import { Row, Col, Button } from 'antd';
import logoResposive from '../../assets/pictures/logo-color.png'
import nina from '../../assets/img/niña.png';

class Logo extends Component {
    render() {
        return (
            <div>
                    <Row>
                    <Col className="logoBoton" span={20}>
                        <img src={logoResposive} className='logoinicioResponsive'/> 
                        <a href="#Empezar"><Button size="small" className="btnEmpezar2" style={{marginTop:10}}>¿QUIÉNES SOMOS?</Button></a>
                        <br/>
                        <br/>
                    </Col>
                    <Col span={24}>
                    <img className='logoinicioResponsive' src={nina}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Logo;
