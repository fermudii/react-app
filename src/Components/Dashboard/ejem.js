import React, { Component } from 'react';
import '../../stylesheets/dashboard/dashboard.css';
import { Row, Col, Icon } from 'antd';
import imag from '../../assets/pictures/logo-color.png';
import tel from '../../assets/img/tel.png';
import instagram from '../../assets/img/instagram.png';
import youtube from '../../assets/img/youtube.png';
import ubica from '../../assets/img/ubica.png';
import face from '../../assets/img/face.png';

class ejem extends Component {
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
        return (
            <div className='fondoAzul'>
            <br/>
                <Row type='flex' justify='space-around' className='margenes'>
                    <Col sm={24} md={22} xs={22} >
                        <Row type='flex' justify='space-around'>
                            <Col sm={24}  md={9}>
                                <img src={imag} className='imgHistoria'/>
                            </Col>
                            <Col sm={24}  md={3}>
                                <br/>
                            </Col>
                            <Col sm={24}  md={10}> 
                                <Row type='flex' >
                                    <Col xs={5} md={2}>
                                        <a href="https://www.facebook.com/tejiendoRedesXNinos" target="_blank"><img src={face} className='imgHistoria'/></a>
                                    </Col>
                                    <Col xs={5} md={1}>
                                        <br/>
                                    </Col>
                                    <Col sm={24} xs={14} md={13}>
                                        <p className='Textdatos'>Tejiendo redes x los niños </p>
                                        <br/>
                                    </Col>
                                </Row>
                                <Row type='flex'>
                                    <Col xs={5} md={2}>
                                        <a href="https://www.instagram.com/tejiendoredesporlosninos/?hl=es-la" target="_blank"><img style={{marginBottom:30, marginLeft:-5}}  src={instagram} className='imgHistoriaInsta'/></a>
                                    </Col>
                                    <Col xs={5} md={1}>
                                        <br/>
                                    </Col>
                                    <Col sm={24} xs={14} md={13}>
                                    {this.state.width >= 1000 ? (
                                        <p className='Textdatos'>@tejiendoredesporlosninos</p>
                                    ):(
                                        <p className='Textdatos2'>@tejiendoredesporlosninos</p>
                                    )}
                                        <br/>
                                    </Col>
                                </Row>
                                <Row type='flex'>
                                    <Col xs={5} md={2}>
                                        <a href="https://www.youtube.com/channel/UCOe7hSOP6TsYJgpc4kNtG1A/about" target="_blank"><img style={{marginBottom:30, marginLeft:-5}}  src={youtube} className='imgHistoriaInsta'/></a>
                                    </Col>
                                    <Col xs={5} md={1}>
                                        <br/>
                                    </Col>
                                    <Col sm={24} xs={14} md={13}>
                                        <p className='Textdatos'>Tejiendo Redes por los Niños</p>
                                        <br/>
                                    </Col>
                                </Row>
                                <Row type='flex' >
                                    <Col xs={5} md={2}>
                                        <img src={ubica} className='imgHistoria'/>
                                    </Col>
                                    <Col xs={5} md={1}>
                                        <br/>
                                    </Col>
                                    <Col xs={14} md={13}>
                                        <p className='Textdatos'>San Felipe #1111, Col. Artesanos </p>
                                        <p className='Textdatos'>44100 Guadalajara, Jalisco </p>
                                        <br/>
                                    </Col>
                                </Row>
                                <Row type='flex' >
                                    <Col xs={5} md={2}>
                                        <img src={tel} className='imgHistoria'/>
                                    </Col>
                                    <Col xs={5} md={1}>
                                        <br/>
                                    </Col>
                                    <Col xs={14} md={13}>
                                        <p className='Textdatos'>33 2164 3010 </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br/>
                <Row>
                  <Col lg={{offset:1}} xs={{offset:3}} sm={{offset:4}}>
                  <a className="colorSISSA" href="https://www.sissamx.com.mx/" target="_blank">Habilitado por SISSA Monitoring Integral</a>
                  </Col>
                </Row>
                <br/>
            </div>
        );
    }
}

export default ejem;