import React from 'react';
import ThemeDefault from '../theme-default';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../Components/Header';
import LeftDrawer from '../Components/LeftDrawer';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';

import { connect } from "react-redux";
import AdministradorContainer from './AdministradorContainer';
import EmpleadoContainer from './EmpleadoContainer';

class TejiendoRedesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navDrawerOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.width !== nextProps.width) {
            this.setState({navDrawerOpen: nextProps.width === LARGE});
        }
    }

    handleChangeRequestNavDrawer() {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        });
    }

    render() {
        let { navDrawerOpen } = this.state;
        let { selectedPerfil } = this.props;
        const paddingLeftDrawerOpen = 236;
        console.log('selectedPerfil');
        console.log(selectedPerfil);
        function ContentApp() {
            if (selectedPerfil === 'Empleado') {
				return (
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <EmpleadoContainer />
                    </div>
                );
            }
            else if(selectedPerfil === 'Administrator'){
                return(
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <AdministradorContainer/>
                    </div>
                );
            }

			return <div> ERROR </div>;

		};

        function TejiendoRedes() {

			if (selectedPerfil !== '') {
				return (
                    <div>
                        <ContentApp/>
                    </div>
				);
			}

			else{
				return <div><ContentApp/></div>;
			}
		};
        const styles = {
            header: {
                paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
            },
            container: {
                margin: '0em 0em 0em 2em',
                paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
            }
        };

        return (
            <div className="imgCorp">
                <MuiThemeProvider muiTheme={ThemeDefault}>
                    <div style={{minHeight:'100%'}}>
                        <Header styles={styles.header} handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>
                        <LeftDrawer style={{zIndex: 900}} navDrawerOpen={navDrawerOpen}/>

                        <div className="divBody" style={styles.container}>
                            <TejiendoRedes/>
                        </div>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedPerfil: state.LoginReducer.selectedPerfil,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};
 
export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(TejiendoRedesApp));