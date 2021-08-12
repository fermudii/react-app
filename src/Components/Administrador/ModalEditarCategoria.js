import React, { Component } from 'react';
import { Form, Icon, Input, Row, Col, Modal} from 'antd';

import { connect } from "react-redux";

class ModalEditarCategoria extends Component {
	render() {
        const { getFieldDecorator } = this.props.form;
        
        const {
            showEditarCategoriaModal,
            onChangeEditMode,
            infoCategoria,
            onRequestEditarCategoria,
            fetchingEditarCategoria,
        } = this.props;
		
 		const handleSubmit = (e) => {
			e.preventDefault();
			this.props.form.validateFieldsAndScroll((err, formulario) => {
				if (!err) {
					if(!fetchingEditarCategoria){
                        onRequestEditarCategoria(formulario, infoCategoria, );
						this.props.form.resetFields();
					}
				}
			});
		}

		const handleCancel = () => {
            this.props.form.resetFields();
			onChangeEditMode();
        }

		const buttonProps = {
            htmlType: "submit",
            loading:fetchingEditarCategoria,
        };
        
        const formItemLayout = {
            labelCol: {
                sm: {span: 0},
            },
            wrapperCol: {
                sm: {span: 22},
            },
        };

		return (

			<div>

				<Modal title="EDITAR NOTA"
					visible={showEditarCategoriaModal}
					onOk={handleSubmit}
					onCancel={handleCancel}
					okButtonProps={buttonProps}
                    width={900}
                    height={300}
					okText="Guardar Nota"
					cancelText="Cancelar"
					>
					<div>
                        <Form>
                            <Row>
                                <Col span={24}>
                                    <Form.Item {...formItemLayout}
                                    label="Nombre de Categoría"
                                    >
                                        {getFieldDecorator('descripcion', {
                                            initialValue:infoCategoria.categoriaBlog,
                                            rules: [{
                                                required: true, message: 'Favor de llenar el campo.',
                                            }]
                                        })(
                                            <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={50} placeholder="Ingrese nombre" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
					</div>
				</Modal>
			</div>
		);
  	}
}

const mapStateToProps = state => {
	return {
	    showEditarCategoriaModal:state.AdministradorReducer.showEditarCategoriaModal,
        fetchingEditarCategoria:state.AdministradorReducer.fetchingEditarCategoria,
        infoCategoria: state.AdministradorReducer.infoCategoria,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onChangeEditMode: () => {
			dispatch({ type: "SHOW_EDITAR_CATEGORIA_MODAL" , showEditarCategoriaModal:false, infoCategoria:[]});
		},
		onRequestEditarCategoria: (formulario, infoCategoria) => {
			dispatch({ type: "EDITAR_CATEGORIA_REQUEST" , formulario:formulario, infoCategoria:infoCategoria});
		},
	};
};

export default connect(mapStateToProps,mapDispatchToProps) (Form.create()(ModalEditarCategoria));

