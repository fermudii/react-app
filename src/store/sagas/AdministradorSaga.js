import { takeLatest, call, put } from 'redux-saga/effects'
import * as administradorActions from '../actions/AdministradorActions'
import moment from 'moment';
import {
    obtenerTiposElementosCall,
    obtenerElementosActivosCall,
    crearElementoCall,
    editarElementoCall,
    eliminarElementoCall,
    crearNotaCALL,
    getNotasCALL,
    deleteNotaCALL,
    editarNotaCALL,
    crearCategoriaCALL,
    editarCategoriaCALL,
    getCategoriasCALL,
    getNotasCategoriaCALL,
    getNotaEspecificaCALL,
    deleteCategoriaCALL,
    getBusquedaCALL
} from '../../services/AdministradorServices'

function* getTiposElementos(action) {
    try {
        console.log("SOLICITANDO TIPOS")
        console.log(action);
        const token = sessionStorage.getItem('token');
        const response = yield call(obtenerTiposElementosCall, token);
        console.log(response);
        if (response.status === 200) {
            console.log("EXITOSO")
            const listTiposElementos = response.data;
            yield put({ type: administradorActions.OBTENER_TIPOS_ELEMENTOS_SUCCESS, listTiposElementos });
        }
        else {
            //Falló la llamada al WS
            yield put({ type: administradorActions.OBTENER_TIPOS_ELEMENTOS_FAILURE });
        }

    } catch (error) {
        console.log(error);
        // dispatch a failure action to the store with the error
        yield put({ type: administradorActions.OBTENER_TIPOS_ELEMENTOS_FAILURE });
    }
}
export function* getTiposElementosSaga() {
    yield takeLatest(administradorActions.OBTENER_TIPOS_ELEMENTOS_REQUEST, getTiposElementos);
}


