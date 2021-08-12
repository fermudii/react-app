import React, { Component } from 'react';
import CrearNota from '../Components/Administrador/CrearNota';
import ListaNotas from '../Components/Administrador/ListaNotas'
import ListaCategoriasCmp from '../Components/Administrador/ListaCategorias'
import EstructuraPagina from '../Components/Administrador/EstructuraPagina'
import DetalleElemento from '../Components/Administrador/DetalleElemento';
import { Tabs, Row, Col } from 'antd';
import { connect } from "react-redux";
import AlertMessageCmp from '../Components/Alerta';
import '../stylesheets/Administrator/Administrator.css';

const { TabPane } = Tabs;


class AdministradorContainer extends Component {
    render() {
        return (
            <div>
             <AlertMessageCmp/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Blog" key="1">
                        <Row type="flex" justify="space-around">
                            <Col xs={24} sm={17}>
                                <ListaNotas />
                                <br />
                            </Col>
                            <Col xs={24} sm={6}>
                                <Row>
                                    <CrearNota />
                                    <br />
                                    <ListaCategoriasCmp />
                                </Row>
                            </Col>
                        </Row>
                    </TabPane>
                   {/*  <TabPane tab="Crear Elemento" key="2">
                        <Col xs={23} md={12} >
                            <EstructuraPagina />
                        </Col>
                        <Col xs={23} md={11} offset={1}>
                            <DetalleElemento />
                        </Col>
                    </TabPane> */}
                </Tabs>
            </div>
        );
    }
}


export default AdministradorContainer