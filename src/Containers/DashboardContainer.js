import React, { Component } from 'react';
import '../stylesheets/dashboard/dashboard.css';

import Header from '../Components/HeaderHome';
import Contenido from '../Components/Dashboard/Contenido';
import Image from '../assets/img/niña.png'

class DashboardContainer extends Component {
    state = { 
        width: 0, 
        height: 0,
    };

    componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    render() { 
        return (
            <div className="dashboardFondo">
              {this.state.width >= 1000 ? (
                <div className="ovalo">
                    <Header/>
                    <br/>
                    <br/>
                    <Contenido/>
                </div>
              ):(
                <div>
                    <Header/>
                    <br/>
                    <br/>
                    <Contenido/>
                </div>
              )}
            </div>
        );
    }
}


export default DashboardContainer;

