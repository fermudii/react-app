import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import bandera from '../../assets/pictures/Bandera.png';
import niñaBrinco from '../../assets/pictures/niña-brinco.png';
import Logo from '../../assets/img/logo.png';
import Beneficiarios from './Beneficiarios';
import CarrouselDeportes from './CarrouselDeportes';
import lineaColores from '../../assets/pictures/linea-colores.png';
import QuienesSomos from './QuienesSomos';
import Blog from './Blog';
import '../../stylesheets/dashboard/dashboard.css';
import $ from 'jquery';
import Ejem from './ejem';
import MisVis from './MisVis';
import Historia from './Historia';
import Valores from './Valor';
import Valor from './Valor';
import Somos from './Somos';
import Academia from './Academia';
import Beneficiar from './Beneficiar';
import LogoComponent from './Logo';

class Contenido extends Component {
    state = { 
        width: 0, 
        height: 0,
    };

    componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    render() {
        $(document).ready(function() {
            $('a[href^="#"]').click(function() {
                var destino = $(this.hash);
                if (destino.length == 0) {
                    destino = $('a[name="' + this.hash.substr(1) + '"]');
                }
                if (destino.length == 0) {
                    destino = $('html');
                }
                $('html, body').animate({ scrollTop: destino.offset().top }, 500);
                return false;
            });
        });
        return (
            <div>
             {this.state.width >= 1000 ? (
                <div>
                <br/>
                <br/>
                <Row type="flex" justify="start">
                    <Col xs={{span: 23, order: 2}} md={{span: 8, order: 1}}>
                       
                       {/*  <p className="tituloContenido">El  <strong style={{color: '#F6B451'}}>programa</strong> dedicado a ayudar</p>
                        <p className="subtituloContenido">a los niños y niñas de primaria mayor a alcanzar sus sueños fomentando la autonomía, la confianza y la ayuda.</p>
                        */}
                        <Row type="flex" justify="start">
                            
                        </Row>
                        <Row type="flex" justify="start">
                          {/*   <Col xs={24} md={12}>
                                <img src={niñaBrinco} className="niñaBrinco" />
                            </Col> */}
                            <Col xs={{span: 20, offset: 10}} md={{span: 9, offset: 10}} className="logoBoton">
                                {/*<img src={Logo} /> */}
                                <img src={Logo} className='logoinicio'/> 
                                <a href="#Empezar"><Button size="large" className="btnEmpezar">¿QUIÉNES SOMOS?</Button></a>
                            </Col>
                        </Row>
                    </Col>
                   {/*  <Col xs={{span: 21, order: 1}} md={{span: 12, order: 2, offset: 2}}>
                        <img src={bandera} className="banderaImg"/>
                    </Col> */}
                </Row>
                <Somos/>
                <Historia/>
                <MisVis/>
                <Col span={24}>
                </Col>
                <Valor/>
                <Academia/>
                <Beneficiar/>
                <CarrouselDeportes/>
                 <Col span={24}>
                    <img style={{width: '100%'}} src={lineaColores}/>
                </Col>
                <br/>
                <Ejem />
                {/* <Col span={24}>
                    <img style={{width: '100%'}} src={lineaColores}/>
                </Col> * */}
             </div>
             ):(
                <div>
                <br/>
                <br/>
                {this.state.width <= 900 && this.state.width >= 600  ? (
                    <div>
                    <br/>
                    <br/>
                    <LogoComponent/>
                    </div>
                ):(<LogoComponent/>)}
                <Somos/>
                <Historia/>
                <MisVis/>
                <Col span={24}>
                </Col>
                <Valor/>
                <Academia/>
                <Beneficiar/>
                <CarrouselDeportes/>
                 <Col span={24}>
                    <img style={{width: '100%'}} src={lineaColores}/>
                </Col>
                <br/>
                <Ejem />
                {/* <Col span={24}>
                    <img style={{width: '100%'}} src={lineaColores}/>
                </Col> * */}
             </div>
             )}
            </div>
            

        );
    }
}

export default Contenido;

