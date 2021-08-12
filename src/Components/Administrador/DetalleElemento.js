import React, { Component } from 'react';
import {Card, Alert, Row, Col, Button, Icon } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { connect } from "react-redux";
import "../../stylesheets/Administrator/Administrator.css"

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}


class DetalleElemento extends Component {
    constructor(props){
        super(props);
        this.state={visible: false};
    }

    render() {
		const {elementoSeleccionado, onRequestOpenModal,
        } = this.props;

        const editarElemento = () => {
            onRequestOpenModal();
        }
        function ShowInfo(props) {
            if (isEmpty(elementoSeleccionado)) {
                return (
                    <Alert message="No hay elemento seleccionado" type="info" />);
            }
	        return (
                <div>
                    <Row align="middle" justify="center">
                        <Col span={24}>
                            <div className="nombreEmpleado">
                                {elementoSeleccionado.titulo}
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="infoEmpleado">{elementoSeleccionado.descripcion}</div>
                        </Col>
                    </Row>
                    <br/>
                    <Row className="infoEmpleado">
                        <h3 style={{color: '#E01073'}}>Componente</h3>
                        <Col span={24}>
                            <p><strong>Texto del componente: </strong>{ ReactHtmlParser(elementoSeleccionado.textComp)}</p>
                        </Col>
                        <Col span={24}>
                            <p><strong>Descripción del componente: </strong>{elementoSeleccionado.desComp}</p>
                        </Col>
                        <Col span={24}>
                            <p><strong>Orden: </strong> {elementoSeleccionado.orden}</p>
                        </Col>
                        <Col span={24}>
                            <p><strong>Tipo de elemento: </strong>{elementoSeleccionado.tipoByIdTipoElemento.descripcion}</p>
                        </Col>
                        <Col span={24}>
                            {elementoSeleccionado.imagenComp !== "" ? (
                                <div>
                                    <p><strong>Foto de componente:</strong></p>
                                    <img src={elementoSeleccionado.imagenComp} alt='imagenElemento' className='imagenElemento' />
                                </div>
                            ):(<p><strong>Foto de componente:</strong> No cuenta con imágen</p>)
                            }    
                        </Col>
                    </Row>
                </div>
            );
        }
	
        return (
            <div>
                <Card className="cardDetalle" title={
                    <div className="header-list">Elemento {elementoSeleccionado.textComp ? (
                    <Button onClick={editarElemento} className='editarElemento'><Icon className='iconoEditar' type="edit" /></Button>):(false)}
                    </div>
                }>							
                    <ShowInfo info={elementoSeleccionado} />
                </Card> 
            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
	    elementoSeleccionado: state.AdministradorReducer.elementoSeleccionado,
	};
};
const mapDispatchToProps = dispatch => {
    return {
        onRequestOpenModal: () => {
            dispatch({type: "OPEN_EDITAR_ELEMENTO_MODAL", showModalEditarElemeto:true})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (DetalleElemento);
