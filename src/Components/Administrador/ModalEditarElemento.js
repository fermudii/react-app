import React, { Component } from 'react';
import { Form, Icon, Input, Row, Col, Modal, Spin, Select, InputNumber, Button } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import ImageUploading from "react-images-uploading";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { connect } from "react-redux";

const FormItem = Form.Item;
const Option = Select.Option;

class ModalEditarElemento extends Component {
    state = {
        confirmDirty: false,
        editorState: null,
        tipoElemento: null,
        uploadImagen: false,
        fileList: [],
    };
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const {onShowEditarModal, elementoSeleccionado,
            showModalEditarElemeto, onRequestEditarElemento,
            fetchingEditarElemento, listTiposElementos,
        } = this.props;
        const { editorState } = this.state;
        let tipoElemento = this.state.tipoElemento;
        console.log('elementoSeleccionado');
        console.log(elementoSeleccionado);
        console.log(tipoElemento);

        if(this.state.editorState == null && elementoSeleccionado !== []){
            const html = elementoSeleccionado.textComp;
            if(html){
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    console.log(elementoSeleccionado.fondo);
                    tipoElemento = elementoSeleccionado.idTipoElemento;
                    this.state = {
                        editorState,
                        tipoElemento: elementoSeleccionado.idTipoElemento,
                    };
                }
            }
            
        }

        const handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, formulario) => {
                if (!err) {
                    if(!fetchingEditarElemento){
                        const htmlEditor = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                        const background = 'transparent';
                        const idElemento = elementoSeleccionado.idElementoBase
                        for(let i=0; i<listTiposElementos.length; i++){
                            if(formulario.idTipoElemento === listTiposElementos[i].descripcion){
                                formulario.idTipoElemento = listTiposElementos[i].idTipoElemento;
                            }
                        }
                        console.log(formulario, htmlEditor, background);
                        const foto = this.state.fileList;
                        
                        onRequestEditarElemento(formulario, htmlEditor, background, idElemento, foto);
                        this.setState({
                            uploadImagen: false,
                            fileList: undefined,
                            editorState: null,
                        });
                        this.props.form.resetFields();
                    }
                }
            });
        }

        const handleCancel = () => {
            this.props.form.resetFields(); 
            onShowEditarModal();
            this.setState({
                confirmDirty: false,
                editorState: null,
                tipoElemento: null,
                uploadImagen: false,
                fileList: [],
            });
        }

        const buttonProps = {
            htmlType: "submit",
            loading: fetchingEditarElemento,
        };

        const formItemLayout = {
            labelCol: {
                sm: {span: 0},
            },
            wrapperCol: {
                sm: {span: 22},
            },
        };
        const onEditorHTML = () => {
            console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        }
        const onTipoElemento = (value) => {
            console.log('value');
            console.log(value);
            tipoElemento = parseInt(value)
            this.setState({
                tipoElemento: parseInt(value),
            })
        }

        const onChange = (imageList) =>{
            console.log(imageList);
            if(imageList.length!==0){
                this.setState({
                    uploadImagen: true,
                    fileList: imageList,
                });
            }
            else{
                this.setState({
                    uploadImagen: false,
                });
            }
        }
        return (
            <div>	
                <Modal title="EDITAR ELEMENTO"
                visible={showModalEditarElemeto}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={buttonProps}
                width={'90%'}
                okText="Editar"
                cancelText="Cancelar"
                >
                    <div>
                        <Spin spinning={fetchingEditarElemento}>
                            <Form>
                                <Row>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout}
                                        extra=""
                                        label="Título de elemento"
                                        >
                                        {getFieldDecorator('titulo', {
                                            initialValue: elementoSeleccionado.titulo,
                                            rules: [{
                                                required: true, message: 'Favor de llenar el campo.',
                                              }],
                                        })(
                                            <Input prefix={<Icon type="font-colors" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={50} placeholder="Título de elemento"/>
                                        )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item {...formItemLayout}
                                        label="Descripción de elemento"
                                        >
                                            {getFieldDecorator('descripcion', {
                                                initialValue: elementoSeleccionado.descripcion,
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }]
                                            })(
                                                <Input prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={100} placeholder="Descripción de elemento" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item {...formItemLayout}
                                        label="Tipo de elemento"
                                        >
                                            {getFieldDecorator('idTipoElemento', {
                                                initialValue: elementoSeleccionado.tipoElemento,
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }]
                                            })(
                                                <Select
                                                    style={{ width: '100%' }}
                                                    placeholder="Selecciona el tipo de elemento"
                                                    onChange={onTipoElemento}
                                                >
                                                    {listTiposElementos.map(option => <Option key={option.idTipoElemento}>{option.descripcion}</Option>)}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item {...formItemLayout}
                                        label="Estilo del componente"
                                        >
                                            {getFieldDecorator('desComp', {
                                                initialValue: elementoSeleccionado.desComp,
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }]
                                            })(
                                                <Input prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={100} placeholder="Descripción de elemento" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item {...formItemLayout}
                                        label="Orden"
                                        >
                                            {getFieldDecorator('orden', {
                                                initialValue: elementoSeleccionado.orden,
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }],
                                            })(
                                                <InputNumber style={{width: '100%'}}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item {...formItemLayout}
                                        label="Tamaño horizontal (max 24)"
                                        >
                                            {getFieldDecorator('icono', {
                                                initialValue: elementoSeleccionado.icono,
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }],
                                            })(
                                                <InputNumber max={24} style={{width: '100%'}}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    {tipoElemento !== null ? (
                                        <div>
                                            {tipoElemento == 2 ? (
                                                <div>
                                                    <Col span={6}>
                                                        <Form.Item
                                                            {...formItemLayout}
                                                            label="Foto"
                                                            extra="">
                                                                <ImageUploading onChange={onChange}>
                                                                {({ imageList, onImageUpload }) => (
                                                                // write your building UI
                                                                <div className="upload__image-wrapper">
                                                                    {this.state.uploadImagen === undefined || this.state.uploadImagen === false ? (
                                                                        <Button type="primary" onClick={onImageUpload}>Upload images</Button>
                                                                    ): (false)}
                                                        
                                                                    {imageList.map(image => (
                                                                    <div key={image.key} className="image-item">
                                                                        <img src={image.dataURL} />
                                                                        <Button type="danger" onClick={image.onRemove}><Icon type="delete" /></Button>
                                                                    </div>
                                                                    ))}
                                                                </div>
                                                                )}
                                                            </ImageUploading>
                                                        </Form.Item>
                                                    </Col>
                                                </div>
                                            ):(
                                            <div>
                                                {tipoElemento == 3 ? (
                                                <div>
                                                    <Col span={6}>
                                                        <Form.Item {...formItemLayout}
                                                        label="Texto del botón"
                                                        >
                                                            {getFieldDecorator('textComp', {
                                                                initialValue: elementoSeleccionado.textComp,
                                                                rules: [{
                                                                    required: true, message: 'Favor de llenar el campo.',
                                                                }],
                                                            })(
                                                                <Input prefix={<Icon type="font-colors" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={50} placeholder="Texto del botón" />
                                                            )}
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Form.Item {...formItemLayout}
                                                        label="Llevar a"
                                                        >
                                                            {getFieldDecorator('fondo', {
                                                                initialValue: elementoSeleccionado.fondo,
                                                                rules: [{
                                                                    required: true, message: 'Favor de llenar el campo.',
                                                                }],
                                                            })(
                                                                <Input prefix={<Icon type="font-colors" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={50} placeholder="Ingrese el título del elemento al que se ligará" />
                                                            )}
                                                        </Form.Item>
                                                    </Col>
                                                </div>
                                                ):(
                                                <Col span={12}>
                                                    <Form.Item {...formItemLayout}
                                                    label="Texto del componente"
                                                    >
                                                        {getFieldDecorator('textComp', {
                                                            initialValue: elementoSeleccionado.textComp,
                                                            rules: [{
                                                                required: true, message: 'Favor de llenar el campo.',
                                                            }],
                                                        })(
                                                            <Editor
                                                            editorState={editorState}
                                                            wrapperClassName="demo-wrapper"
                                                            editorClassName="demo-editor editorHTML"
                                                            onEditorStateChange={this.onEditorStateChange}
                                                            onChange={onEditorHTML}
                                                            />
                                                        )}
                                                    </Form.Item>
                                                </Col>
                                                )}
                                            </div>
                                            )}
                                        </div>
                                    ):(false)}
                                </Row>
                            </Form>
                        </Spin>	
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {

	return {
        showModalEditarElemeto: state.AdministradorReducer.showModalEditarElemeto,
        fetchingEditarElemento: state.AdministradorReducer.fetchingEditarElemento,
        listTiposElementos: state.AdministradorReducer.listTiposElementos,
        elementoSeleccionado: state.AdministradorReducer.elementoSeleccionado,
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onShowEditarModal: () => {
            dispatch({ type: "OPEN_EDITAR_ELEMENTO_MODAL", showModalEditarElemeto:false});
        },
        onRequestEditarElemento: (formulario, htmlEditor, background, idElemento, fileList) => {
            dispatch({ type: "EDITAR_ELEMENTO_REQUEST", formulario: formulario, htmlEditor: htmlEditor, background: background, idElemento: idElemento, fileList: fileList });
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Form.create()(ModalEditarElemento));
