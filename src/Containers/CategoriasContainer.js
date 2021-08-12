import React, { Component } from 'react';
import { Col, Menu, Dropdown, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import '../stylesheets/dashboard/dashboard.css';
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';

import { connect } from "react-redux";
import Item from 'antd/lib/list/Item';

const { SubMenu } = Menu;


class CategoriaContainer extends Component {
    componentDidMount(){
        this.props.onGetCategoria();
        /* if(this.props.categorias[0]){
        console.log("categorias en el header",this.props.categorias)
        } */
    }
    render(){
        const {onChangeCategoria, categorias, defaultCategoria, onChangeValorCategoria} = this.props;

        const menu = (
            <Menu>
                <Link to="/" ><Col style={{textAlign: 'center'}}>Ir a inicio</Col></Link>
               {categorias.map(item =>
                            <Menu.Item key={item.idCategoria} style={{fontSize: 10+'px', margin:0+'px'}}><a href={"/Categorias/" + item.idCategoria} >
                                    {item.descripcion}
                                </a></Menu.Item>
                )}
            </Menu>
          );

        const obtenerIdCategoria = (e) => {
            /* console.log("hola si la estoy mandando",e.key); */
            onChangeValorCategoria(e.key);
        };
          

        return(
                <div className="letraCategorias">
              {/*   {console.log("defaultCategoria",defaultCategoria)} */}
                    
                {categorias[0]?(
                    <Menu mode="horizontal" className="colorCategorias">
                    <Menu.Item>
                        <a href={"/blog"} >
                            Todos
                        </a>
                    </Menu.Item>
                        {categorias.map(item =>
                            <Menu.Item key={item.idCategoria} onClick={(e) => {obtenerIdCategoria(e); }} style={{fontSize: 15+'px', margin:0+'px'}}>
                                <a href={"/Categorias/" + item.idCategoria} >
                                    {item.descripcion}
                                </a>
                            </Menu.Item>
                         )}
                    </Menu>
                ):(<h3>No se encontraron categorias en el Blog</h3>)}
                </div>
        )
    }
}

const mapStateToProps = state => {
	return {
        categorias: state.AdministradorReducer.categorias,
        defaultCategoria: state.DashboardReducer.defaultCategoria,
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCategoria: () => {
            dispatch({ type: "GET_CATEGORIAS_REQUEST" });
        },
        onChangeValorCategoria: (defaultCategoria) => {
			dispatch({type: "CHANGE_CATEGORIA", defaultCategoria});
        },
       
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(CategoriaContainer);