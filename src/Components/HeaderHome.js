import React, { Component } from 'react';
import { Menu, Icon, Col, Button, Row, Dropdown } from 'antd';
import '../stylesheets/Header.css';
import { Link } from 'react-router-dom';

import logo from "../assets/pictures/logo-color.png";

class Header extends Component {
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
        const onQuienesSomos = () => {
            console.log('Quienes Somos')
            // onChangeClienteVista('pedidos');
            // sessionStorage.setItem('vistaCliente', 'pedidos');
        }
        const onInicio = () => {
            console.log('Inicio')
        }
        const onActividades = () => {
            console.log('carrito')
        }

        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/" ><Col style={{textAlign: 'center'}}>Ir a inicio</Col></Link>
                </Menu.Item>
                <Menu.Item>
                <Link to="/blog" >Blog</Link>
                </Menu.Item>
                {/* <Menu.Item>
                    Crear Cuenta
                </Menu.Item> */}
                <Menu.Item>
                <Link to="/login">Ingresar</Link>
                </Menu.Item>
            </Menu>
          );

        console.log("this.state.width",this.state.width)
        return (
            <div className="FixedHeader" style={{background:'#ffffff'}}>
              {this.state.width >= 1000 ? (
                <div>
                <Menu selectedKeys={"ingresar"} mode="horizontal">
                <Row>
                    <Col className="gutter-row" span={14} style={{marginTop:10, marginLeft:10}}>
                        <div>
                        <Link to="/" ><img alt="LogoTejiendoRedes" src={logo} className="logo-simple"/></Link>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={3} offset={3} style={{marginTop:5, marginBottom:20}}>
                            <div>
                            <Link to="/blog" ><Button size="large" className="btnBlog" style={{marginTop:8}}>Blog</Button></Link> 
                            </div>
                    </Col>
                    {/* <Col className="gutter-row" span={3} style={{marginTop:5,marginBottom:20 }}>
                            <div>
                           <Button size="large" className="btnSignIn" style={{marginTop:8}}>Crear Cuenta</Button>
                            </div>
                    </Col> */}
                    <Col className="gutter-row" span={3} style={{marginTop:5, marginBottom:20}}>
                            <div>
                            <Link to="/login" ><Button size="large" className="btnLogIn" style={{marginTop:8}}>Ingresar</Button></Link> 
                            </div>
                    </Col>
                    </Row>
                </Menu>
                </div>
               ):
             (
                <div>
                    <div className="logo" />
                    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                    <Col className="gutter-row" span={6} style={{marginTop:5, marginLeft:5}}>
                        <div>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type="primary" style={{ marginBottom: 16}}>
                            <Icon type="menu" />
                            </Button>
                        </Dropdown>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12} style={{marginTop:5}}>
                        <div>
                        <img alt="LogoTejiendoRedes" src={logo} className="logo-responsive"/>
                        </div>
                    </Col>
                    </Row>
                    
                    {/* <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                        <Col className="gutter-row" span={9} style={{marginLeft:15, marginTop:10}}>
                            <div>
                            <img alt="LogoTejiendoRedes" src={logo} className="logo-responsive"/>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div>
                            <Button size="large" className="btnLogIn" style={{marginTop:10, marginLeft:5}}>Ingresar</Button>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={7}>
                            <div>
                            <Button size="large" className="btnSignIn" style={{marginTop:10}}>Crear Cuenta</Button>
                            </div>
                        </Col>
                    </Row> */}
                    </div>
              )}
                {/* <Navbar className="navBar" variant="dark" expand="lg">
                    <Navbar.Brand href="/">
                        <img alt="LogoTejiendoRedes" src={logo} className="logo-simple"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    
                    <Navbar.Collapse  id="basic-navbar-nav">
                        <Nav className="iconosHeader">
                            <Nav.Link href="#Empezar">Inicio</Nav.Link>
                            <Nav.Link href='#QuienesSomos'>Quienes Somos</Nav.Link>
                            <Nav.Link href='#Actividades'>Actividades</Nav.Link>
                        </Nav>
                        <Col xs={{offset: 0}} lg={{offset: 1}}>
                            <Button size="large" className="btnLogIn">Ingresar</Button>
                        </Col>
                        <Col xs={{offset: 0}} lg={{offset: 1}}>
                            <Button size="large" className="btnSignIn">Crear Cuenta</Button>
                        </Col>
                        <Col xs={{offset: 0}} lg={{offset: 1}}></Col>
                    </Navbar.Collapse>
                </Navbar> */}
            </div>
        );
    }
}

export default Header;

