import React, { Component } from 'react';
import DashboardContainer from "./DashboardContainer";
import TejindoRedesApp from "./TejindoRedesApp";
import LoginContainer from './Login';
import CategoriaDashboard from "./CategoriasDashboard";
import BlogContainer from './BlogContainer';
import BlogDashboard from './BlogContainerEspecifico';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { connect } from "react-redux";



class App extends Component {
	componentDidMount(){
		let tituloPath = window.location.pathname;
	/* 	console.log("tituloPath en el component",tituloPath) */
		tituloPath = tituloPath.split('/')[2];
		if(tituloPath){
			if(window.location.pathname.split('/')[1]==='Categorias'){
				this.props.onRequestCategoria(tituloPath);
				console.log("tituloPath entró",tituloPath)
			}
		  	else if(window.location.pathname.split('/')[1]==='Nota'){
			  this.props.onRequestNota(tituloPath);
			}
		}
	}

	render() {
		var http = require("http");
		setInterval(function() {
			http.get("https://kila-dev.herokuapp.com");
		}, 300000);

		const {categoria, listaCategoriaNotas, cleanTitle, notaInfo} = this.props;

		const isAuthenticatedSession = sessionStorage.getItem('isAuthenticated');
		function Redit() {

			let tituloPath = window.location.pathname ;
			tituloPath = tituloPath.split('/')[2];
			console.log("tituloPath final",tituloPath);
			if(tituloPath){
				if(window.location.pathname.split('/')[1]==='Categorias'){
					console.log('entró a las categorias dentro del render', tituloPath);
					if(listaCategoriaNotas!==undefined){
						return <Route exact path={'/Categorias/' + tituloPath} component={CategoriaDashboard}/>
					}
					else{
						console.log('entró a la redirección');
						return <Redirect from='*' to='/' /> ;
					}
				}
				else if(window.location.pathname.split('/')[1]==='Nota'){
					console.log('entró a la nota dentro del render', tituloPath);
				   if(notaInfo!==undefined){
						return <Route exact path={'/Nota/' + tituloPath+ '/' +cleanTitle} component={BlogDashboard}/>
					}
					else{
						console.log('entró a la redirección', tituloPath);
						return <Redirect from='*' to='/' /> ;
					}
				}
			}   
			else{
				console.log('entró a la redirección');
				return <Redirect from='*' to='/' /> ;
			}
		}
		return (
			<div>
				<link
					rel="stylesheet"
					href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
					integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
					crossOrigin="anonymous"
				/>
				
				<Router>
					<Switch>
						<Route exact path="/" component={DashboardContainer} />
						<Route exact path="/login" component={LoginContainer} />
						<Route exact path="/blog" component={BlogContainer} />
						<Route exact path={'/' + categoria} component={CategoriaDashboard}/>
						<Route exact path={'/' + cleanTitle} component={BlogDashboard}/>
					{/* 	<Route exact path="/nota" component={BlogDashboard}/> */}
						{console.log("cleanTitle =",cleanTitle)}
						<PrivateRoute isAuthenticated={isAuthenticatedSession} path="/dashboard" component={TejindoRedesApp} />
						<Redit/>
					</Switch>
				</Router>
			</div>
			
		);
	}
}

const PrivateRoute = ({ component: Component,isAuthenticated, ...rest }) => (
 	<Route
		{...rest}
		render={props => (
			isAuthenticated
			? (<Component {...props} />)
			: (<Redirect to='/home' />)
		)}
 	/>
); 

const mapStateToProps = state => {
	return {
		isAuthenticated: state.LoginReducer.isAuthenticated,
		listaCategoriaNotas: state.AdministradorReducer.listaCategoriaNotas,
		categoria: state.AdministradorReducer.categoria,
		cleanTitle: state.AdministradorReducer.cleanTitle,
		notaInfo: state.AdministradorReducer.notaInfo
	};
};

const mapDispatchToProps = dispatch => {
	return {
    onRequestCategoria: (categoria) => {
      dispatch({type: "GET_NOTAS_CATEGORIA_REQUEST", categoria:categoria, page:0});
	},
	onRequestNota: (tituloPath) => {
		dispatch({type: "GET_NOTA_ESPECIFICA_REQUEST", idNota:tituloPath, pagePalabraClave:0, pageCategoria:0 });
	  },
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (App);