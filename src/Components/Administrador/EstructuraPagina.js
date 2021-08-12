import React, { Component } from 'react';
import { Button, List, Modal, Icon } from 'antd';
import { connect } from "react-redux";
import ModalNuevoElemento from './ModalNuevoElemento';
import ModalEditarElemento from './ModalEditarElemento';

const confirm = Modal.confirm;

class EstructuraPagina extends Component {
    componentDidMount(){
        this.props.onObtenerTiposElementos();
        this.props.onObtenerElementos();
    }
    
    
    render() { 
        const { listTiposElementos, listElementos, fetchingElementos, onShowNuevoElementoModal,
            onRequestInfoElemento, onRequestEliminaElemento,
        } = this.props;

        console.log(listTiposElementos);
        console.log(listElementos);

        const showInfoElemento = (idElementoBase) => {
            console.log(idElementoBase);
            let elementoSeleccionado = null;
            for(let i=0; i<listElementos.length; i++){
                if(idElementoBase === listElementos[i].idElementoBase){
                    elementoSeleccionado = listElementos[i];
                    console.log('elementoSeleccionado');
                    console.log(elementoSeleccionado);
                    elementoSeleccionado.tipoElemento = elementoSeleccionado.tipoByIdTipoElemento.descripcion;
                    console.log(elementoSeleccionado.textComp.split('<'));
                    if(elementoSeleccionado.textComp.split('<')[2]==='/Button>'){
                        let textBoton = elementoSeleccionado.textComp.split('>')[1].split('<')[0]
                        console.log(textBoton);
                        elementoSeleccionado.textComp = textBoton
                    }
                }
            }
            onRequestInfoElemento(elementoSeleccionado);
        }

        const showDeleteConfirm = (idElementoBase, elemento) => {
            confirm({
                title: '¿Estás seguro que deseas eliminar el elemento '+ elemento +'?',
                content: '',
                okText: 'Sí',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    onRequestEliminaElemento(idElementoBase);
                },
                onCancel() {
                console.log('Cancel');
                },
            });	  
        };
        return (
            <div className="PM-itemsDiv">
                <Button onClick={onShowNuevoElementoModal} className="btnNuevoAdmin">Nuevo Elemento</Button>
                <List
                header={<div className="header-list">Elementos</div>}
                className="demo-loadmore-list"
                loading={fetchingElementos}
                locale={{ emptyText: 'Sin datos' }}
                itemLayout="horizontal"
                dataSource={listElementos}
                renderItem={item => (
                    <List.Item actions={[
                        <div className="pointer" onClick={(e) => { e.stopPropagation(); showInfoElemento(item.idElementoBase); } }><Icon type="info-circle" /></div>,
                        <div className="pointer" onClick={(e) => { e.stopPropagation(); showDeleteConfirm(item.idElementoBase, item.titulo); } }><Icon type="delete" /></div>,
                    ]}>
                    <List.Item.Meta
                        title={'ID: '+item.idElementoBase + ', ' + item.titulo}
                        description={item.descripcion}
                    />
                    </List.Item>
                )}
                /> 
                <ModalEditarElemento />
                <ModalNuevoElemento /> 
                <br/>
            </div>
        );
    }
}
const mapStateToProps = state => {
	return {
        listTiposElementos: state.AdministradorReducer.listTiposElementos,
        listElementos: state.AdministradorReducer.listElementos,
        fetchingElementos: state.AdministradorReducer.fetchingElementos,
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onObtenerTiposElementos: () => {
            dispatch({ type: "OBTENER_TIPOS_ELEMENTOS_REQUEST"});
        },
        onObtenerElementos: () => {
            dispatch({ type: "OBTENER_ELEMENTOS_REQUEST"});
        },
        onRequestInfoElemento: (elementoSeleccionado) => {
            dispatch({type: "ELEMENTO_DETALLE", elementoSeleccionado: elementoSeleccionado})
        },
        onRequestEliminaElemento: (idElementoBase) => {
            dispatch({ type: "BORRAR_ELEMENTO_REQUEST" ,idElementoBase: idElementoBase });
        },
        onShowNuevoElementoModal: () => {
            dispatch({ type: "OPEN_NUEVO_ELEMENTO_MODAL" , showModalNuevoElemeto:true});
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(EstructuraPagina);

