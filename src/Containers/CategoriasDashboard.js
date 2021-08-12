import React, { Component } from 'react';
import {Row, Col, Card} from 'antd';
import '../stylesheets/dashboard/dashboard.css';
import Header from "../Components/HeaderBlog";
import Ejem from '../Components/Dashboard/ejem';
import lineaColores from '../assets/pictures/linea-colores.png';
import Categorias from '../Components/Blog/Categorias';

class CategoriasDashboard extends Component {
  
    render() {
        return (
            <div className="App body fondo">
                <Header/>
                <br/>
                <br/>
                <br/>
                <Row style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Col style={{marginLeft:20}} xs={24} md={19}>
                        <Categorias/>
                    </Col>
                </Row>
                <br/>
                <Col span={24}>
                    <img style={{width: '100%'}} src={lineaColores}/>
                    </Col>
                    <br/>
                    <Ejem />
            </div>
        );
    }
}

export default CategoriasDashboard;    