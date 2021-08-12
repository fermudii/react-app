import * as administradorActions from '../actions/AdministradorActions'

const initialState = {
    defaultCategoria: sessionStorage.getItem('defaultCategoria'),
    showSuccessMsg: false,
    showErrorMsg: false,
    textMessage: null,

    fetchingTiposElementos: false,
    listTiposElementos: [],

    fetchingElementos: false,
    listElementos: [],

    fetchingCrearElemento: false,
    fetchingEditarElemento: false,

    elementoSeleccionado: [],
    showModalNuevoElemeto: false,
    showModalEditarElemeto: false,
    fetchingBorrarElemento: false,

    fetchingCrearNota: false,
    fetchingGetNotas: false,
    listaNotas: [],
    totalNotas: null,

    showEditarNotaModal: false,
    fetchingInfoNotas: false,
    notaInfo: [],
    fetchingEditarNota: false,

    fetchingGetCategorias: false,
    categorias: [],

    showNuevaCategoriaModal: false,
    showEditarCategoriaModal: false,
    fetchingNuevaCategoria: false,
    fetchingEditarCategoria: false,
    infoCategoria: [],

    listaNotasCategoria: [],
    fetchingGetNotasCategoria: false,

    listaCategoriaNotas: [],
    totalCategoriaNotas: null,
    categoria: null,

    notaInfo:[],
    notasRelacionadaPalabraClave:[],
    notasRelacionadaCategoria:[],
    totalNotasPalabras:null,
    totalNotasCategoria:null,
    cleanTitle: '',
    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case administradorActions.SHOW_SUCCESS_MSG:
            return { ...state, showSuccessMsg: action.showSuccessMsg, typeMessage: "success", textMessage: action.textMessage };
        case administradorActions.SHOW_ERROR_MSG:
            return { ...state, showErrorMsg: action.showErrorMsg, typeMessage: "error", textMessage: action.textMessage };

        case administradorActions.OBTENER_TIPOS_ELEMENTOS_REQUEST:
            return { ...state, fetchingTiposElementos: true };
        case administradorActions.OBTENER_TIPOS_ELEMENTOS_SUCCESS:
            return { ...state, fetchingTiposElementos: false, listTiposElementos: action.listTiposElementos };
        case administradorActions.OBTENER_TIPOS_ELEMENTOS_FAILURE:
            return { ...state, fetchingTiposElementos: false };

        case administradorActions.OBTENER_ELEMENTOS_REQUEST:
            return { ...state, fetchingElementos: true };
        case administradorActions.OBTENER_ELEMENTOS_SUCCESS:
            return { ...state, fetchingElementos: false, listElementos: action.listElementos };
        case administradorActions.OBTENER_ELEMENTOS_FAILURE:
            return { ...state, fetchingElementos: false };

        case administradorActions.CREAR_ELEMENTO_REQUEST:
            return { ...state, fetchingCrearElemento: true };
        case administradorActions.CREAR_ELEMENTO_SUCCESS:
            return { ...state, fetchingCrearElemento: false };
        case administradorActions.CREAR_ELEMENTO_FAILURE:
            return { ...state, fetchingCrearElemento: false };

        case administradorActions.EDITAR_ELEMENTO_REQUEST:
            return { ...state, fetchingEditarElemento: true };
        case administradorActions.EDITAR_ELEMENTO_SUCCESS:
            return { ...state, fetchingEditarElemento: false };
        case administradorActions.EDITAR_ELEMENTO_FAILURE:
            return { ...state, fetchingEditarElemento: false };

        case administradorActions.ELEMENTO_DETALLE:
            return { ...state, elementoSeleccionado: action.elementoSeleccionado };
        case administradorActions.OPEN_NUEVO_ELEMENTO_MODAL:
            return { ...state, showModalNuevoElemeto: action.showModalNuevoElemeto };
        case administradorActions.OPEN_EDITAR_ELEMENTO_MODAL:
            return { ...state, showModalEditarElemeto: action.showModalEditarElemeto };

        case administradorActions.BORRAR_ELEMENTO_REQUEST:
            return { ...state, fetchingBorrarElemento: true };
        case administradorActions.BORRAR_ELEMENTO_REQUEST:
            return { ...state, fetchingBorrarElemento: false };
        case administradorActions.BORRAR_ELEMENTO_REQUEST:
            return { ...state, fetchingBorrarElemento: false };

        case administradorActions.CREAR_NOTA_REQUEST:
            return { ...state, fetchingCrearNota: true };
        case administradorActions.CREAR_NOTA_SUCCESS:
            return { ...state, fetchingCrearNota: false };
        case administradorActions.CREAR_NOTA_FAILURE:
            return { ...state, fetchingCrearNota: false };

        case administradorActions.GET_NOTAS_REQUEST:
            return { ...state, fetchingGetNotas: true };
        case administradorActions.GET_NOTAS_SUCCESS:
            return { ...state, fetchingGetNotas: false, listaNotas: action.listaNotas, totalNotas:action.totalNotas };
        case administradorActions.GET_NOTAS_FAILURE:
            return { ...state, fetchingGetNotas: false };

        case administradorActions.GET_NOTAS_CATEGORIA_REQUEST:
            return { ...state,  };
        case administradorActions.GET_NOTAS_CATEGORIA_SUCCESS:
            return { ...state, listaCategoriaNotas: action.listaCategoriaNotas, totalCategoriaNotas: action.totalCategoriaNotas, categoria: action.categoria };
        case administradorActions.GET_NOTAS_CATEGORIA_FAILURE:
            return { ...state,  };

        case administradorActions.GET_NOTA_ESPECIFICA_REQUEST:
            return { ...state,  };
        case administradorActions.GET_NOTA_ESPECIFICA_SUCCESS:
            return { ...state, notaInfo: action.notaInfo, notasRelacionadaPalabraClave: action.notasRelacionadaPalabraClave, notasRelacionadaCategoria: action.notasRelacionadaCategoria, totalNotasPalabras: action.totalNotasPalabras, totalNotasCategoria: action.totalNotasCategoria, cleanTitle: action.cleanTitle };
        case administradorActions.GET_NOTA_ESPECIFICA_FAILURE:
            return { ...state,  };

        case administradorActions.CHANGE_CATEGORIA:
            return { ...state, defaultCategoria: action.defaultCategoria};

        case administradorActions.ELIMINAR_NOTA_REQUEST:
            return { ...state, fetchingGetNotas: true };
        case administradorActions.ELIMINAR_NOTA_SUCCESS:
            return { ...state, fetchingGetNotas: false };
        case administradorActions.ELIMINAR_NOTA_FAILURE:
            return { ...state, fetchingGetNotas: false };

        case administradorActions.SHOW_EDITAR_NOTA_MODAL:
            return { ...state, showEditarNotaModal: action.showEditarNotaModal };
        case administradorActions.GET_INFO_NOTA_REQUEST:
            return { ...state, fetchingInfoNotas: true };
        case administradorActions.GET_INFO_NOTA_SUCCESS:
            return { ...state, fetchingInfoNotas: false, notaInfo: action.notaInfo };

        case administradorActions.EDITAR_NOTA_REQUEST:
            return { ...state, fetchingEditarNota: true };
        case administradorActions.EDITAR_NOTA_SUCCESS:
            return { ...state, fetchingEditarNota: false };
        case administradorActions.EDITAR_NOTA_FAILURE:
            return { ...state, fetchingEditarNota: false };

        case administradorActions.GET_CATEGORIAS_REQUEST:
            return { ...state, fetchingGetCategorias: true };
        case administradorActions.GET_CATEGORIAS_SUCCESS:
            return { ...state, fetchingGetCategorias: false, categorias: action.categorias };
        case administradorActions.GET_CATEGORIAS_FAILURE:
            return { ...state, fetchingGetCategorias: false };

        case administradorActions.SHOW_NUEVA_CATEGORIA_MODAL:
            return { ...state, showNuevaCategoriaModal: action.showNuevaCategoriaModal };
        case administradorActions.SHOW_EDITAR_CATEGORIA_MODAL:
            return { ...state, showEditarCategoriaModal: action.showEditarCategoriaModal, infoCategoria: action.infoCategoria };

        case administradorActions.CREAR_CATEGORIA_REQUEST:
            return { ...state, fetchingNuevaCategoria: true };
        case administradorActions.CREAR_CATEGORIA_SUCCESS:
            return { ...state, fetchingNuevaCategoria: false };
        case administradorActions.CREAR_CATEGORIA_FAILURE:
            return { ...state, fetchingNuevaCategoria: false };

        case administradorActions.EDITAR_CATEGORIA_REQUEST:
            return { ...state, fetchingEditarCategoria: true };
        case administradorActions.EDITAR_CATEGORIA_SUCCESS:
            return { ...state, fetchingEditarCategoria: false };
        case administradorActions.EDITAR_CATEGORIA_FAILURE:
            return { ...state, fetchingEditarCategoria: false };

        case administradorActions.ELIMINAR_CATEGORIA_REQUEST:
            return { ...state };
        case administradorActions.ELIMINAR_CATEGORIA_SUCCESS:
            return { ...state };
        case administradorActions.ELIMINAR_CATEGORIA_FAILURE:
            return { ...state };

        case administradorActions.BUSCAR_NOTA_REQUEST:
            return { ...state,};
        case administradorActions.BUSCAR_NOTA_SUCCESS:
            return { ...state, listaNotas: action.listaNotas, totalNotas:action.totalNotas };
        case administradorActions.BUSCAR_NOTA_FAILURE:
            return { ...state,};

        case administradorActions.BUSCAR_NOTA_CATEGORIAS_REQUEST:
            return { ...state,  };
        case administradorActions.BUSCAR_NOTA_CATEGORIAS_SUCCESS:
            return { ...state, listaCategoriaNotas: action.listaCategoriaNotas, totalCategoriaNotas: action.totalCategoriaNotas };
        case administradorActions.BUSCAR_NOTA_CATEGORIAS_FAILURE:
            return { ...state,  };

        default:
            return state;
    }

}