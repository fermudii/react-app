import axios from "axios";

const endpoint = "https://tejiendo-dev.herokuapp.com/";

export function loginCall(loginInfo) {
	return axios({
	    method: "post",
	    url: endpoint+"login", 
	    data: {
		    username: loginInfo.userName,
		    password: loginInfo.password
		}
	}).then(response => {
		return response;
	}).catch(error => {
		return error.response.data;
	});
}


export function empleadosDetalleCall(token) {
	return axios({
	    method: "get",
	    url: endpoint+"empleados/detalles",
	    headers: {'Content-Type': 'application/json','Authorization':token}
	}).then(response => {
		return response;
	}).catch(error => {
		return error.response.data;
	});
}
