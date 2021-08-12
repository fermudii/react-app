import React, { Component } from 'react';
import { Menu, Icon, Col, Button, Row, Dropdown } from 'antd';
import '../stylesheets/Header.css';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Categorias from '../Containers/CategoriasContainer';

import logo from "../assets/pictures/logo-color.png";

class HeaderBlog extends Component {
    state = { 
        width: 0, 
        height: 0,
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };

    componentDidMount(){
        this.props.onRequestCategorias();
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
        const {categorias} = this.props; 
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
            <Menu className="letrasMenuHeader">
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
                <hr/>
                <span><Col style={{textAlign: 'center', fontSize:15, color:'#0087d9', fontWeight:"bold"}}>Categorías: </Col></span>
                    {categorias.map(item =>
                                <Menu.Item key={item.idCategoria} style={{margin:0+'px'}}><a href={"/Categorias/" + item.idCategoria} >
                                        {item.descripcion}
                                    </a></Menu.Item>
                    )}
            </Menu>
          );

        const menu2 = (
            <Menu>
                <Menu.Item>
                    <Link to="/" ><Col style={{textAlign: 'center'}}>Ir a inicio</Col></Link>
                </Menu.Item>
                <Menu.Item>
                <Link to="/blog" >Blog</Link>
                </Menu.Item>
               {/*  <Menu.Item>
                    Crear Cuenta
                </Menu.Item> */}
                <Menu.Item>
                <Link to="/login">Ingresar</Link>
                </Menu.Item>
            </Menu>
        );

        console.log("categorias",categorias)

        return (
            <div className="FixedHeader" style={{background:'#ffffff'}}>
              {this.state.width >= 1000 ? (
                <div>
                <Row>
                    <Col className="gutter-row" span={23} style={{marginTop:10, marginLeft:10}}>
                        <div>
                        <Link to="/" ><img alt="LogoTejiendoRedes" src={logo} className="logo-simple"/></Link>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={1} style={{marginTop:5, marginBottom:33, float:"right"}}>
                        <Dropdown overlay={menu2} trigger={['click']}>
                            <Button type="primary" >
                            <Icon type="menu" />
                            </Button>
                        </Dropdown>
                    </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={24}>
                            <div style={{textAlign: 'center'}}>
                        <Categorias/>
                        </div>
                            </Col>
                        </Row>
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
                    
                    </div>
              )}
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        categorias: state.AdministradorReducer.categorias,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestCategorias: () => {
            dispatch({ type: "GET_CATEGORIAS_REQUEST" });
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(HeaderBlog);