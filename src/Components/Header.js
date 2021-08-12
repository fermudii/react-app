import React from 'react';
import {IconButton, IconMenu, MenuItem, AppBar} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';
import logo from '../assets/pictures/logo-color.png';
import '../stylesheets/Header.css';
import { connect } from "react-redux";
import { black } from 'material-ui/styles/colors';

class Header extends React.Component {
	render() {
		const {styles, handleChangeRequestNavDrawer, cambiarPerfil} = this.props;

		const style = {
			appBar: {
				position: 'fixed',
				top: 0,
				overflow: 'hidden',
				maxHeight: 57,
				backgroundColor: '#ffffff',
				zIndex: 2,
			},
			menuButton: {
				marginLeft: 10,
			},
			iconsRightContainer: {
				marginLeft: 20
			}
		};
		const onLogOut = () => {
			console.log('Log out');
			sessionStorage.clear();
			window.location.reload();
		}
		const onHome = () => {
			cambiarPerfil('Operador');
			sessionStorage.setItem('perfilSeleccionado', 'Operador');
		}

		return (
			<div>
			
				<AppBar
				style={{...styles, ...style.appBar}}
				title={<img className="logoImg" onClick={onHome} src={logo}/>}
				iconElementLeft={
					<IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
						<Menu color={black} />
					</IconButton>
				}	
				iconElementRight={
					<div style={style.iconsRightContainer}>
					<IconMenu color={white}
								iconButtonElement={
								<IconButton><MoreVertIcon color={black}/></IconButton>
								}
								targetOrigin={{horizontal: 'right', vertical: 'top'}}
								anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					>
						<MenuItem primaryText="Cerrar Sesión" onClick={onLogOut}/>
					</IconMenu>
					</div>
				}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		cambiarPerfil: (selectedPerfil) => {
			dispatch({type: "CHANGE_SELECTED_PROFILE", selectedPerfil: selectedPerfil});
		},
	};
};

export default connect(null,mapDispatchToProps)(Header);
