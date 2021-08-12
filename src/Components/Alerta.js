import React, { Component } from 'react';
import { message} from 'antd';

import { connect } from "react-redux";

class AlertMessage extends Component {
 
  render() {

  	const {showSuccessMsg,showErrorMsg,onShowSuccessMsg,onShowErrorMsg,textMessage} = this.props;

  	function ShowMessage() {
        
        if (showSuccessMsg) {
            message.config({
            });
            message.success(textMessage, 10); 
            onShowSuccessMsg(); 
        }

        else if(showErrorMsg){
            message.config({
            });
            message.error(textMessage, 10);
            onShowErrorMsg();
        }

        return (
            <div>
            </div>
        );
    }
    
    return (
        <div>
            <ShowMessage/>	
        </div>
    );
  }
}
const mapStateToProps = state => {

	return { 
	  	showSuccessMsg:state.AdministradorReducer.showSuccessMsg,
	  	showErrorMsg:state.AdministradorReducer.showErrorMsg, 
	  	textMessage:state.AdministradorReducer.textMessage, 	
	};
};

const mapDispatchToProps = dispatch => {
  return {
    onShowSuccessMsg: () => {
        dispatch({ type: "SHOW_SUCCESS_MSG" , showSuccessMsg:false, textMessage:null});
    },

    onShowErrorMsg: () => {
     	dispatch({ type: "SHOW_ERROR_MSG" , showErrorMsg:false, textMessage:null});
    },

  };
};

export default connect(mapStateToProps,mapDispatchToProps) (AlertMessage);
