import React, { Component } from 'react';
import { Row, Col, Icon, Button } from 'antd';
import lineaMorada from '../../assets/pictures/lineaMorada.png';
/* import graficoNiñas from '../../assets/pictures/grafico-niñas.png'; */
import '../../stylesheets/dashboard/dashboard.css';


class Contenido extends Component {
    render() {
        return (
            <div className="fondoBlanco">
                <div className="cuadradoCurvo">
                    <Row type="flex" justify="end">
                        <Col xs={24} md={12}>
                            <img src={lineaMorada} className='lineaMorada' />
                        </Col>
                    </Row>
                </div>
               
                <Row>
                    <Col span={24}>
                        <div className="fondoBeneficiarios">
                            <Row type='flex' justify='center'>
                                <br/>
                                <br/>
                                <br/>

                                <Col xs={22} md={10}>
                                  {/*   <img src={graficoNiñas} className='graficoNiñas'/> */}
                                </Col>
                                <Col xs={22} md={{span: 9, offset: 1}}>
                                    <br/>
                                    <br/>
                                    <h1 className="tituloContenido" id="Empezar">Beneficiarios</h1>
                                    <p className="subtituloContenido">Actualmente se activan redes escolares en 16 grupos de primaria mayor, con más de 500 niños en el programa de las escuelas:</p>
                                    <br/>
                                    <p className="beneficiarios"><Icon type="check-circle" className="checkCircle" theme="filled"/> Ricardo Flores Magón</p>
                                    <br/>
                                    <br/>
                                    <p className="beneficiarios"><Icon type="check-circle" className="checkCircle" theme="filled"/> Enrique Flores Magón</p>
                                    <br/>
                                    <br/>
                                    <p className="beneficiarios"><Icon type="check-circle" className="checkCircle" theme="filled"/> Urbana 8, 24 de Febrero</p>
                                    <br/>
                                    <br/>
                                    <Row type='flex' justify='space-between'>
                                        <Col xs={24} md={9}>
                                            <Button size="large" className="quieroAyudar">Quiero ayudar <Icon type="smile" theme="filled" /></Button>
                                            <br/>
                                            <br/>
                                            <br/>
                                        </Col>
                                        <Col xs={24} md={{span: 9, offset: 1}}>
                                            <Button size="large" className="verVideo">Ver video <Icon type="play-circle" theme="filled"/></Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Contenido;

