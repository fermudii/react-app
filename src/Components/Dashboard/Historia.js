import React, { Component } from 'react';
import '../../stylesheets/dashboard/dashboard.css';
import { Row, Col, Icon } from 'antd';
import lro from '../../assets/img/Lro.png';
import imag from '../../assets/img/his.png';

class Historia extends Component {
    render() {
        return (
            <div className='fondoBlanco'>
                <br/>
                <Row type='flex' justify='space-around' className='margenes'>
                    <Col xs={24} lg={24}>
                        <Row type='flex' justify='space-around'>
                            <Col sm={24} md={24} lg={14}> 
                                <Row type='flex' justify='space-around'>
                                    <Col md={24} className='centrar'>
                                        <b className='TituloG'>NUESTRA  </b>
                                        <b className='TituloRo'>HISTORIA</b>
                                    </Col>
                                    <Col lg={18} className='centrar'>
                                        <img src={lro} className='lineasT'/>
                                    </Col>
                                
                                    <Col lg={18}>
                                        <p className='TextGeneral'>Con el impulso del gobierno municipal de Guadalajara, en 2014 iniciamos con la creación de un modelo de intervención en redes de apoyo social como herramienta de empoderamiento de los niños y las niñas, para lograr que en libertad digan YO NO QUIERO, ante las profundas dificultades de su ambiente.</p>
                                        <br/>
                                        <p className='TextGeneral'>El objetivo es lograr que los niños y niñas opten por una vida sana a través de la formación de competencias para la autonomía, unidos por redes de apoyo social y comunitario. Impactamos en su futuro al darles herramientas personales, que no dependen de las condiciones de su entorno familiar y social.</p>
                                        <br/>
                                        <p className='TextGeneral'>Desde el ciclo escolar 2015-2016 comenzamos a aplicar la metodología de Redes que permite la configuración de apoyos entre iguales –en este caso, los niños y las niñas– mejorando a los mismos actores de la red y el entorno afectivo y efectivo para pueden enfrentarse con mejores herramientas a la problemática que viven tanto en grupo, como individualmente.</p>
                                        <br/>
                                        <p className='TextGeneral'>Desde entonces y de manera ininterrumpida, hemos trabajado con los niños y niñas de 4to., 5to. y 6to. de primaria en las escuelas Ricardo Flores Magón, Enrique Flores Magón y la Urbana 24 de febrero, en las comunidades de Rancho Nuevo, Flores Magón y Santa Elena de la Cruz, en la ZMG.</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={24} md={24} lg={10} className='margenes'>
                                <img src={imag} className='imgHistoria'/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Historia;