import React, { Component } from 'react';
import '../../stylesheets/dashboard/dashboard.css';
import { Row, Col, Icon } from 'antd';
import imag from '../../assets/img/valor.png';
import laz from '../../assets/img/Laz.png';

class Valor extends Component {
    render() {
        return (
            <div className='fondoBlanco'>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row type='flex' justify='space-around' className='fondoAzul'>
                    <Col lg={24} >
                        <Row type='flex' justify='space-around'>
                            <Col sm={24} lg={10}> 
                                <Row type='flex' justify='space-around'>
                                    <Col xs={24} md={8} >
                                        <br/>
                                        <b className='TituloAz'>VALORES</b>
                                    </Col>
                                    <Col xs={24} md={18}>
                                        <br/>
                                        <b className='TextGeneral'style={{color: '#FFB300'}}>Perseverancia</b>
                                        <p className='TextGeneral2'>Ser constante hasta el cumplimiento de las metas</p>
                                        <br/>
                                        <b className='TextGeneral'style={{color: '#551586'}}>Optimismo</b>
                                        <p className='TextGeneral2'>Capacidad de encontrar el aspecto positivo en personas, situaciones y cosas</p>
                                        <br/>
                                        <b className='TextGeneral'style={{color: '#0480B7'}}>Empatía</b>
                                        <p className='TextGeneral2'>Ser capaz de participar afectiva y efectivamente en la realidad del otro para potenciar sus capacidades</p>
                                        <br/>
                                        <b className='TextGeneral'style={{color: '#B10862'}}>Coherencia</b>
                                        <p className='TextGeneral2'>Actuar en consecuencia con los principios y modos de la misión y visión del programa</p>
                                        <br/>
                                        <b className='TextGeneral'style={{color: '#FFB300'}}>Creatividad</b>
                                        <p className='TextGeneral2'>Desarrollar ideas nuevas y apropiadas para alcanzar las metas personales, grupales y de equipo</p>
                                        <br/>
                                        <b className='TextGeneral'style={{color: '#551586'}}>Responsabilidad</b>
                                        <p className='TextGeneral2'>Reconocer y aceptar las consecuencias de un hecho realizado libremente</p>
                                        <br/>
                                        <b className='TextGeneral'style={{color: '#0480B7'}}>Respeto</b>
                                        <p className='TextGeneral2'>Reconocer y aceptar en cada persona y situación el valor intrínseco que posee y a partir de ello, abrir oportunidades de mejora.</p>
                                        <br/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={24} lg={14} className='margenImg'>
                                <img src={imag} className='imgHistoria'/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Valor;