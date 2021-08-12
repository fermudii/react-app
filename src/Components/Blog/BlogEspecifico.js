import React, { Component } from 'react';
import { Menu, Icon, Col, Button, Row, Dropdown, Card, Tabs } from 'antd';
import '../../stylesheets/dashboard/dashboard.css';
import ReactPlayer from 'react-player/youtube'
import { Helmet } from "react-helmet";
import moment from 'moment';
import 'moment/locale/es';
import {connect}  from 'react-redux'

const { TabPane } = Tabs;

class BlogUno extends Component { 
   /*  componentDidMount(){
        this.props.onRequestNota(45, 0, 0)
    } */
    render(){
        const {notaInfo, notasRelacionadaPalabraClave, notasRelacionadaCategoria} = this.props;
        moment.locale('es');
        let fecha =  moment(notaInfo.fechaPub).format('LLLL');
        console.log("notasRelacionadaCategoria",notasRelacionadaCategoria)
        return(
            <div>
            <Helmet>
                <meta name="description" content="This is my login" />
                <meta
                    property="og:description"
                    content="Tejiendo redes por los niños"
                />
                <title>{notaInfo.titulo+ '|| Tejiendo redes'}</title>
                <meta
                    property="og:image"
                    content={notaInfo.video}
                />
                <meta property="og:url" content="https://trpn.painani.mx/" />
            </Helmet>
                <br/>
                <br/>
                <br/>
                {notaInfo.categoriaByIdCategoria?(
                <Card>
                <Col xs={24} md={17}>
                <h5 className="categoriaNota">{notaInfo.categoriaByIdCategoria.descripcion}</h5>
                <h1 className="tituloNota">{notaInfo.titulo}</h1>
                <p>{fecha}</p>
                {notaInfo.video!=''?(
                <div className='wrapper' style={{marginBottom:20}}>
                    <ReactPlayer
                        className='player'
                        playing
                        url={notaInfo.video}
                        width='100%'
                        height='100%'
                    />
                    
                </div>
                ):(false)}
                <div 
                    className="textoEnNota" 
                    dangerouslySetInnerHTML = {{__html: notaInfo.texto}}
                    style={{fontFamily:"Dosis-Light", fontSize:20, color:"black"}}
                    >
                </div>
               <br/>
                <img className="fotoNotaEspecifica" src={notaInfo.imagen}/>
                </Col>
                
                <Col xs={24} md={6} offset={1}>
                <br/>
                <Card> 
                    <Tabs defaultActiveKey="1" size={"large"} style={{textAlign:"center", marginLeft:0, marginRight:0}}>
                        <TabPane style={{fontFamily:"Dosis-Light"}} tab="Relacionados Categoría" key="1">
                        {notasRelacionadaCategoria[0]?(
                            <div>
                            {notasRelacionadaCategoria.map(item =>
                                <a href={"/Nota/"+item.idNota+'/'+item.listaUrl.tituloURL}>
                                <Card bordered={false}> 
                                    <Col span={12}>
                                       <ReactPlayer
                                            className="imagenBlogRelacionado"
                                            width='100%'
                                            height='100%'
                                            url={item.video}
                                        />
                                    </Col>
                                    <Col span={11} offset={1}>
                                    <p className="descripcionBlogRelacionado">{moment(item.fechaPub).calendar()}</p>
                                    <p className="tituloBlogRelacionado">{item.titulo}</p>
                                    </Col>
                                </Card>
                                </a>
                            )}
                            </div>
                            ):(
                                <div>
                                <Card bordered={false}>   
                                    <p className="noHayRelacionados">Por el momento no se encuentran notas relacionadas de esta categoría</p>
                                </Card>
                                </div>
                            )}
                        </TabPane>
                        <TabPane style={{fontFamily:"Dosis-Light"}} tab="Relacionados Palabras Clave" key="2">
                            <Card bordered={false}> 
                            {notasRelacionadaPalabraClave[0]?(
                            <div>
                            {notasRelacionadaPalabraClave.map(item =>
                                <a href={"/Nota/"+item.idNota+'/'+item.listaUrl.tituloURL}>
                                <Card bordered={false}> 
                                    <Col span={12}>
                                        <ReactPlayer
                                            className="imagenBlogRelacionado"
                                            width='100%'
                                            height='100%'
                                            url={item.video}
                                        />
                                    </Col>
                                    <Col span={11} offset={1}>
                                    <p className="descripcionBlogRelacionado">{moment(item.fechaPub).calendar()}</p>
                                    <p className="tituloBlogRelacionado">{item.titulo}</p>
                                    </Col>
                                </Card>
                                </a>
                            )}
                            </div>
                            ):(
                                <div>
                                <Card bordered={false}>   
                                    <p className="noHayRelacionados">Por el momento no se encuentran notas relacionadas por palabras clave.</p>
                                </Card>
                                </div>
                            )}
                            </Card>
                        </TabPane>
                    </Tabs>
                </Card>
                    </Col>
                </Card>
                ):(false)}
            </div>
        )
    }
}

const mapStateToProps = state => {

	return {
        notaInfo: state.AdministradorReducer.notaInfo,
        notasRelacionadaPalabraClave: state.AdministradorReducer.notasRelacionadaPalabraClave,
        notasRelacionadaCategoria: state.AdministradorReducer.notasRelacionadaCategoria,
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestNota: (idNota, pagePalabraClave, pageCategoria) => {
            dispatch({type: "GET_NOTA_ESPECIFICA_REQUEST", idNota, pagePalabraClave, pageCategoria});
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(BlogUno);