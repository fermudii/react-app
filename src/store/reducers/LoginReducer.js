import * as loginActions from '../actions/LoginAction' 

const initialState = {
    fetchingLogin: false,
    tokenLogin: null,
    errorLogin: false,
    usuario: sessionStorage.getItem('userInfo'),
    isAuthenticated: false,
    selectedPerfil: sessionStorage.getItem('perfilUsuario'),
};

export default(state = initialState, action) => {
    switch (action.type) {

        case loginActions.LOGIN_API_CALL_REQUEST:
            return { ...state, fetchingLogin: true, errorLogin: false };
        case loginActions.LOGIN_API_CALL_SUCCESS:
            return { ...state, fetchingLogin: false, usuario: action.usuario,tokenLogin: action.token,isAuthenticated:true, errorLogin: false };
        case loginActions.LOGIN_API_CALL_FAILURE:
            return { ...state, fetchingLogin: false, listaPedidosProgramados: [], errorLogin: true};

        case loginActions.CHANGE_SELECTED_PROFILE:
            return { ...state, selectedPerfil:action.selectedPerfil};
        
        default:
            return state;
    }
};