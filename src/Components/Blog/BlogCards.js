import React, { Component } from 'react';
import { Menu, Input, Col, Button, Row, Pagination, Card } from 'antd';
import '../../stylesheets/dashboard/dashboard.css';
import moment from 'moment';
import ReactPlayer from 'react-player/youtube'
import {connect}  from 'react-redux'

const { Meta } = Card;
const Search = Input.Search;

class BlogCards extends Component { 
    state ={
        page: 1
    }
    componentDidMount() {
        this.props.onRequestListaNotas(0)
    }
    render() { 
        const {
            fetchingGetNotas,
            listaNotas,
            totalNotas,
            onRequestListaNotas,
            onBuscarNota
        } = this.props;
        
        const changePage = (e) => {
            this.setState({
                page: e,
            })
            onRequestListaNotas(e)
        }

        const onSearch = (value) => {
            onBuscarNota(value);
        }

            return (
                <div className="dashboardFondo">
                       <br/>
                       <br/>
                       <br/>
                       <h1 className="blogTitulo">Blog</h1>
                       <hr/>
                       {listaNotas[0]?(
                       <p className="totalBlog">{listaNotas.length} artículos</p>
                       ):(false)}
                       <Col span={8}>
                            <Search
                                placeholder="Buscar Nota "
                                onSearch={value => onSearch(value)}
                                className="searchBar"
                                allowClear
                            />
                        </Col>
                        <br/>
                        <br/>
                        <br/>
                       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                       {listaNotas[0]?(
                                <div className="gutter-box">
                                {listaNotas.map((item, idItem) =>
                                    <div>
                                    {console.log("existe item",item)}
                                    <Col className="gutter-row" xs={24} sm={12} md={12} lg={8}> 
                                    <a href={"/Nota/"+item.idNota+'/'+item.listaUrl.tituloURL}>
                                    <Card
                                        className="cardBlog"
                                        hoverable
                                        cover={<ReactPlayer
                                            className="fotoBlog"
                                            width='100%'
                                            height='100%'
                                            url={item.video}
                                        />}
                                    >
                                     <p className="categoriasBlog">{item.categoriaByIdCategoria.descripcion}</p>
                                     <h3 className="tituloBlog">{item.titulo}</h3>
                                     <p className="tiempoPublicada">{moment(item.fechaPub).fromNow()}</p>
                                    <h6 className="descripcionBlog">{item.descripcion}</h6>
                                    </Card>
                                    </a>
                                    <br/>
                                    </Col>
                                    
                                    </div>
                                )}
                                </div>
                                ):(false)}
                            </Row>
                                <br/>
                            <Pagination onChange={changePage} total={totalNotas} style={{textAlign:"center"}} pageSize={10}/>
                                <br/>

                </div>
            );
        }
    }


const mapStateToProps = state => {

	return {
        fetchingGetNotas: state.AdministradorReducer.fetchingGetNotas,
        listaNotas: state.AdministradorReducer.listaNotas,
        totalNotas: state.AdministradorReducer.totalNotas
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestListaNotas: (page) => {
            dispatch({type: "GET_NOTAS_REQUEST", page:page});
        },
        onBuscarNota: (nota) => {
            dispatch({ type: "BUSCAR_NOTA_REQUEST",nota, page:0});
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(BlogCards);

