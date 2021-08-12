import React, { Component } from 'react';
import '../../stylesheets/dashboard/dashboard.css';
import { Row, Col, Icon, Card } from 'antd';
import imag from '../../assets/img/ENRIQUE.png';
import imag2 from '../../assets/img/URBANA.png';
import imag3 from '../../assets/img/RICARDO.png';
import lmo from '../../assets/img/Lmo.png';
import lro from '../../assets/img/Lro.png';
import laz from '../../assets/img/Laz.png';
import lam from '../../assets/img/Lam.png';

class Beneficiar extends Component {
    render() {
        return (
            <div className='fondoBlanco'>
                <br/>
                <br/>
                <Row type='flex' justify='space-around' className='margenes'>
                    <Col xs={24} md={18} className='centrar'>
                        <p className='TituloMo'>BENEFICIARIOS</p>
                        <img src={lmo} className='lineasTit'/>
                        <p className='TextGeneral'>Actualmente se activan redes escolares en 16 grupos de primaria mayor, con más de 500 niños en el programa de las escuelas:</p>
                        <br/>
                        <br/>
                    </Col>
                    <Col xs={22} md={22} className='centrar'>
                        <Row type='flex' justify='space-around'>
                            <Col sm={24} md={24} lg={7}> 
                                <Card className="cardEscuelasRo">
                                <Row type='flex' justify='space-around'>
                                    <Col xs={10} md={23}>
                                        <img src={imag} className='imgHistoria'/>
                                    </Col>
                                    <Col md={23} lg={23} >
                                        <p className='TRo'>Enrique Flores Magón</p>
                                        <img src={lro} className='lineas'/>
                                        <p className='centrarTxt'>Celerino Navarro 202</p>
                                        <p className='centrarTxt'>Col. Rancho Nuevo</p>
                                        <p className='centrarTxt'>Guadalajara, Jal. CP. 44240</p>
                                    </Col>
                                </Row>
                                </Card>
                            </Col>
                            <Col sm={24} md={24} lg={7}> 
                                <Card className="cardEscuelasAz">
                                    <Row type='flex' justify='space-around'>
                                    
                                        <Col xs={10} md={23}>
                                            <img src={imag2} className='imgHistoria'/>
                                        </Col>
                                        <Col md={23} lg={23}>
                                            <p className='TAz'>Urbana 208, 24 de febrero</p>
                                            <img src={laz} className='lineas'/>
                                            <p className='centrarTxt'>Teruel 3299 </p>
                                            <p className='centrarTxt'>Col. Santa Elena de la Cruz</p>
                                            <p className='centrarTxt'>Guadalajara, Jal. CP. 44230</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col sm={24} md={24} lg={7}> 
                                <Card className="cardEscuelasAm">
                                    <Row type='flex' justify='space-around'>
                                        <Col xs={10} md={23}>
                                            <img src={imag3} className='imgHistoria'/>
                                        </Col>
                                        <Col md={23} lg={23}>
                                            <p className='TAm'>Ricardo Flores Magón</p>
                                            <img src={lam} className='lineas'/>
                                            <p className='centrarTxt'>Praxedis Guerrero 20012 </p>
                                            <p className='centrarTxt'>Col. Ricardo Flores Magón</p>
                                            <p className='centrarTxt'>Guadalajara, Jal. CP. 44240</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>                         
                            
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Beneficiar;