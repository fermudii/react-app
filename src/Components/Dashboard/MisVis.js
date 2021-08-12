import React, { Component } from 'react';
import '../../stylesheets/dashboard/dashboard.css';
import { Row, Col, Icon } from 'antd';
import imag from '../../assets/img/m y v.png';

class MisVis extends Component {
    render() {
        return (
            <div className='fondoBlanco'>
                <br/>
                <br/>
                <Row type='flex' justify='space-around' className='margenes'>
                    <Col lg={24}>
                        <Row type='flex' justify='space-around'>
                            <Col sm={24} md={24} lg={9}>
                                <img src={imag} className='imgHistoria'/>
                            </Col>
                            
                            <Col sm={24} md={24} lg={15}> 
                                <Row type='flex' justify='space-around'>
                                    <Col lg={18}>
                                        <p className='TituloAz'>MISIÓN</p>
                                        <p className='TextGeneral'>Fomentar y potenciar la autonomía de los niños y las niñas de primaria mayor, ayudándolos a superar las rupturas sociales que limitan su desarrollo, a través de la activación de redes de apoyo escolar, familiar y comunitario. </p>
                                    </Col>
                                    <Col lg={18}>
                                        <p className='TituloMo'>VISIÓN</p>
                                        <p className='TextGeneral'>Convertir nuestro programa en un modelo de intervención social para aumentar el número de niños y niñas con habilidades para modificar y mejorar su entorno, a partir de sus propias capacidades potencializadas.</p>
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

export default MisVis;