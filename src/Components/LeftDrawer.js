import React from 'react';
import {spacing, typography} from 'material-ui/styles';
import {white} from 'material-ui/styles/colors';
import {Drawer, MenuItem, Avatar} from 'material-ui';
import avatar from "../assets/pictures/adultos-barba.png";

import { connect } from "react-redux";

const LeftDrawer = (props) => {
	let { navDrawerOpen, cambiarPerfil, selectedPerfil, usuario } = props;
	const perfiles = JSON.parse(sessionStorage.getItem('perfiles'));
	let userInfoJSON=usuario;
	let foto = avatar;
	
	if(userInfoJSON.foto){
		foto = userInfoJSON.foto;
	}
	
	
	const styles = {
		logo: {
			cursor: 'pointer',
			fontSize: 22,
			color: typography.textFullWhite,
			lineHeight: `${spacing.desktopKeylineIncrement}px`,
			fontWeight: typography.fontWeightLight,
			backgroundColor: '#022E69',
			paddingLeft: 40,
			height: 56,
			},
		menuItem: {
			color: white,
			fontSize: 14,
		},
		avatar: {
			div: {
				padding: '20px 20px 20px 20px',
				backgroundImage:  'url(' + require('../assets/pictures/material_bg.png') + ')',
				height: 90,
			},
			icon: {
				float: 'left',
				display: 'block',
				marginRight: 15,
				boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
			},
			span: {
				paddingTop: 12,
				display: 'block',
				color: 'white',
				fontWeight: 300,
				textShadow: '1px 1px #444'
			}
		}
	};
	const changePerfil = (e, perfiles) => {
		cambiarPerfil(perfiles.perfil);
		sessionStorage.setItem('perfilUsuario', perfiles.perfil);
	}
	
	return (
		<Drawer
		style={{zIndex: '990'}}
		docked={true}
		open={navDrawerOpen}>
			<div style={styles.logo}>
				{selectedPerfil}
			</div>
			<div style={styles.avatar.div}>
				<Avatar src={foto}
				size={50}
				style={styles.avatar.icon}/>
				<span style={styles.avatar.span}>{userInfoJSON.empleado}</span>
			</div>
			<div>
				{perfiles.map((perfiles, idPerfil) =>
					<MenuItem
					key={idPerfil}
					style={styles.menuItem}
					primaryText={perfiles.perfil}
					onClick={event => changePerfil(event, perfiles)}
					/>
				)}
			</div>
		</Drawer>
	);
};

const mapStateToProps = state => {
	return {
    selectedPerfil: state.LoginReducer.selectedPerfil,
    usuario: state.LoginReducer.usuario,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cambiarPerfil: (selectedPerfil,) => {
      dispatch({type: "CHANGE_SELECTED_PROFILE", selectedPerfil: selectedPerfil});
    },
  };
};


export default connect(mapStateToProps,mapDispatchToProps) (LeftDrawer);
