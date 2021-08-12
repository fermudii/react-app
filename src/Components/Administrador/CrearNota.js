import React, { Component } from 'react';
import { Form, Icon, Input, Row, Col, Card, Button, Select, message, Tooltip} from 'antd';
import '../../stylesheets/Administrator/Administrator.css'
import { connect } from "react-redux";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import ImageUploading from "react-images-uploading";
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

class CrearNota extends Component {
    componentDidMount() {
        this.props.onRequestCategorias();
    }
    normFile = (e) => {
        //console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    state = {
        previewImage: '',
        uploadImagen: false,
        previewVisible: false,
        fileList: [],
        editorState: EditorState.createEmpty(),
        tipoElemento: null,
        showAlerta: false,
        showAlertaTamano: false,
        showAlertaTamanoBajo: false
    };
    constructor() {
        super();
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
    };

    //Editor
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    handleChange(checked) {
        this.setState({ checked });
    };

    handleCancel = () => this.setState({ previewVisible: false, uploadImagen: false, });
    render() {
        const { getFieldDecorator } = this.props.form;
        const { showAlerta, showAlertaTamano, showAlertaTamanoBajo } = this.state;
        const { editorState } = this.state;     //editor

        const { onRequestCrearNota,
            fetchingCrearNota,
            fetchingGetCategorias,
            categorias,
            onShowErrorMsg
        } = this.props;

        if(showAlerta){
            message.config({
            });
            message.error("Sólo se aceptan imágenes jpeg, jpg y png.", 5);
            onShowErrorMsg();
            setTimeout(() => {
                this.setState({
                    showAlerta: false,
                    showAlertaTamano: false,
                    showAlertaTamanoBajo: false
                }); 
             }, 2000);
        }
        else if(showAlertaTamano){
            message.config({
            });
            message.error("Tu archivo es demasiado pesado. No debe de pasar de 600KB.", 5);
            onShowErrorMsg();
            setTimeout(() => {
                this.setState({
                    showAlerta: false,
                    showAlertaTamano: false,
                    showAlertaTamanoBajo: false
                }); 
             }, 2000);
        }
        else if(showAlertaTamanoBajo){
            message.config({
            });
            message.error("Tu archivo debe medir mínimo 40KB para ser aceptado.", 5);
            onShowErrorMsg();
            setTimeout(() => {
                this.setState({
                    showAlerta: false,
                    showAlertaTamano: false,
                    showAlertaTamanoBajo: false
                }); 
             }, 2000);
        }


        const handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    if (!fetchingCrearNota) {
                        //Editor
                        const htmlEditor = '';
                        const background = 'transparent';
                        const fileList = this.state.fileList;
                        console.log("htmlEditor",htmlEditor)

                        if(editorState==undefined){
                            if(fileList===undefined){
                                onRequestCrearNota(values, htmlEditor, fileList);
                                        this.props.form.resetFields();
                                        this.setState({ previewVisible: false, 
                                            uploadImagen: false,
                                            fileList: undefined,
                                            editorState: EditorState.createEmpty(), //editor
                                        });
                            }
                            else{
                                htmlEditor = '';
                                onRequestCrearNota(values, htmlEditor, fileList);
                                this.props.form.resetFields();
                                this.setState({ previewVisible: false, 
                                    uploadImagen: false,
                                    fileList: undefined,
                                    editorState: EditorState.createEmpty(), //editor
                                });
                            }
                        }
                        
                        if(fileList===undefined){
                            if(editorState==undefined){
                                htmlEditor = '';
                                onRequestCrearNota(values, htmlEditor, fileList);
                                this.props.form.resetFields();
                                this.setState({ previewVisible: false, 
                                    uploadImagen: false,
                                    fileList: undefined,
                                    editorState: EditorState.createEmpty(), //editor
                                });
                            }
                            else{
                            htmlEditor = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                            onRequestCrearNota(values, htmlEditor, fileList);
                                    this.props.form.resetFields();
                                    this.setState({ previewVisible: false, 
                                        uploadImagen: false,
                                        fileList: undefined,
                                        editorState: EditorState.createEmpty(), //editor
                                    });
                            }
                        }
                        else{
                        if(fileList[0].file.type === "image/jpeg" || fileList[0].file.type === "image/jpg" || fileList[0].file.type === "image/png"){
                            if(fileList[0].file.size <= 600000){
                                if(fileList[0].file.size >=40000){
                                    if(editorState==undefined){
                                        htmlEditor = '';
                                    }
                                    else{
                                       htmlEditor = draftToHtml(convertToRaw(editorState.getCurrentContent())); 
                                    }
                                    onRequestCrearNota(values, htmlEditor, fileList);
                                    this.props.form.resetFields();
                                    this.setState({ previewVisible: false, 
                                        uploadImagen: false,
                                        fileList: undefined,
                                        editorState: EditorState.createEmpty(), //editor
                                    });
                                }
                                else{
                                    this.setState({
                                        showAlertaTamanoBajo: true
                                    }); 
                                }
                               
                            }
                            else{
                                this.setState({
                                    showAlertaTamano: true
                                }); 
                            }
                            
                        }
                        else{
                            this.setState({
                                showAlerta: true
                            });        
                        }
                        }
                    }
                }
            });
        }
        const onChange = (imageList) =>{
/*             console.log("imageList aqui 2",imageList); */
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
        //Editor
        const onEditorHTML = () => {
           /*  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent()))); */
        }
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Subir Imagen</div>
            </div>
        );
        const text = "No te excedas de 384 caracteres, para contar los caracteres ingresa a este link: https://www.contarcaracteres.com/"

        const formItemLayout = {
            labelCol: {
                sm: { span: 0 },
            },
            wrapperCol: {
                sm: { span: 22 },
            },
        };

        return (
            <div >
            <Card className="cardNuevaNota">
                <Form onSubmit={handleOk}>
                    <Row>
                        <Col span={24}>
                            <FormItem {...formItemLayout}
                            extra=""
                            label="Título de Nota"
                            >
                            {getFieldDecorator('titulo', {
                                rules: [{
                                    required: true, message: 'Favor de llenar el campo.',
                                    }],
                            })(
                                <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={150} placeholder="Ingrese el título"/>
                            )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <Form.Item {...formItemLayout}
                            label = "Descripción de Nota"
                            >
                                {getFieldDecorator('descripcion', {
                                    rules: [{
                                        required: true, message: 'Favor de llenar el campo.',
                                    }]
                                })(
                                    <TextArea prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} rows={10} placeholder="Ingrese descripción" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item {...formItemLayout}
                            label="URL video"
                            >
                                {getFieldDecorator('urlVideo', {
                                })(
                                    <Input prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={5000} placeholder="Ingrese el url del video" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item {...formItemLayout}
                            label="Contenido de Nota"
                            >
                                {getFieldDecorator('texto', {
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
                        <Col span={11}>
                            <Form.Item {...formItemLayout}
                            label="Palabras Clave"
                            >
                                {getFieldDecorator('palabraClave1', {
                                    rules: [{
                                        required: true, message: 'Favor de llenar el campo.',
                                    }]
                                })(
                                    <Input prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={5000} placeholder="Ingrese una palabra clave" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item {...formItemLayout}
                            label="Palabras Clave"
                            >
                                {getFieldDecorator('palabraClave2', {
                                    rules: [{
                                        required: true, message: 'Favor de llenar el campo.',
                                    }]
                                })(
                                    <Input prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={5000} placeholder="Ingrese otra palabra clave" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around">
                    <Col xs={13} sm={14}>
                                <Form.Item {...formItemLayout}
                                label="Categoría"
                                >
                                    {getFieldDecorator('categoria', {
                                        rules: [{
                                        required: true, message: 'Favor de llenar el campo.',
                                        }],
                                    })(
                                        <Select
                                            style={{ width: '100%' }}
                                            placeholder="Seleccionar"
                                            loading={fetchingGetCategorias}
                                        >
                                            {categorias.map(option => <Option key={option.idCategoria}>{option.descripcion}</Option>)}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            
                        <Col xs={24} sm={10}>
                            <FormItem
                                {...formItemLayout}
                                label="Imagen"
                            >
                                <ImageUploading onChange={onChange}>
                                        {({ imageList, onImageUpload }) => (
                                        // write your building UI
                                        <div className="upload__image-wrapper">
                                      
                                            {this.state.uploadImagen === undefined || this.state.uploadImagen === false ? (
                                                <Button type="primary" onClick={onImageUpload}>Upload images</Button>
                                            ): (false)}
                                        
                                            {imageList.map(image => (
                                            <div key={image.key} className="image-item">
                                          
                                                <img style={{width:90}} src={image.dataURL} />
                                                <Button type="danger" onClick={image.onRemove}><Icon type="delete" /></Button>
                                            </div>
                                            ))}
                                        </div>
                                        )}
                                </ImageUploading>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row type="flex" justify="space-around">
                        <Col xs={20} sm={18}>
                            <Button htmlType="submit" className="btnCrearNota" size="large" loading={fetchingCrearNota}>
                                Crear Nota
                            </Button>
                        </Col>
                        
                    </Row>
                </Form>
            </Card>	
          </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        fetchingCrearNota: state.AdministradorReducer.fetchingCrearNota,
        fetchingGetCategorias: state.AdministradorReducer.fetchingGetCategorias,
        categorias: state.AdministradorReducer.categorias,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestCategorias: () => {
            dispatch({ type: "GET_CATEGORIAS_REQUEST" });
        },
        onRequestCrearNota: (formulario, htmlEditor, fileList) => {
            dispatch({ type: "CREAR_NOTA_REQUEST", formulario: formulario, htmlEditor:htmlEditor, fileList });
        },
        onShowErrorMsg: () => {
            dispatch({ type: "SHOW_ERROR_MSG" , showErrorMsg:false, textMessage:null});
       },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CrearNota));