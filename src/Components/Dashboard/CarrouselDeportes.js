import React, { Component } from 'react';
import { Row, Col, Icon, List, Card } from 'antd';
import '../../stylesheets/dashboard/dashboard.css';
import fam2 from '../../assets/img/familia2.png';
import est2 from '../../assets/img/educa2.png';
import dep2 from '../../assets/img/deporte2.png';
import estudiante from '../../assets/img/escolares.png';
import fam from '../../assets/img/familia.png';
import dep from '../../assets/img/deporte.png';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


class Contenido extends Component {
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
        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 1
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 1
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 1
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          };

        const listData=[{
                'imagen': estudiante, 'titulo': 'REDES ESCOLARES', 
                'descripcion': 'Identificamos las redes de ayuda y amistad entre los compañeros de cada salón, para potenciarlas y desarrollar estrategias de apoyo y liderazgo para el bien común. Trabajamos en colaboración con los maestros en el cumplimiento de metas, para lograr mejoras día con día.',
                'color': 'TCarrAz', 'linea': est2
            },{
                'imagen': dep, 'titulo': 'REDES DEPORTIVAS', 
                'descripcion': 'Con el apoyo del Consejo Municipal del Deporte, impartimos clases de Futbol y Judo favoreciendo la disciplina, el respeto y la solidaridad.',
                'color': 'TCarrRo', 'linea': dep2
            },{
                'imagen': fam, 'titulo': 'EVENTOS FAMILIARES', 
                'descripcion': 'Favorecemos la convivencia entre los miembros de las familias para generar mayor confianza y apoyo entre padres e hijos.',
                'color': 'TCarrAm', 'linea': fam2
            }
        ]

        return (
            <div className="tituloCentrado">
             {this.state.width >= 1000 ? (
                <Carousel
                    transitionDuration={500}
                    keyboard={false}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={1000}
                    customTransition="all .5"
                    deviceType={this.props.deviceType}
                        >
                        {listData.map((item, i) =>
                        <Card>
                                <Row type='flex' justify='space-around'className='margenes'>
                                    <Col sm={24} md={22} xs={20} >
                                        <Col sm={24} xs={10} lg={12} >
                                            <p className={item.color}>{item.titulo}</p>
                                            <div >
                                                <img src={item.imagen}className='carr'/>
                                            </div>
                                        </Col>
                                        <Col sm={24} lg={1} xs={0}  >
                                            <br/>
                                            <br/>
                                        </Col>
                                        <Col sm={24} lg={11} xs={14} >
                                            <div>
                                                <img src={item.linea} className='carr'/>
                                            </div>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <p className='TextCarr'>{item.descripcion}</p>
                                        </Col>  
                                    </Col>
                                    
                                </Row>
                        </Card>
                        )}
                </Carousel>
             ):(
                    <Carousel
                    transitionDuration={500}
                    keyboard={false}
                    responsive={responsive}
                    infinite={true}
                    customTransition="all .5"
                    autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={1000}
                    deviceType={this.props.deviceType}
                        >
                        {listData.map((item, i) =>
                        <Card>
                                <Row type='flex' justify='space-around'className='margenes'>
                                    <Col sm={24} md={22} xs={20} >
                                        <Col sm={24} xs={10} lg={12} >
                                            <p className={item.color}>{item.titulo}</p>
                                        </Col>
                                        <Col sm={24} lg={1} xs={0}  >
                                            <br/>
                                            <br/>
                                        </Col>
                                        <Col sm={24} lg={24} xs={24} >
                                        <div>
                                                <img src={item.linea} className='carr'/>
                                            </div>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <p className='TextCarr'>{item.descripcion}</p>
                                        </Col> 
                                        <Col span={23}>
                                        <div >
                                                <img src={item.imagen}className='carr'/>
                                            </div>
                                        </Col>
                                    </Col>
                                    
                                </Row>
                            </Card>
                        )}
                </Carousel>
             )}
            </div>
        );
    }
}

export default Contenido;

