import React, { Component } from 'react'
import { List, Modal, Icon, Card, Input, Pagination, Empty} from 'antd';
import ModalEditarNotaCmp from './ModalEditarNota'
import ReactHtmlParser from 'react-html-parser';
import ReactPlayer from 'react-player/youtube';
import emojiunicode from 'emoji-unicode'
import '../../stylesheets/dashboard/dashboard.css';

import {connect}  from 'react-redux'

const Search = Input.Search;
const confirm = Modal.confirm;
const { TextArea } = Input;

class ListaNotas extends Component {
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
            onRequestEliminaNota,
            onShowEditarNotaModal,
            onRequestInfoNota,
            onRequestListaNotas,
            totalNotas,
            onBuscarNota
        } = this.props;
        console.log(listaNotas);
        console.log("page en el componente", this.state.page)
        
        const showDeleteConfirm = (idNota, titulo) => {
            confirm({
                title: '¿Estás seguro que deseas eliminar la nota  '+ titulo +'?',
                content: '',
                okText: 'Sí',
                okType: 'primary',
                cancelText: 'No',
                onOk() {
                    onRequestEliminaNota(idNota);
                },
                onCancel() {
                    console.log('Cancel');
                },
            });	  
        };

        const showEditConfirmPromo = (notaInfo) => {
            console.log('nota');
            console.log(notaInfo);
            onRequestInfoNota(notaInfo)
            onShowEditarNotaModal();
        };

        const onChange = (e) => {
            this.setState({
                page: e,
            })
            onRequestListaNotas(e);
        }

        const onSearch = (value) => {
            onBuscarNota(value);
        }

        console.log("totalNotas",totalNotas)

        console.log("este es el código del emoji",emojiunicode.raw("📻"));

        return (
            <div >
             <Search
                placeholder="Buscar Nota "
                onSearch={value => onSearch(value)}
                className="searchBar"
                allowClear
            />

                <br/>
                <br/>
            <Card bordered={false} className="divCard" title={
                <div className="header-list">NOTAS
                </div>
            }>

                <List
                itemLayout="vertical"
                className="DivList"
                loading={fetchingGetNotas}
                locale={{ emptyText: 'Sin datos' }}
                dataSource={listaNotas}
                renderItem={item => (
                    <List.Item
                        key={item.idNota}
                        actions={[
                            <div onClick={(e) => { e.stopPropagation(); showDeleteConfirm(item.idNota, item.titulo); } }><Icon className="icon" type="delete" theme="twoTone" twoToneColor="#275E9C" /></div>,
                            <div onClick={(e) => { e.stopPropagation(); showEditConfirmPromo(item); } }><Icon className="icon" type="edit" theme="twoTone" twoToneColor="#275E9C" /></div>
                        ]}
                        extra={
                            <ReactPlayer
                                className="fotoBlogLista"
                                width='100%'
                                height='100%'
                                style={{maxHeight:250}}
                                url={item.video}
                            />
                        }
                    >
                        <List.Item.Meta
                        title={<div className="headerList">{item.titulo}</div>}
                        description={item.descripcion}
                        />
                        <div className="textoNota">
                            <p style={{border: 'none', backgroundColor: 'transparent'}} autosize={{ minRows: 1, maxRows: 6 }}><strong></strong>{ ReactHtmlParser(item.texto)}</p>
                        </div>
                        
                    </List.Item> 
                )}
                /> 
                {totalNotas!=null?(
                    <div>
                        <br/>
                        <Pagination onChange={onChange} total={totalNotas} style={{textAlign:"center"}} pageSize={10} showTotal={total => `Total notas: ${total} `}/>
                    </div>
                ):(false)}
            </Card> 
            
            <ModalEditarNotaCmp/>
        </div>
        )
    } 
}

const mapStateToProps = state => {

	return {
        fetchingGetNotas: state.AdministradorReducer.fetchingGetNotas,
        listaNotas: state.AdministradorReducer.listaNotas,
        totalNotas: state.AdministradorReducer.totalNotas,
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestListaNotas: (page) => {
            dispatch({type: "GET_NOTAS_REQUEST", page:page});
        },
        onRequestInfoNota: (notaInfo) => {
            dispatch({type: "GET_INFO_NOTA_REQUEST", notaInfo:notaInfo});
        },
        onShowEditarNotaModal: () => {
            dispatch({type: "SHOW_EDITAR_NOTA_MODAL", showEditarNotaModal:true})
        },
        onRequestEliminaNota: (idNota) => {
            dispatch({ type: "ELIMINAR_NOTA_REQUEST" ,idNota:idNota });
        },
        onBuscarNota: (nota) => {
            dispatch({ type: "BUSCAR_NOTA_REQUEST",nota, page:0});
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ListaNotas);

