import React, { Component } from 'react'
import {Form, Icon, Input, Row, Col, Spin, Modal, Select, Button, Tooltip, message} from 'antd'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import ReactPlayer from 'react-player/youtube'
import ImageUploading from "react-images-uploading";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {connect} from 'react-redux';

const { TextArea } = Input;
const FormItem = Form.Item
const Option = Select.Option

class ModalEditarNota extends Component {
    normFile = (e) => {
        if(Array.isArray(e)){
            return e
        }
        return e && e.fieldList
    }
    state = {
        previewImage: '',
        uploadImagen: false,
        previewVisible: false,
        fileList: [{}],
        showAlerta: false,
        showAlertaTamano: false,
        showAlertaTamanoBajo: false,
        pedirImagen: false
    }
    constructor() {
        super()
        this.state = { 
            checked: false,
            editorState: null,
            tipoCategoria: null,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.onRequestCategorias();
    }

    onEditorStateChange = (editorState) => {
        console.log("editorState en onEditorStateChange",editorState)
        this.setState({
            editorState,
        });
    };

    handleChange(checked){
        this.setState({checked})
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }
    handleCancel = () => this.setState({ previewVisible: false })


    render() {
        const {getFieldDecorator} = this.props.form
        const { showAlerta, showAlertaTamano, showAlertaTamanoBajo, pedirImagen } = this.state;
        const { editorState } = this.state;
        let tipoCategoria = this.state.tipoCategoria;

        const {
            fetchingEditarNota,
            showEditarNotaModal,
            onChangeEditMode,
            notaInfo,
            onRequestEditarNota,
            fetchingInfoNotas,
            fetchingGetCategorias,
            categorias,
            onShowErrorMsg
        } = this.props
        console.log('notaInfo');
        console.log(notaInfo);

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


        /* if(editorState==null){
            this.setState({
                peditorState: ''
            })
        } */

        const text = "El video se actualizará una vez que le des guardar.";

        let categoriaD;
        const selectCategoria = () =>{
            for(let i=0; categorias.length>i;i++){
                if(notaInfo.idCategoria == categorias[i].idCategoria){
                    categoriaD=categorias[i].descripcion
                    break;
                }
            }
        }

        selectCategoria();

        if (this.state.editorState == null && notaInfo) {
            const html = notaInfo.texto;
            if (html) {
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    tipoCategoria = notaInfo.idCategoria
                    console.log("EditorState", editorState)
                    this.state = {
                        editorState,
                        tipoCategoria,
                    }
                }

            }
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, formulario) => {
                if (!err) {
                    if (!fetchingEditarNota) {
                        const htmlEditor = '';
                        if(editorState!=null){
                            htmlEditor = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
                        }
                        console.log(formulario, notaInfo, htmlEditor)
                        if (isNaN(formulario.categoria)){
                            formulario.categoria = notaInfo.idCategoria
                        }else {
                            formulario.categoria = formulario.categoria
                        }
                        const fileList = this.state.fileList;
                        if(editorState===null){
                            onRequestEditarNota(formulario, notaInfo, htmlEditor, fileList);
                            this.props.form.resetFields();
                            this.setState({ previewVisible: false, 
                                uploadImagen: false,
                                fileList: undefined,
                                editorState: EditorState.createEmpty(), //editor
                            });
                        }
                        console.log("fileList antes de mandarlo",fileList)
                        onRequestEditarNota(formulario, notaInfo, htmlEditor, fileList);
                        this.setState({
                            uploadImagen: false,
                            editorState: null,

                        });
                       /*  if(fileList[0]){ */
                            
                            /* if(fileList[0].file.type === "image/jpeg" || fileList[0].file.type === "image/jpg" || fileList[0].file.type === "image/png"){
                                if(fileList[0].file.size <= 600000){
                                    if(fileList[0].file.size >=40000){
                                        onRequestEditarNota(formulario, notaInfo, htmlEditor, fileList);
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
                            } */
                       /*  } */
                        

                        this.props.form.resetFields();
                    }
                }
            });
        }

        const handleCancel = () => {
            this.props.form.resetFields();
            this.setState({
                uploadImagen: false,
                editorState: null,
            });
            onChangeEditMode();
        }
        const onChange = (imageList) =>{
           
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
            {console.log("fileList",this.state.fileList)}
        }

        const onTipoElemento = (value) => {
            console.log('value');
            console.log(value);
            tipoCategoria = parseInt(value)
            this.setState({
                tipoCategoria: parseInt(value),
            })
        }

        const onEditorHTML = () => {
            console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        }

        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Subir Imagen</div>
            </div>
        )

        const buttonProps = {
            htmlType: "submit",
            loading:fetchingEditarNota,
        };
        
        const formItemLayout = {
            labelCol: {
                sm: {span: 0},
            },
            wrapperCol: {
                sm: {span: 22},
            },
        }
    

    return (

        <div>

				<Modal title="EDITAR NOTA"
					visible={showEditarNotaModal}
					onOk={handleSubmit}
					onCancel={handleCancel}
					okButtonProps={buttonProps}
                    width={900}
					okText="Editar"
					cancelText="Cancelar"
					>
					<div>
						<Spin spinning={fetchingInfoNotas}>
                            <Form>
                                <Row>
                                    <Col xs={24} sm={12}>
                                        <FormItem {...formItemLayout}
                                        label="Título"
                                        >
                                        {getFieldDecorator('titulo', {
                                            initialValue:notaInfo.titulo,
                                            rules: [{
                                                required: true, message: 'Favor de llenar el campo.',
                                                
                                            }],
                                        })(
                                            <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={150} placeholder="Ingrese el título"/>
                                        )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item {...formItemLayout}
                                        label="Descripción de Nota"
                                        >
                                            {getFieldDecorator('descripcion', {
                                                initialValue:notaInfo.descripcion,
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }]
                                            })(
                                                <TextArea prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} rows={7} placeholder="Ingrese descripción" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={20}>
                                        <Form.Item {...formItemLayout}
                                            label="URL video"
                                            >
                                                {getFieldDecorator('urlVideo', {
                                                    initialValue:notaInfo.video,
                                                })(
                                                    <Input prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={5000} placeholder="Ingrese el url del video" />
                                                )}
                                        </Form.Item>
                                        <Tooltip title={text}> <ReactPlayer url={notaInfo.video} /></Tooltip>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={20}>
                                        <Form.Item {...formItemLayout}
                                        label="Contenido de Nota"
                                        >
                                            {getFieldDecorator('texto', {
                                                initialValue:notaInfo.texto,
                                            })(
                                                <Editor
                                                    editorState={this.state.editorState}
                                                    wrapperClassName="demo-wrapper"
                                                    editorClassName="demo-editor editorHTML"
                                                    onEditorStateChange={this.onEditorStateChange}
                                                    onChange={onEditorHTML}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={4}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="Imagen"
                                        >
                                            {getFieldDecorator('imagen', {
                                                valuePropName: 'fileList',
                                                getValueFromEvent: this.normFile,
                                            })(
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
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xs={13} sm={14}>
                                        <Form.Item {...formItemLayout}
                                            label="Categoría"
                                        >
                                            {getFieldDecorator('categoria', {
                                                initialValue: categoriaD,
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }],
                                            })(
                                                <Select
                                                    style={{ width: '100%' }}
                                                    placeholder="Seleccionar"
                                                    loading={fetchingGetCategorias}
                                                    onChange = {onTipoElemento}
                                                >
                                                    {categorias.map(option => <Option key={option.idCategoria}>{option.descripcion}</Option>)}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    {notaInfo.palabrasClaveByIdNota?(
                                    <div>
                                    <Col span={11}>
                                        <Form.Item {...formItemLayout}
                                        label="Palabras Clave"
                                        >
                                            {getFieldDecorator('palabraClave1', {
                                                initialValue:notaInfo.palabrasClaveByIdNota[0].palabra,
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
                                                initialValue:notaInfo.palabrasClaveByIdNota[1].palabra,
                                                rules: [{
                                                    required: true, message: 'Favor de llenar el campo.',
                                                }]
                                            })(
                                                <Input prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={5000} placeholder="Ingrese una palabra clave" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    </div>
                                    ):(false)}
                                </Row>
							</Form>
						</Spin>
					</div>
				</Modal>
			</div>
    )
 }                                                                                
}

const mapStateToProps  = state => {
    return {
        showEditarNotaModal: state.AdministradorReducer.showEditarNotaModal,
        fetchingEditarNota: state.AdministradorReducer.fetchingEditarNota,
        notaInfo: state.AdministradorReducer.notaInfo,
        fetchingInfoNotas: state.AdministradorReducer.fetchingInfoNotas,
        fetchingGetCategorias: state.AdministradorReducer.fetchingGetCategorias,
        categorias: state.AdministradorReducer.categorias,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeEditMode: () => {
            dispatch({ type: "SHOW_EDITAR_NOTA_MODAL", showEditarNotaModal: false, notaInfo: null });
        },
        onRequestEditarNota: (formulario, notaInfo, htmlEditor, fileList) => {
            dispatch({ type: "EDITAR_NOTA_REQUEST", formulario: formulario, notaInfo: notaInfo, htmlEditor: htmlEditor, fileList });
        },
        onRequestCategorias: () => {
            dispatch({ type: "GET_CATEGORIAS_REQUEST" });
        },
        onShowErrorMsg: () => {
            dispatch({ type: "SHOW_ERROR_MSG" , showErrorMsg:false, textMessage:null});
       },
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Form.create()(ModalEditarNota))