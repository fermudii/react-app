import React, { Component } from 'react';
import { Form, Icon, Input, Row, Col, Modal} from 'antd';

import { connect } from "react-redux";

const FormItem = Form.Item;


class ModalNuevoEmpleado extends Component {
    state = {
        confirmDirty: false,
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {onShowNuevaCategoriaModal,
            showNuevaCategoriaModal,
            onRequestNuevaCategoria,
            fetchingNuevaCategoria,
            } = this.props;
        

        const handleOk = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    if(!fetchingNuevaCategoria){
                        onRequestNuevaCategoria(values);
                        this.props.form.resetFields(); 
                    }
                }
            });
        }

        const handleCancel = () => {
            this.props.form.resetFields(); 
            onShowNuevaCategoriaModal();
        }

        const buttonProps = {
            htmlType: "submit",
            loading:fetchingNuevaCategoria,
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
                <Modal title="Nuevo Empleado"
                visible={showNuevaCategoriaModal}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={buttonProps}
                width={900}
                okText="Ok"
                cancelText="Cancelar"
                >
                    <div >
                        <Form>
                            <Row>
                                <Col span={24}>
                                    <FormItem {...formItemLayout}
                                    extra=""
                                    label="Nombre de la categoría"
                                    >
                                    {getFieldDecorator('descripcion', {
                                        rules: [{
                                            required: true, message: 'Favor de llenar el campo.',
                                            }],
                                    })(
                                        <Input prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={50} placeholder="Categoría"/>
                                    )}
                                    </FormItem>
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
        showNuevaCategoriaModal: state.AdministradorReducer.showNuevaCategoriaModal,
        fetchingNuevaCategoria: state.AdministradorReducer.fetchingNuevaCategoria,
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onShowNuevaCategoriaModal: () => {
            dispatch({ type: "SHOW_NUEVA_CATEGORIA_MODAL", showNuevaCategoriaModal:false});
        },
        onRequestNuevaCategoria: (formulario) => {
            dispatch({ type: "CREAR_CATEGORIA_REQUEST", formulario: formulario});
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Form.create()(ModalNuevoEmpleado));
