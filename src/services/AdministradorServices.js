import axios from 'axios'


const endpoint = "https://tejiendo-dev.herokuapp.com/";

/*ELEMENTOS*/
export function obtenerTiposElementosCall(token) {
	return axios({
	    method: "get",
        url: endpoint+"pagina/tipos/elementos",
        headers: {'Content-Type': 'application/json','Authorization':token}
	}).then(response => {
		return response;
	}).catch(error => {
		return error.response.data;
    });
}
export function obtenerElementosActivosCall(token) {
	return axios({
	    method: "get",
        url: endpoint+"pagina/elementos",
        headers: {'Content-Type': 'application/json','Authorization':token}
	}).then(response => {
		return response;
	}).catch(error => {
		return error.response.data;
    });
}
export function crearElementoCall(token, data) {
	return axios({
	    method: "post",
        url: endpoint+"pagina/elementos",
        headers: {'Content-Type': 'application/json','Authorization':token},
        data: data,
	}).then(response => {
		return response;
	}).catch(error => {
		return error.response.data;
    });
}
export function editarElementoCall(token, data, idElemento) {
	return axios({
	    method: "put",
        url: endpoint+"pagina/elementos/" + idElemento,
        headers: {'Content-Type': 'application/json','Authorization':token},
        data: data,
	}).then(response => {
		return response;
	}).catch(error => {
		return error.response.data;
    });
}
export function eliminarElementoCall(token, idElementoBase) {
	return axios({
	    method: "delete",
        url: endpoint+"pagina/elementos/" + idElementoBase,
        headers: {'Content-Type': 'application/json','Authorization':token},
	}).then(response => {
		return response;
	}).catch(error => {
		return error.response.data;
    });
}

// ******************* CRUD SERVICIOS - NOTAS ******************* //
export function crearNotaCALL(token, data){
    return axios({
	    method: "post",
	    url: endpoint+"notas",
		headers: {'Content-Type': 'application/json','Authorization':token},
		data: data,
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
}

/* export function getNotasCALL(token, page){
    return axios({
	    method: "get",
	    url: endpoint+"notas?page=" + page + "&offset=10",
		headers: {'Content-Type': 'application/json','Authorization':token},
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
} 
*/

export function getNotasCALL(page){
    return axios({
	    method: "get",
	    url: endpoint+"notas/web?idCategoria=&page=" + page + "&offset=10",
		headers: {'Content-Type': 'application/json'},
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
}

//GET NOTAS POR ID CATEGORIA
export function getNotasCategoriaCALL(idCategoria, page){
    return axios({
	    method: "get",
	    url: endpoint+"notas/web?idCategoria="+idCategoria+"&page=" + page + "&offset=10",
		headers: {'Content-Type': 'application/json'},
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
}

//GET NOTA ESPECIFICA
export function getNotaEspecificaCALL(idNota, pagePalabraClave, pageCategoria){
    return axios({
	    method: "get",
	    url: endpoint+"notas/simple?idNota="+idNota+"&pagePalabraClave=" + pagePalabraClave + "&offsetPalabraClave=10&pageCategoria="+pageCategoria+"&offsetCategoria=10",
		headers: {'Content-Type': 'application/json'},
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
}

export function deleteNotaCALL(token, idNota){
    return axios({
	    method: "delete",
	    url: endpoint+"notas/" + idNota,
		headers: {'Content-Type': 'application/json','Authorization':token},
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
}

export function editarNotaCALL(token, idNota, data){
    return axios({
	    method: "put",
	    url: endpoint+"notas/" + idNota,
		headers: {'Content-Type': 'application/json','Authorization':token},
		data: data,
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
}

// ********************** SERVICES PARA NOTAS POR CATEGORIA  ****************//
export function getCategoriasCALL() {
	return axios({
		method: "get",
		url: endpoint + "notas/categorias",
		headers: {'Content-Type': 'application/json'},
	}).then(response => {
		return response
	}).catch(error => {
		return error.response.data
	})
}

export function crearCategoriaCALL(token, data){
    return axios({
	    method: "post",
	    url: endpoint + "notas/categorias",
		headers: {'Content-Type': 'application/json', 'Authorization':token},
		data: data,
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
}

export function editarCategoriaCALL(token,  data, idCategoria){
    return axios({
	    method: "put",
	    url: endpoint + "notas/categorias/" + idCategoria,
		headers: {'Content-Type': 'application/json','Authorization':token},
		data: data,
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
}


export function deleteCategoriaCALL(token, idCategoria){
    return axios({
	    method: "delete",
	    url: endpoint+"notas/categorias/" + idCategoria,
		headers: {'Content-Type': 'application/json','Authorization':token},
	}).then(response => {
		return response;
    }).catch(error => {
        return error.response.data;
    });
}


export function getBusquedaCALL(page, search) {
	return axios({
		method: "get",
		url: endpoint + "notas/buscador?page="+page+"&offset=10&palabra="+search,
		headers: {'Content-Type': 'application/json'},
	}).then(response => {
		return response
	}).catch(error => {
		return error.response.data
	})
}

