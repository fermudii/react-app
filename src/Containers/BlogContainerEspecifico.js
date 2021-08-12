import React, { Component } from 'react';
import {Row, Col, Card} from 'antd';
import '../stylesheets/dashboard/dashboard.css';
import Header from "../Components/HeaderBlog";
import moment from 'moment';
import FooterSoluciones from '../Components/Dashboard/ejem';
import BlogEspecifico from '../Components/Blog/BlogEspecifico';

class BlogDashboard extends Component {
  
    render() {
       
        return (
            <div style={{background:'#f1f1f1'}}>
                <Header/>
                <br/>
                <br/>
                <br/>
                <Row style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Col style={{marginLeft:20}} xs={23} md={23}>
                        <BlogEspecifico/>
                    </Col>
                </Row>
                <br/>
                <FooterSoluciones/>
            </div>
        );
    }
}

export default BlogDashboard;    