import React, { Component } from 'react';
import { Menu, Input, Col, Pagination, Row, Dropdown, Card } from 'antd';
import '../../stylesheets/dashboard/dashboard.css';
import moment from 'moment';
import ReactPlayer from 'react-player/youtube'
import {connect}  from 'react-redux'

const { Meta } = Card;
const Search = Input.Search;

class BlogCategoriasCards extends Component { 
    state ={
        page: 1
    }
    render() { 
        const {
            listaCategoriaNotas,
            totalCategoriaNotas,
            onRequestlistaCategoriaNotas,
            onBuscarNota
        } = this.props;

        const changePage = (e) => {
            this.setState({
                page: e,
            })
            onRequestlistaCategoriaNotas(e)
        }

        const onSearch = (value) => {
            onBuscarNota(value);
        }

            return (
                <div className="dashboardFondo">
                       <br/>
                       <br/>
                       <br/>
                       {listaCategoriaNotas[0]?(
                        <div>
                            <h1 className="blogTitulo">{listaCategoriaNotas[0].categoriaByIdCategoria.descripcion}</h1>
                            <hr/>
                            <p className="totalBlog">{listaCategoriaNotas.length} artículos</p>
                        </div>
                       ):(false)}
                       
                       <br/>
                       {listaCategoriaNotas[0]?(
                       <Col span={8}>
                        <Search
                                placeholder="Buscar Nota "
                                onSearch={value => onSearch(value)}
                                className="searchBar"
                                allowClear
                            />
                        </Col>
                       ):(false)}
                        <br/>
                        <br/>
                        <br/>
                       {listaCategoriaNotas[0]?(
                           <div>
                       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <div className="gutter-box">
                                {listaCategoriaNotas.map((item, idItem) =>
                                    <div>
                                    <Col className="gutter-row" xs={24} sm={8} md={8} lg={8}>
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
                            </Row>
                                <br/>
                                <Pagination onChange={changePage} total={totalCategoriaNotas} style={{textAlign:"center"}} pageSize={10}/>
                                <br/>
                            </div>
                            ):(
                                <p className="blogTitulo">Por el momento no se encuentran notas de esta categoría.</p>
                            )}
                </div>
            );
        }
    }


const mapStateToProps = state => {

	return {
        totalCategoriaNotas: state.AdministradorReducer.totalCategoriaNotas,
        listaCategoriaNotas: state.AdministradorReducer.listaCategoriaNotas,
        categoria: state.AdministradorReducer.categoria,
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestlistaCategoriaNotas: (page, categoria) => {
            dispatch({type: "GET_NOTAS_CATEGORIA_REQUEST", page:page, categoria:categoria});
        },
        onBuscarNota: (nota) => {
            dispatch({ type: "BUSCAR_NOTA_CATEGORIAS_REQUEST",nota, page:0});
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(BlogCategoriasCards);

