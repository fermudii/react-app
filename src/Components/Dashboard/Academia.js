import React, { Component } from 'react';
import '../../stylesheets/dashboard/dashboard.css';
import { Row, Col, Icon } from 'antd';
import imag from '../../assets/img/uni.png';
import imag2 from '../../assets/img/empresa.png';
import imagL from '../../assets/img/L ver.png';
import lam from '../../assets/img/Lam.png';
import lro from '../../assets/img/Lro.png';

class Academia extends Component {
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
            <div className='fondoBlanco'>
                <br/>
                <br/>
                {this.state.width >= 1000 ? (
                <Row type='flex' justify='space-around'className='margenes'>
                    <Col xs={24} md={24} className='centrar'>
                        <Row type='flex' justify='space-around'>
                            <Col xs={11} md={11}className='ali'> 
                                <Row type='flex' justify='space-around'>
                                    <Col xs={24} md={18}>
                                        <p className='TituloAm'>ALIANZAS</p>
                                        <img src={lam} className='lineas'/>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <img src={imag2} className='imgHistoria'/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={1} md={1}>
                                <img src={imagL} className='imgHistoria'/>
                            </Col>
                            <Col xs={11} md={11} className='ali2'> 
                                <Row type='flex' justify='space-around'>
                                    <Col xs={24} md={18}>
                                        <p className='TituloRo'>ACADEMIA</p>
                                        <img src={lro} className='lineas'/>
                                    </Col>
                                    <Col xs={22} md={16}>
                                        <img src={imag} className='imgHistoria'/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                ):(
                    <Row type='flex' justify='space-around'className='margenes'>
                    <Col xs={24} md={24} className='centrar'>
                        <Row type='flex' justify='space-around'>
                            <Col xs={24} md={11}className='ali'> 
                                <Row type='flex' justify='space-around'>
                                    <Col xs={24} md={18}>
                                        <p className='TituloAm'>ALIANZAS</p>
                                        <img src={lam} className='lineas'/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} md={16}>
                                        <img src={imag2} className='imgHistoria'/>
                                    </Col>
                            <Col xs={1} md={1}>
                            <br/>
                                <img src={imagL} className='imgHistoria'/>
                            <br/>
                            </Col>
                            <Col xs={24} md={11} className='ali2'> 
                                <Row type='flex' justify='space-around'>
                                    <Col xs={24} md={18}>
                                        <p className='TituloRo'>ACADEMIA</p>
                                        <img src={lro} className='lineas'/>
                                    </Col>
                                    <Col xs={22} md={16}>
                                        <img src={imag} className='imgHistoria'/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                )}
            </div>
        );
    }
}

export default Academia;