function* getElementos(action) {
    try {
        console.log(action);
        const token = sessionStorage.getItem('token');
        const response = yield call(obtenerElementosActivosCall, token);
        console.log(response);
        if (response.status === 200) {
            const listElementos = response.data;
            yield put({ type: administradorActions.OBTENER_ELEMENTOS_SUCCESS, listElementos });
        }
        else {
            //Falló la llamada al WS
            yield put({ type: administradorActions.OBTENER_ELEMENTOS_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.OBTENER_ELEMENTOS_FAILURE });
    }
}
export function* getElementosSaga() {
    yield takeLatest(administradorActions.OBTENER_ELEMENTOS_REQUEST, getElementos);
}

function* crearElemento(action) {
    try {
        console.log(action);
        const token = sessionStorage.getItem('token');
        let textComp = '';
        let imagenComp = '';
        let fondo = '';
        if (action.formulario.fondo) {
            fondo = action.formulario.fondo
        }
        if (action.fileList[0]) {
            let thumbUrl = action.fileList[0].dataURL;
            let img64 = thumbUrl.split(",");
            imagenComp = img64[1];
        }
        if (parseInt(action.formulario.idTipoElemento) === 1) {
            textComp = action.htmlEditor;
        }
        else if (parseInt(action.formulario.idTipoElemento) !== 4) {
            textComp = action.formulario.textComp;
        }
        const data = [{
            "idElementoBase": null,
            "icono": action.formulario.icono,
            "titulo": action.formulario.titulo,
            "descripcion": action.formulario.descripcion,
            "fondo": fondo,
            "imagenComp": imagenComp,
            "textComp": textComp,
            "desComp": action.formulario.desComp,
            "idTipoElemento": parseInt(action.formulario.idTipoElemento),
            "orden": action.formulario.orden,
            "visible": true,
            "idUsuarioActualizo": null,
            "fechaActualizo": null,
            "idAccion": null
        }];
        console.log(data);
        const response = yield call(crearElementoCall, token, data);
        console.log(response);
        if (response.status === 200) {
            const showSuccessMsg = true;
            const textMessage = "El elemento se guardó de forma correcta";
            const showModalNuevoElemeto = false;

            yield put({ type: administradorActions.SHOW_SUCCESS_MSG, showSuccessMsg, textMessage });
            yield put({ type: administradorActions.OPEN_NUEVO_ELEMENTO_MODAL, showModalNuevoElemeto });
            yield put({ type: administradorActions.OBTENER_ELEMENTOS_REQUEST });

            yield put({ type: administradorActions.CREAR_ELEMENTO_SUCCESS });
        }
        else {
            //Falló la llamada al WS
            yield put({ type: administradorActions.CREAR_ELEMENTO_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.CREAR_ELEMENTO_FAILURE });
    }
}
export function* crearElementoSaga() {
    yield takeLatest(administradorActions.CREAR_ELEMENTO_REQUEST, crearElemento);
}

function* editarElemento(action) {
    try {
        console.log(action);
        const token = sessionStorage.getItem('token');
        let textComp = '';
        let imagenComp = '';
        let fondo = '';
        if (action.formulario.fondo) {
            fondo = action.formulario.fondo;
        }
        if (action.fileList) {
            let thumbUrl = action.fileList[0].dataURL;
            let img64 = thumbUrl.split(",");
            imagenComp = img64[1];
        }
        if (parseInt(action.formulario.idTipoElemento) === 1) {
            textComp = action.htmlEditor;
        }
        else if (parseInt(action.formulario.idTipoElemento) !== 4) {
            textComp = action.formulario.textComp;
        }
        const idElemento = action.idElemento
        const data = {
            "idElementoBase": idElemento,
            "icono": action.formulario.icono,
            "titulo": action.formulario.titulo,
            "descripcion": action.formulario.descripcion,
            "fondo": fondo,
            "imagenComp": imagenComp,
            "textComp": textComp,
            "desComp": action.formulario.desComp,
            "idTipoElemento": parseInt(action.formulario.idTipoElemento),
            "orden": action.formulario.orden,
            "visible": true,
            "idUsuarioActualizo": null,
            "fechaActualizo": null,
            "idAccion": null
        };
        console.log(data);
        const response = yield call(editarElementoCall, token, data, idElemento);
        console.log(response);
        if (response.status === 200) {
            const showSuccessMsg = true;
            const textMessage = "El elemento se editó de forma correcta";
            const showModalEditarElemeto = false;
            const elementoSeleccionado = [];

            yield put({ type: administradorActions.SHOW_SUCCESS_MSG, showSuccessMsg, textMessage });
            yield put({ type: administradorActions.OPEN_EDITAR_ELEMENTO_MODAL, showModalEditarElemeto });
            yield put({ type: administradorActions.OBTENER_ELEMENTOS_REQUEST });
            yield put({ type: administradorActions.ELEMENTO_DETALLE, elementoSeleccionado });

            yield put({ type: administradorActions.EDITAR_ELEMENTO_SUCCESS });
        }
        else {
            //Falló la llamada al WS
            yield put({ type: administradorActions.EDITAR_ELEMENTO_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.EDITAR_ELEMENTO_FAILURE });
    }
}
export function* editarElementoSaga() {
    yield takeLatest(administradorActions.EDITAR_ELEMENTO_REQUEST, editarElemento);
}

function* borrarElemento(action) {
    try {
        console.log(action);
        const token = sessionStorage.getItem('token');
        const idElementoBase = action.idElementoBase
        const response = yield call(eliminarElementoCall, token, idElementoBase);
        console.log(response);
        if (response.status === 200) {
            const showSuccessMsg = true;
            const textMessage = "El elemento se eliminó de forma correcta";
            const elementoSeleccionado = [];

            yield put({ type: administradorActions.SHOW_SUCCESS_MSG, showSuccessMsg, textMessage });
            yield put({ type: administradorActions.OBTENER_ELEMENTOS_REQUEST });
            yield put({ type: administradorActions.ELEMENTO_DETALLE, elementoSeleccionado });

            yield put({ type: administradorActions.BORRAR_ELEMENTO_SUCCESS });
        }
        else {
            //Falló la llamada al WS
            yield put({ type: administradorActions.BORRAR_ELEMENTO_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.BORRAR_ELEMENTO_FAILURE });
    }
}
export function* borrarElementoSaga() {
    yield takeLatest(administradorActions.BORRAR_ELEMENTO_REQUEST, borrarElemento);
}


function* crearNota(action) {
    try {
        console.log("action de crear nota",action);
        const token = sessionStorage.getItem('token');
        let video = action.formulario.urlVideo;

        let imagenComp = '';

        if (action.fileList) {
            let thumbUrl = action.fileList[0].dataURL;
            let img64 = thumbUrl.split(",");
            imagenComp = img64[1];
        }
        
        if(action.formulario.urlVideo === undefined){
            video = '';
        }

        const data = {
            //'idNota': null,
            'idCategoria': parseInt(action.formulario.categoria),
            'titulo': action.formulario.titulo,
            'imagen': imagenComp,
            'enlace': "",
            'descripcion': action.formulario.descripcion,
            'texto': action.htmlEditor,
            'activo': true,
            'video': video,
            "palabrasClaveByIdNota": [{"palabra":action.formulario.palabraClave1},{"palabra":action.formulario.palabraClave2}]
        }
        console.log('Data para mandar', data);
        console.log(data);
        const response = yield call(crearNotaCALL, token, data);
        console.log("response de crear nota",response);

        if (response.status === 200) {
            const showSuccessMsg = true;
            const textMessage = "La nota " + action.formulario.titulo + " se creó correctamente";
            console.log("no esta la alarma pero aquí está lo que debe de decir", textMessage)
            yield put({ type: administradorActions.SHOW_SUCCESS_MSG, showSuccessMsg, textMessage });
            yield put({ type: administradorActions.CREAR_NOTA_SUCCESS });
            yield put({ type: administradorActions.GET_NOTAS_REQUEST });
        }

        else {
            const showErrorMsg = true;
            const textMessage = response.message;
            console.log("no esta la alarma pero aquí está lo que debe de decir", textMessage)
            yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
            yield put({ type: administradorActions.CREAR_NOTA_FAILURE });
        }

    } catch (error) {
        const showErrorMsg = true;
        const textMessage = error;
        console.log("no esta la alarma pero aquí está lo que debe de decir", textMessage)

        yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
        yield put({ type: administradorActions.CREAR_NOTA_FAILURE });
    }
}
export function* crearNotaSaga() {
    yield takeLatest(administradorActions.CREAR_NOTA_REQUEST, crearNota);
}

function* getNotas(action) {
    try {
        let page = 0;
        if (action.page)
            page = action.page - 1;

        console.log("page", page)

        const response = yield call(getNotasCALL, page);
       
        console.log('response de lista notas', response)
        if (response.status === 200) {
            var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            console.log("date",date)

            let fecha1 = moment(date);
            let diasDiferencia = [];
            let añosDiferencia = [];
            let mesDiferencia =  [];
            let listaFechas = [];
            let listaDiasDiferencia = [];
            let listaMesDiferencia = [];
            let listaAñosDiferencia = [];
            let listaUrl = [];

            let listaNotas = response.data.notas;
            const totalNotas = response.data.cantidad;
            
            for(let i=0; i<listaNotas.length; i++){
                let tituloUrl = listaNotas[i].titulo;
                tituloUrl = tituloUrl.split(' ').join('-');
            tituloUrl= tituloUrl.toLowerCase();

            function slugify (tituloUrl) {
                var map = {
                    '-' : ' ',
                    '-' : '_',
                    'a' : 'á|à|ã|â|À|Á|Ã|Â',
                    'e' : 'é|è|ê|É|È|Ê',
                    'i' : 'í|ì|î|Í|Ì|Î',
                    'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
                    'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
                    'c' : 'ç|Ç',
                    'n' : 'ñ|Ñ'
                };
                
                for (var pattern in map) {
                    tituloUrl = tituloUrl.replace(new RegExp(map[pattern], 'g'), pattern);
                };
            
                return tituloUrl;
            };

            slugify(tituloUrl);
            const cleanTitle = slugify(tituloUrl)
            
                listaUrl.push(cleanTitle)

                listaNotas[i].listaUrl = {
                    tituloURL: cleanTitle
                }
                listaFechas.push(moment(listaNotas[i].fechaPub.split('T')[0]))
                diasDiferencia.push(fecha1.diff(listaFechas[i], 'days'))
                listaDiasDiferencia.push(fecha1.diff(listaFechas[i], 'days'))
                    if(diasDiferencia[i]<31){
                        listaNotas[i].listaTiempo = {
                            tieneDias: true,
                        }
                        
                    }
                mesDiferencia.push(fecha1.diff(listaFechas[i], 'months'))
                listaMesDiferencia.push(fecha1.diff(listaFechas[i], 'months'))
                if(mesDiferencia[i]<12 && mesDiferencia[i]>0){
                    listaNotas[i].listaTiempo = {
                        tieneMeses: true,
                    }
                }
                añosDiferencia.push(fecha1.diff(listaFechas[i], 'years'))
                listaAñosDiferencia.push(fecha1.diff(listaFechas[i], 'years'))
                if(añosDiferencia[i]>0){
                    listaNotas[i].listaTiempo = {
                        tieneAños: true
                    }
                }
                listaNotas[i].listaDias = {
                    listaDiasDiferencia: listaDiasDiferencia,
                    listaMesDiferencia: listaMesDiferencia,
                    listaAñosDiferencia: listaAñosDiferencia
                     //Anexando data      
                  };
            }
            

            console.log("listaNotas",listaNotas)
            

            yield put({ type: administradorActions.GET_NOTAS_SUCCESS, listaNotas, totalNotas });
        }

        else {
            yield put({ type: administradorActions.GET_NOTAS_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.GET_NOTAS_FAILURE });
    }
}
export function* getNotasSaga() {
    yield takeLatest(administradorActions.GET_NOTAS_REQUEST, getNotas);
}

function* borrarNotas(action) {
    try {
        console.log(action);
        const token = sessionStorage.getItem('token');
        const idNota = action.idNota;
        const response = yield call(deleteNotaCALL, token, idNota);

        if (response.status === 200) {
            const showSuccessMsg = true;
            const textMessage = "La nota se eliminó correctamente";

            yield put({ type: administradorActions.SHOW_SUCCESS_MSG, showSuccessMsg, textMessage });
            yield put({ type: administradorActions.GET_NOTAS_REQUEST });
            yield put({ type: administradorActions.ELIMINAR_NOTA_SUCCESS });
        }
        else {
            const showErrorMsg = true;
            const textMessage = response.message;

            yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
            yield put({ type: administradorActions.ELIMINAR_NOTA_FAILURE });
        }

    } catch (error) {
        console.log(error);
        const showErrorMsg = true;
        const textMessage = error;

        yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
        yield put({ type: administradorActions.ELIMINAR_NOTA_FAILURE });
    }
}
export function* borrarNotasSaga() {
    yield takeLatest(administradorActions.ELIMINAR_NOTA_REQUEST, borrarNotas);
}

function* getInfoNota(action) {
    try {
        let notaInfo = action.notaInfo;
        yield put({ type: administradorActions.GET_INFO_NOTA_SUCCESS, notaInfo });
    } catch (error) {
        console.log(error);
    }
}
export function* getInfoNotaSaga() {
    yield takeLatest(administradorActions.GET_INFO_NOTA_REQUEST, getInfoNota);
}

function* editarNota(action) {
    try {
        console.log("action de editar notas",action);
        const token = sessionStorage.getItem('token');
        let imagen = '';
        let idNota = action.notaInfo.idNota;
        let notaInfo = action.notaInfo;
        let video = ''

        if(action.formulario.urlVideo){
            video = action.formulario.urlVideo
        }

        if(action.formulario.imagen){
            imagen = action.formulario.imagen;
        }

        if (action.fileList==undefined) {
            imagen = action.notaInfo.imagen;
        }
        else {
            let thumbUrl = action.fileList[0].dataURL;
            let img64 = thumbUrl.split(",");
            imagen = img64[1];
        }
        const data = {
            'idNota': idNota,
            'titulo': action.formulario.titulo,
            'imagen': imagen,
            'enlace': '',
            'descripcion': action.formulario.descripcion,
            'texto': action.htmlEditor,
            'fechaPub': null,
            'activo': true,
            'video': video,
            'idCategoria': parseInt(action.formulario.categoria),
            "palabrasClaveByIdNota": [
                {
                    "idPalabraClave": notaInfo.palabrasClaveByIdNota[0].idPalabraClave,
                    "palabra": action.formulario.palabraClave1,
                    "idNota": idNota,
                    "activo": true
                },
                {
                    "idPalabraClave": notaInfo.palabrasClaveByIdNota[1].idPalabraClave,
                    "palabra": action.formulario.palabraClave2,
                    "idNota": idNota,
                    "activo": true
                }
            ]
        }
        console.log('data', data);
        const response = yield call(editarNotaCALL, token, idNota, data);
        console.log("response de editar notas", response)

        if (response.status === 200) {
            const showSuccessMsg = true;
            const textMessage = "La nota " + action.formulario.titulo + " se modificó correctamente";
            const showEditarNotaModal = false;

            yield put({ type: administradorActions.SHOW_SUCCESS_MSG, showSuccessMsg, textMessage });
            yield put({ type: administradorActions.SHOW_EDITAR_NOTA_MODAL, showEditarNotaModal })
            yield put({ type: administradorActions.EDITAR_NOTA_SUCCESS });
            yield put({ type: administradorActions.GET_NOTAS_REQUEST });
        }

        else {
            const showErrorMsg = true;
            const textMessage = response.message;

            yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
            yield put({ type: administradorActions.EDITAR_NOTA_FAILURE });
        }

    } catch (error) {
        const showErrorMsg = true;
        const textMessage = error;

        yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
        yield put({ type: administradorActions.EDITAR_NOTA_FAILURE });
    }
}
export function* editarNotaSaga() {
    yield takeLatest(administradorActions.EDITAR_NOTA_REQUEST, editarNota);
}

function* crearCategoria(action) {
    try {
        const token = sessionStorage.getItem('token');
        const data = {
            'idCategoria': null,
            'descripcion': action.formulario.descripcion,
            'activo': true
        }
        console.log('Data para mandar', data)
        const response = yield call(crearCategoriaCALL, token, data);
        console.log("response de crear categoria", response)

        if (response.status === 200) {
            const showSuccessMsg = true;
            const textMessage = "La categoría se creó correctamente";
            const showNuevaCategoriaModal = false;

            yield put({ type: administradorActions.SHOW_SUCCESS_MSG, showSuccessMsg, textMessage });
            yield put({ type: administradorActions.SHOW_NUEVA_CATEGORIA_MODAL, showNuevaCategoriaModal })
            yield put({ type: administradorActions.CREAR_CATEGORIA_SUCCESS });
            yield put({ type: administradorActions.GET_CATEGORIAS_REQUEST });
        }

        else {
            const showErrorMsg = true;
            const textMessage = response.message;

            yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
            yield put({ type: administradorActions.CREAR_CATEGORIA_FAILURE });
        }

    } catch (error) {
        const showErrorMsg = true;
        const textMessage = error;

        yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
        yield put({ type: administradorActions.CREAR_CATEGORIA_FAILURE });
    }
}
export function* crearCategoriaSaga() {
    yield takeLatest(administradorActions.CREAR_CATEGORIA_REQUEST, crearCategoria);
}

//********************** EDITAR CATEGORIA *****************************
function* editarCategoria(action) {
    try {
        console.log(action);
        const token = sessionStorage.getItem('token');
        const idCategoria = parseInt(action.infoCategoria.idCategoria);

        const data = {
            'descripcion': action.formulario.descripcion
        }
        console.log('data para edición categoría');
        console.log(data);
        const response = yield call(editarCategoriaCALL, token, data, idCategoria);
        console.log(response);

        if (response.status === 200) {
            const showSuccessMsg = true;
            const textMessage = "La categoría se modificó correctamente";
            const showEditarCategoriaModal = false;
            const infoCategoria = [];

            yield put({ type: administradorActions.SHOW_SUCCESS_MSG, showSuccessMsg, textMessage });
            yield put({ type: administradorActions.SHOW_EDITAR_CATEGORIA_MODAL, showEditarCategoriaModal, infoCategoria })
            yield put({ type: administradorActions.EDITAR_CATEGORIA_SUCCESS });
            yield put({ type: administradorActions.GET_CATEGORIAS_REQUEST });
        }

        else {
            const showErrorMsg = true;
            const textMessage = response.message;

            yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
            yield put({ type: administradorActions.EDITAR_CATEGORIA_FAILURE });
        }

    } catch (error) {
        const showErrorMsg = true;
        const textMessage = error;

        yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
        yield put({ type: administradorActions.EDITAR_CATEGORIA_FAILURE });
    }
}
export function* editarCategoriaSaga() {
    yield takeLatest(administradorActions.EDITAR_CATEGORIA_REQUEST, editarCategoria);
}

//********************** OBTENER CATEGORIAS *****************************
function* getCategoria() {
    try {
        const response = yield call(getCategoriasCALL);
        console.log(response);
        const categorias = response.data;

        if (response.status === 200) {
            yield put({ type: administradorActions.GET_CATEGORIAS_SUCCESS, categorias });
        }

        else {
            yield put({ type: administradorActions.GET_CATEGORIAS_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.GET_CATEGORIAS_FAILURE });
    }
}
export function* getCategoriaSaga() {
    yield takeLatest(administradorActions.GET_CATEGORIAS_REQUEST, getCategoria);
}


function* getNotasCategoria(action) {
    try {
        console.log("action de categorias notas", action)
        let page = 0;
        let idCategoria = action.categoria;
        if (action.page)
            page = action.page - 1;

        const response = yield call(getNotasCategoriaCALL, idCategoria, page);
       
        console.log('response de lista por categorías notas', response)

        if (response.status === 200) {
            var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            console.log("date",date)

            let fecha1 = moment(date);
            let diasDiferencia = [];
            let añosDiferencia = [];
            let mesDiferencia =  [];
            let listaFechas = [];
            let listaDiasDiferencia = [];
            let listaMesDiferencia = [];
            let listaAñosDiferencia = [];
            let listaUrl = [];

            let listaCategoriaNotas = response.data.notas;
            const totalCategoriaNotas = response.data.cantidad;
            const categoria = response.data.notas[0].categoriaByIdCategoria.idCategoria;
            
            for(let i=0; i<listaCategoriaNotas.length; i++){
                let tituloUrl = listaCategoriaNotas[i].titulo;
                tituloUrl = tituloUrl.split(' ').join('-');
            tituloUrl= tituloUrl.toLowerCase();

            function slugify (tituloUrl) {
                var map = {
                    '-' : ' ',
                    '-' : '_',
                    'a' : 'á|à|ã|â|À|Á|Ã|Â',
                    'e' : 'é|è|ê|É|È|Ê',
                    'i' : 'í|ì|î|Í|Ì|Î',
                    'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
                    'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
                    'c' : 'ç|Ç',
                    'n' : 'ñ|Ñ'
                };
                
                for (var pattern in map) {
                    tituloUrl = tituloUrl.replace(new RegExp(map[pattern], 'g'), pattern);
                };
            
                return tituloUrl;
            };

            slugify(tituloUrl);
            const cleanTitle = slugify(tituloUrl)
            
                listaUrl.push(cleanTitle)

                listaCategoriaNotas[i].listaUrl = {
                    tituloURL: cleanTitle
                }
                listaFechas.push(moment(listaCategoriaNotas[i].fechaPub.split('T')[0]))
                diasDiferencia.push(fecha1.diff(listaFechas[i], 'days'))
                listaDiasDiferencia.push(fecha1.diff(listaFechas[i], 'days'))
                    if(diasDiferencia[i]<31){
                        listaCategoriaNotas[i].listaTiempo = {
                            tieneDias: true,
                        }
                        
                    }
                mesDiferencia.push(fecha1.diff(listaFechas[i], 'months'))
                listaMesDiferencia.push(fecha1.diff(listaFechas[i], 'months'))
                if(mesDiferencia[i]<12 && mesDiferencia[i]>0){
                    listaCategoriaNotas[i].listaTiempo = {
                        tieneMeses: true,
                    }
                }
                añosDiferencia.push(fecha1.diff(listaFechas[i], 'years'))
                listaAñosDiferencia.push(fecha1.diff(listaFechas[i], 'years'))
                if(añosDiferencia[i]>0){
                    listaCategoriaNotas[i].listaTiempo = {
                        tieneAños: true
                    }
                }
                listaCategoriaNotas[i].listaDias = {
                    listaDiasDiferencia: listaDiasDiferencia,
                    listaMesDiferencia: listaMesDiferencia,
                    listaAñosDiferencia: listaAñosDiferencia
                     //Anexando data      
                  };
            }
            
            console.log("listaCategoriaNotas",listaCategoriaNotas)
            

            yield put({ type: administradorActions.GET_NOTAS_CATEGORIA_SUCCESS, listaCategoriaNotas, totalCategoriaNotas, categoria });
        }

        else {
            yield put({ type: administradorActions.GET_NOTAS_CATEGORIA_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.GET_NOTAS_CATEGORIA_FAILURE });
    }
}
export function* getNotasCategoriaSaga() {
    yield takeLatest(administradorActions.GET_NOTAS_CATEGORIA_REQUEST, getNotasCategoria);
}

function* getNotaEspecifica(action) {
    try {
        console.log("action de categorias notas", action)
        let idNota = action.idNota;
        let pagePalabraClave = 0;
        let pageCategoria = 0;

        const response = yield call(getNotaEspecificaCALL, idNota, pagePalabraClave, pageCategoria);
       
        console.log('response de nota específica', response)

        if (response.status === 200) {
            let notaInfo = response.data.nota;
            let tituloUrl = notaInfo.titulo;
            console.log("notaInfo.titulo", notaInfo.titulo)
            tituloUrl = tituloUrl.split(' ').join('-');
            tituloUrl= tituloUrl.toLowerCase();

            let listaUrl = [];

            function slugify (tituloUrl) {
                var map = {
                    '-' : ' ',
                    '-' : '_',
                    'a' : 'á|à|ã|â|À|Á|Ã|Â',
                    'e' : 'é|è|ê|É|È|Ê',
                    'i' : 'í|ì|î|Í|Ì|Î',
                    'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
                    'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
                    'c' : 'ç|Ç',
                    'n' : 'ñ|Ñ'
                };
                
                for (var pattern in map) {
                    tituloUrl = tituloUrl.replace(new RegExp(map[pattern], 'g'), pattern);
                };
                console.log("tituloUrl",tituloUrl)
            
                return tituloUrl;
            };

            slugify(tituloUrl);
            const cleanTitle = slugify(tituloUrl)
            console.log("cleanTitle",cleanTitle)

            const notasRelacionadaPalabraClave = response.data.notasRelacionadasByPalabraClave;
            
            for(let i=0; i<notasRelacionadaPalabraClave.length; i++){
                let tituloUrl = notasRelacionadaPalabraClave[i].titulo;
                tituloUrl = tituloUrl.split(' ').join('-');
            tituloUrl= tituloUrl.toLowerCase();

            function slugify (tituloUrl) {
                var map = {
                    '-' : ' ',
                    '-' : '_',
                    'a' : 'á|à|ã|â|À|Á|Ã|Â',
                    'e' : 'é|è|ê|É|È|Ê',
                    'i' : 'í|ì|î|Í|Ì|Î',
                    'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
                    'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
                    'c' : 'ç|Ç',
                    'n' : 'ñ|Ñ'
                };
                
                for (var pattern in map) {
                    tituloUrl = tituloUrl.replace(new RegExp(map[pattern], 'g'), pattern);
                };
            
                return tituloUrl;
            };

            slugify(tituloUrl);
            const cleanTitle = slugify(tituloUrl)
            
                listaUrl.push(cleanTitle)
                notasRelacionadaPalabraClave[i].listaUrl = {
                    tituloURL: cleanTitle
                }
            }

            const notasRelacionadaCategoria = response.data.notasRelacionadasByCategoria;

            for(let i=0; i<notasRelacionadaCategoria.length; i++){
                let tituloUrl = notasRelacionadaCategoria[i].titulo;
                tituloUrl = tituloUrl.split(' ').join('-');
            tituloUrl= tituloUrl.toLowerCase();

            function slugify (tituloUrl) {
                var map = {
                    '-' : ' ',
                    '-' : '_',
                    'a' : 'á|à|ã|â|À|Á|Ã|Â',
                    'e' : 'é|è|ê|É|È|Ê',
                    'i' : 'í|ì|î|Í|Ì|Î',
                    'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
                    'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
                    'c' : 'ç|Ç',
                    'n' : 'ñ|Ñ'
                };
                
                for (var pattern in map) {
                    tituloUrl = tituloUrl.replace(new RegExp(map[pattern], 'g'), pattern);
                };
            
                return tituloUrl;
            };

            slugify(tituloUrl);
            const cleanTitle = slugify(tituloUrl)
            
                listaUrl.push(cleanTitle)
                notasRelacionadaCategoria[i].listaUrl = {
                    tituloURL: cleanTitle
                }
            }
            const totalNotasPalabras = response.data.cantidadNotasByPalabraClave;
            const totalNotasCategoria = response.data.cantidadNotasByCategoria;
           
            yield put({ type: administradorActions.GET_NOTA_ESPECIFICA_SUCCESS, notaInfo, notasRelacionadaPalabraClave, notasRelacionadaCategoria, totalNotasPalabras, totalNotasCategoria, cleanTitle });
        }

        else {
            yield put({ type: administradorActions.GET_NOTA_ESPECIFICA_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.GET_NOTA_ESPECIFICA_FAILURE });
    }
}
export function* getNotaEspecificaSaga() {
    yield takeLatest(administradorActions.GET_NOTA_ESPECIFICA_REQUEST, getNotaEspecifica);
}

function* borrarCategoria(action) {
    try {
        console.log("action eliminar categoria",action);
        const token = sessionStorage.getItem('token');
        const idCategoria = action.categoria;
        const response = yield call(getNotasCategoriaCALL, idCategoria, 0);
        console.log("response de borrar categoria 1", response)

        if (response.status === 200) {
            let listaCategoriaNotas = response.data.notas;
                if(!listaCategoriaNotas[0]){
                const response2 = yield call(deleteCategoriaCALL, token, idCategoria);
                console.log("response2 de borrar categoria", response2)
                    if (response2.status === 200) {
                    const showSuccessMsg = true;
                    const textMessage = "La categoría se eliminó correctamente";

                    yield put({ type: administradorActions.SHOW_SUCCESS_MSG, showSuccessMsg, textMessage });
                    yield put({ type: administradorActions.GET_CATEGORIAS_REQUEST });
                    yield put({ type: administradorActions.ELIMINAR_CATEGORIA_SUCCESS });
                    }
                }
                else {
                    const showErrorMsg = true;
                    const textMessage = "La categoría que quieres eliminar aún tiene notas relacionadas.";
        
                    yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
                    yield put({ type: administradorActions.ELIMINAR_CATEGORIA_FAILURE });
                }
        }
        else {
            const showErrorMsg = true;
            const textMessage = response.message;

            yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
            yield put({ type: administradorActions.ELIMINAR_CATEGORIA_FAILURE });
        }

    } catch (error) {
        console.log(error);
        const showErrorMsg = true;
        const textMessage = error;

        yield put({ type: administradorActions.SHOW_ERROR_MSG, showErrorMsg, textMessage });
        yield put({ type: administradorActions.ELIMINAR_CATEGORIA_FAILURE });
    }
}
export function* borrarCategoriaSaga() {
    yield takeLatest(administradorActions.ELIMINAR_CATEGORIA_REQUEST, borrarCategoria);
}

function* getBusquedaNotas(action) {
    try {
        console.log("action busqueda", action)
        const page = action.page;
        const search = action.nota;

        const response = yield call(getBusquedaCALL, page, search);
       
        console.log('response de lista notas', response)
        if (response.status === 200) {
            var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            console.log("date",date)

            let fecha1 = moment(date);
            let diasDiferencia = [];
            let añosDiferencia = [];
            let mesDiferencia =  [];
            let listaFechas = [];
            let listaDiasDiferencia = [];
            let listaMesDiferencia = [];
            let listaAñosDiferencia = [];
            let listaUrl = [];

            let listaNotas = response.data.notas;
            const totalNotas = response.data.cantidad;
            
            for(let i=0; i<listaNotas.length; i++){
                let tituloUrl = listaNotas[i].titulo;
                tituloUrl = tituloUrl.split(' ').join('-');
            tituloUrl= tituloUrl.toLowerCase();

            function slugify (tituloUrl) {
                var map = {
                    '-' : ' ',
                    '-' : '_',
                    'a' : 'á|à|ã|â|À|Á|Ã|Â',
                    'e' : 'é|è|ê|É|È|Ê',
                    'i' : 'í|ì|î|Í|Ì|Î',
                    'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
                    'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
                    'c' : 'ç|Ç',
                    'n' : 'ñ|Ñ'
                };
                
                for (var pattern in map) {
                    tituloUrl = tituloUrl.replace(new RegExp(map[pattern], 'g'), pattern);
                };
            
                return tituloUrl;
            };

            slugify(tituloUrl);
            const cleanTitle = slugify(tituloUrl)
            
                listaUrl.push(cleanTitle)

                listaNotas[i].listaUrl = {
                    tituloURL: cleanTitle
                }
                listaFechas.push(moment(listaNotas[i].fechaPub.split('T')[0]))
                diasDiferencia.push(fecha1.diff(listaFechas[i], 'days'))
                listaDiasDiferencia.push(fecha1.diff(listaFechas[i], 'days'))
                    if(diasDiferencia[i]<31){
                        listaNotas[i].listaTiempo = {
                            tieneDias: true,
                        }
                        
                    }
                mesDiferencia.push(fecha1.diff(listaFechas[i], 'months'))
                listaMesDiferencia.push(fecha1.diff(listaFechas[i], 'months'))
                if(mesDiferencia[i]<12 && mesDiferencia[i]>0){
                    listaNotas[i].listaTiempo = {
                        tieneMeses: true,
                    }
                }
                añosDiferencia.push(fecha1.diff(listaFechas[i], 'years'))
                listaAñosDiferencia.push(fecha1.diff(listaFechas[i], 'years'))
                if(añosDiferencia[i]>0){
                    listaNotas[i].listaTiempo = {
                        tieneAños: true
                    }
                }
                listaNotas[i].listaDias = {
                    listaDiasDiferencia: listaDiasDiferencia,
                    listaMesDiferencia: listaMesDiferencia,
                    listaAñosDiferencia: listaAñosDiferencia
                     //Anexando data      
                  };
            }
            

            console.log("listaNotas",listaNotas)
            

            yield put({ type: administradorActions.BUSCAR_NOTA_SUCCESS, listaNotas, totalNotas });
        }

        else {
            yield put({ type: administradorActions.BUSCAR_NOTA_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.BUSCAR_NOTA_FAILURE });
    }
}
export function* getBusquedaNotasSaga() {
    yield takeLatest(administradorActions.BUSCAR_NOTA_REQUEST, getBusquedaNotas);
}

function* getBusquedaCategoria(action) {
    try {
        console.log("action de categorias notas", action)
        let page = 0;
        const search = action.nota;

        const response = yield call(getBusquedaCALL, page, search);
       
        console.log('response de lista por categorías notas', response)

        if (response.status === 200) {
            var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            console.log("date",date)

            let fecha1 = moment(date);
            let diasDiferencia = [];
            let añosDiferencia = [];
            let mesDiferencia =  [];
            let listaFechas = [];
            let listaDiasDiferencia = [];
            let listaMesDiferencia = [];
            let listaAñosDiferencia = [];
            let listaUrl = [];

            let listaCategoriaNotas = response.data.notas;
            const totalCategoriaNotas = response.data.cantidad;
            const categoria = response.data.notas[0].categoriaByIdCategoria.idCategoria;
            
            for(let i=0; i<listaCategoriaNotas.length; i++){
                let tituloUrl = listaCategoriaNotas[i].titulo;
                tituloUrl = tituloUrl.split(' ').join('-');
            tituloUrl= tituloUrl.toLowerCase();

            function slugify (tituloUrl) {
                var map = {
                    '-' : ' ',
                    '-' : '_',
                    'a' : 'á|à|ã|â|À|Á|Ã|Â',
                    'e' : 'é|è|ê|É|È|Ê',
                    'i' : 'í|ì|î|Í|Ì|Î',
                    'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
                    'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
                    'c' : 'ç|Ç',
                    'n' : 'ñ|Ñ'
                };
                
                for (var pattern in map) {
                    tituloUrl = tituloUrl.replace(new RegExp(map[pattern], 'g'), pattern);
                };
            
                return tituloUrl;
            };

            slugify(tituloUrl);
            const cleanTitle = slugify(tituloUrl)
            
                listaUrl.push(cleanTitle)

                listaCategoriaNotas[i].listaUrl = {
                    tituloURL: cleanTitle
                }
                listaFechas.push(moment(listaCategoriaNotas[i].fechaPub.split('T')[0]))
                diasDiferencia.push(fecha1.diff(listaFechas[i], 'days'))
                listaDiasDiferencia.push(fecha1.diff(listaFechas[i], 'days'))
                    if(diasDiferencia[i]<31){
                        listaCategoriaNotas[i].listaTiempo = {
                            tieneDias: true,
                        }
                        
                    }
                mesDiferencia.push(fecha1.diff(listaFechas[i], 'months'))
                listaMesDiferencia.push(fecha1.diff(listaFechas[i], 'months'))
                if(mesDiferencia[i]<12 && mesDiferencia[i]>0){
                    listaCategoriaNotas[i].listaTiempo = {
                        tieneMeses: true,
                    }
                }
                añosDiferencia.push(fecha1.diff(listaFechas[i], 'years'))
                listaAñosDiferencia.push(fecha1.diff(listaFechas[i], 'years'))
                if(añosDiferencia[i]>0){
                    listaCategoriaNotas[i].listaTiempo = {
                        tieneAños: true
                    }
                }
                listaCategoriaNotas[i].listaDias = {
                    listaDiasDiferencia: listaDiasDiferencia,
                    listaMesDiferencia: listaMesDiferencia,
                    listaAñosDiferencia: listaAñosDiferencia
                     //Anexando data      
                  };
            }
            
            console.log("listaCategoriaNotas",listaCategoriaNotas)
            

            yield put({ type: administradorActions.BUSCAR_NOTA_CATEGORIAS_SUCCESS, listaCategoriaNotas, totalCategoriaNotas});
        }

        else {
            yield put({ type: administradorActions.BUSCAR_NOTA_CATEGORIAS_FAILURE });
        }

    } catch (error) {
        console.log(error);
        yield put({ type: administradorActions.BUSCAR_NOTA_CATEGORIAS_FAILURE });
    }
}
export function* getBusquedaCategoriaSaga() {
    yield takeLatest(administradorActions.BUSCAR_NOTA_CATEGORIAS_REQUEST, getBusquedaCategoria);
}