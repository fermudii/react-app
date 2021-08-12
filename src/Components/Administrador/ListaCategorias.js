import React, { Component } from 'react';
import { List, Button, Icon, Card, Row, Col, Modal} from 'antd';
import ModalEditarCategoriaCmp from './ModalEditarCategoria';
import ModalNuevaCategoriaCmp from './ModalNuevaCategoria';
import '../../stylesheets/Administrator/Administrator.css';

import { connect } from "react-redux";

const confirm = Modal.confirm;
class ListaCategorias extends Component {
    render() {
        const {fetchingGetCategorias,
            onShowEditarCategoriaModal,
            onRequestNuevaCategoria,
            categorias,
            onRequestEliminarCategoria
        } = this.props;

        console.log("categorias",categorias)
        
        const showEditConfirmPromo = (infoCategoria) => {
            console.log('infoCategoria');
            console.log(infoCategoria);
            onShowEditarCategoriaModal(infoCategoria);
        };
        const openNuevaCategoriaModal = () => {
            console.log('click en open modal nueva categoría');
            onRequestNuevaCategoria();

        };

        const showDeleteConfirm = (idCategoria, descripcion) => {
            confirm({
                title: '¿Estás seguro que deseas eliminar la categoría  "'+ descripcion +'"?',
                content: '',
                okText: 'Sí',
                okType: 'primary',
                cancelText: 'No',
                onOk() {
                    onRequestEliminarCategoria(idCategoria);
                },
                onCancel() {
                    console.log('Cancel');
                },
            });	  
        };

        return (
            <div>
                <Card style={{}} className="PM-itemsDiv"  title={
                    <div className="header-list">
                        <Row type="flex" justify="space-between">
                            <Col xs={19} sm={19}>Categorías</Col>
                            <Col xs={5} sm={5}>
                                <Button onClick={openNuevaCategoriaModal} className="btnNuevoAdmin">+</Button>
                            </Col>
                        </Row>
                    </div>}>
                    <List
                    itemLayout="horizontal"
                    loading={fetchingGetCategorias}
                    locale={{ emptyText: 'Sin datos' }}
                    dataSource={categorias}
                    renderItem={item => (
                        <List.Item
                            key={item.idCategoria}
                            actions={[
                                <div onClick={(e) => { e.stopPropagation(); showDeleteConfirm(item.idCategoria, item.descripcion); } }><Icon className="icon" type="delete" theme="twoTone" twoToneColor="#275E9C" /></div>,
                                <div onClick={(e) => { e.stopPropagation(); showEditConfirmPromo(item); } }><Icon className="icon" type="edit" theme="twoTone" twoToneColor="#423a3a" /></div>
                            ]}
                        >
                            <List.Item.Meta
                            title={item.descripcion}
                            />
                            
                        </List.Item>
                    )}
                    />
                </Card>
                <br/>
                <br/>
                <br/>
                <br/>
                <ModalEditarCategoriaCmp/>
                <ModalNuevaCategoriaCmp/>
            </div>
        );
    }
}

const mapStateToProps = state => {

	return {
        fetchingGetCategorias: state.AdministradorReducer.fetchingGetCategorias,
        categorias: state.AdministradorReducer.categorias,
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestNuevaCategoria: () => {
            dispatch({type: "SHOW_NUEVA_CATEGORIA_MODAL", showNuevaCategoriaModal:true});
        },
        onRequestInfoNota: (notaInfo, categorias) => {
            dispatch({type: "GET_INFO_NOTA_REQUEST", notaInfo:notaInfo, categorias:categorias});
        },
        onShowEditarCategoriaModal: (infoCategoria) => {
            dispatch({type: "SHOW_EDITAR_CATEGORIA_MODAL", showEditarCategoriaModal:true, infoCategoria: infoCategoria})
        },
        onRequestEliminarCategoria: (idCategoria) => {
            dispatch({ type: "ELIMINAR_CATEGORIA_REQUEST" ,categoria:idCategoria });
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ListaCategorias);

