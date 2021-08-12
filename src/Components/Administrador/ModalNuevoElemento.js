import React, { Component } from 'react';
import { Form, Icon, Input, Row, Col, Modal, Spin, Select, InputNumber, Button } from 'antd';
import { EditorState, convertToRaw } from 'draft-js';
import ImageUploading from "react-images-uploading";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import { connect } from "react-redux";

const FormItem = Form.Item;
const Option = Select.Option;

class ModalNuevoElemento extends Component {
    state = {
        previewVisible: false,
        fileList:[],
        confirmDirty: false,
        editorState: EditorState.createEmpty(),
        tipoElemento: null,
    };
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {onShowNuevoColonoModal,
            showModalNuevoElemeto, onRequestNuevoElemento,
            fetchingCrearElemento, listTiposElementos,
        } = this.props;
        const { editorState } = this.state;

        const handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, formulario) => {
                if (!err) {
                    if(!fetchingCrearElemento){
                        const htmlEditor = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                        const background = 'transparent';
                        const texto= this.state.texto;
                        const fileList = this.state.fileList;
                        console.log("lo que me interesa", fileList)
                        console.log(formulario, htmlEditor, texto, background);
                       /*  onRequestNuevoElemento(formulario, htmlEditor, background, fileList); */
                        this.setState({
                            editorState: EditorState.createEmpty(),
                            tipoElemento: null,
                            uploadImagen: false,
                            fileList: undefined,
                        });  
                        this.props.form.resetFields();
                    }
                }
            });
        }

        const handleCancel = () => {
            this.props.form.resetFields(); 
            this.setState({
                uploadImagen: false,
            });
            onShowNuevoColonoModal();
        }

        const buttonProps = {
            htmlType: "submit",
            loading: fetchingCrearElemento,
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
            this.setState({
                tipoElemento: parseInt(value),
            })
        };

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
                <Modal title="NUEVO ELEMENTO"
                visible={showModalNuevoElemeto}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={buttonProps}
                width={'90%'}
                okText="Crear"
                cancelText="Cancelar"
                >
                    <div>
                        <Spin spinning={fetchingCrearElemento}>
                            <Form>
                                <Row>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout}
                                        extra=""
                                        label="Título de elemento"
                                        >
                                        {getFieldDecorator('titulo', {
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
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }]
                                            })(
                                                <Input prefix={<Icon type="font-colors" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={100} placeholder="Descripción de elemento" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item {...formItemLayout}
                                        label="Orden"
                                        >
                                            {getFieldDecorator('orden', {
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
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }],
                                            })(
                                                <InputNumber max={24} style={{width: '100%'}}/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    {this.state.tipoElemento !== null ? (
                                        <div>
                                            {this.state.tipoElemento == 2 ? (
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
                                                {this.state.tipoElemento == 3 ? (
                                                <div>
                                                    <Col span={6}>
                                                        <Form.Item {...formItemLayout}
                                                        label="Texto del botón"
                                                        >
                                                            {getFieldDecorator('textComp', {
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
                                                                rules: [{
                                                                    required: true, message: 'Favor de llenar el campo.',
                                                                }],
                                                            })(
                                                                <Input prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={50} placeholder="Ingrese el título del elemento al que se ligará" />
                                                            )}
                                                        </Form.Item>
                                                    </Col>
                                                </div>
                                                ):(
                                                <div>
                                                    {this.state.tipoElemento == 1 ? (
                                                    <Col span={12}>
                                                        <Form.Item {...formItemLayout}
                                                        label="Texto del componente"
                                                        >
                                                            {getFieldDecorator('textComp', {
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
                                                    ):(false)}
                                                    </div>
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
        showModalNuevoElemeto: state.AdministradorReducer.showModalNuevoElemeto,
        fetchingCrearElemento: state.AdministradorReducer.fetchingCrearElemento,
        listTiposElementos: state.AdministradorReducer.listTiposElementos,
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onShowNuevoColonoModal: () => {
            dispatch({ type: "OPEN_NUEVO_ELEMENTO_MODAL", showModalNuevoElemeto:false});
        },
        onRequestNuevoElemento: (formulario, htmlEditor, background, fileList) => {
            dispatch({ type: "CREAR_ELEMENTO_REQUEST", formulario: formulario, htmlEditor: htmlEditor, background: background, fileList: fileList });
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Form.create()(ModalNuevoElemento));
