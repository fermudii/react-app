import React, { Component } from 'react';
import '../../stylesheets/dashboard/dashboard.css';
import { Row, Col, Icon } from 'antd';
import lam from '../../assets/img/Lam.png';
import imag from '../../assets/img/valor.png';

class Somos extends Component {
    render() {
        return (
            <div className='fondoBlanco'>
                <Row type='flex' justify='space-around'>
                    <Col lg={24}>
                        <Row type='flex' justify='space-around' id="Empezar">
                            <Col md={24}> 
                                <Row type='flex' justify='space-around'>
                                    <Col md={24} className='centrar'>
                                        <b className='TituloG'>¿QUIÉNES  </b>
                                        <b className='TituloAm'>SOMOS?</b>
                                        <br/>
                                        <img src={lam} className='lineasT'/>
                                        <p className='TextGeneral'>Tejiendo Redes por los Niños es un programa convencido de que los niños son el presente de nuestra sociedad y busca ayudarlos a alcanzar su plenitud, fomentando su autonomía a través de redes de apoyo y la formación de capital social.</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Somos;