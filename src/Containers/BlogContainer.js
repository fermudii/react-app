import React, { Component } from 'react';
import { Menu, Icon, Col, Button, Row, Dropdown } from 'antd';
import '../stylesheets/dashboard/dashboard.css';
import HeaderBlog from '../Components/HeaderBlog';
import Ejem from '../Components/Dashboard/ejem';
import lineaColores from '../assets/pictures/linea-colores.png';
import BlogCards from '../Components/Blog/BlogCards';

class BlogContainer extends Component {
    render() { 
        return (
            <div className="dashboardFondo">
                    <HeaderBlog/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Row style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Col style={{marginLeft:20}} xs={24} md={19}>
                    <BlogCards/>
                    </Col>
                    </Row>
                    <Col span={24}>
                    <img style={{width: '100%'}} src={lineaColores}/>
                    </Col>
                    <br/>
                    <Ejem />
            </div>
        );
    }
}


export default BlogContainer;

