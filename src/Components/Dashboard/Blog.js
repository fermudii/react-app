import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import '../../stylesheets/dashboard/dashboard.css';
import adultosBarba from '../../assets/pictures/adultos-barba.png';
import adultosLentes from '../../assets/pictures/adultos-lentes-barba.png';
import { Helmet } from "react-helmet";

class Blog extends Component {
    render() {
        return (
            <div className='fondoFigurasAmarillas'>
            <Helmet>
                <meta name="description" content="Blog Tejiendo Redes" />
                <meta
                    property="og:description"
                    content="Tejiendo Redes Blog"
                />
                <title>Blog || Tejiendo Redes</title>
                <meta
                    property="og:image"
                    content="https://image.freepik.com/foto-gratis/primer-plano-bastante-joven-lista-blog_23-2148586321.jpg"
                />
                <meta property="og:url" content="https://trpn.painani.mx/" />
            </Helmet>
                <br/>
                <br/>
                <p className="centrar tituloContenido" id="Blog">Nuestros más recientes posts</p>
                <Row type='flex' justify='space-around'>
                    <Col xs={22} md={22}>
                        <Row type='flex' justify='space-around'>
                            <Col xs={24} md={11}>
                                <Row type='flex' justify='space-around'>
                                    <Col xs={24} md={5}>
                                        <img src={adultosBarba} className='imgHistoria'/>
                                    </Col>
                                    <Col xs={24} md={18}>
                                        <p className='deporteTitulo'>¿Quiénes somos?</p>
                                        <p className='pNormal'>Tejiendo Redes por los Niños es un programa convencido de que los niños son el presente de nuestra sociedad y busca ayudarlos a alcanzar su plenitud fomentando su autonomía a través de redes de apoyo y la formación de capital social.</p>
                                        <p className='pNormal'>Es un proyecto que nace del Municipio de Guadalajara y hoy en día es sostenido gracias al Municipio de Guadalajara y las asociaciones civiles Alarum A.C. , Zurco.mx A.C. y Camin A.C.</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} md={11}>
                                <Row type='flex' justify='space-around'>
                                    <Col xs={24} md={5}>
                                        <img src={adultosLentes} className='imgHistoria'/>
                                    </Col>
                                    <Col xs={24} md={18}>
                                        <p className='deporteTitulo'>Inspiración para la marca</p>
                                        <p className='pNormal'>Conscientes de la crisis social que existe hoy en día e inpirados por el crecimiento, desarrollo y bienestar de los niños y jóvenes: nuestra marca nace para ser un apoyo y punto de fortaleza para aquellos niños que carecen de ciertas necesidades básicas para su desarrollo y plenitud como personas.</p>
                                        <p className='pNormal'>La palabra tejido proviene del latín“Texer” que significa entrelazar, unir para formar. La palabra red significa organización de un conjunto de personas que van hacia una misma dirección.</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Blog;

