//Archivo Saga que ejecuta las acciones del Login

import { takeLatest, call, put } from "redux-saga/effects";
import * as loginActions from '../actions/LoginAction';
import { loginCall,empleadosDetalleCall } from "../../services/LoginServices";


//********************** LOGIN *****************************
function* getLogin(action) {
    try {
        console.log(action);
        const response = yield call(loginCall,action.loginInfo);
        console.log(response);
        if(response.status==200){

            let token = response.headers.authorization; 
            //Con el token que nos responde el servicio se manda a llamar el WS para traer el detalle del usuario logeado
            let responseUserInfo = yield call(empleadosDetalleCall,token);
            console.log('response de responseUserInfo');
            console.log(responseUserInfo);

            if(responseUserInfo.status==200){
                if(responseUserInfo.data.perfiles.length>0){
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('isAuthenticated', true);
                    sessionStorage.setItem('perfilUsuario', responseUserInfo.data.perfiles[0].perfil);
                    sessionStorage.setItem('userInfo', JSON.stringify(responseUserInfo.data));
                    sessionStorage.setItem('perfiles', JSON.stringify(responseUserInfo.data.perfiles));
                    let selectedPerfil=responseUserInfo.data.perfiles[0].perfil;

                    yield put({ type: loginActions.CHANGE_SELECTED_PROFILE, selectedPerfil});

                    let usuario = responseUserInfo.data
                    yield put({ type: loginActions.LOGIN_API_CALL_SUCCESS,usuario,token});
                }
                //El usuario no tiene perfiles disponibles
                else{
                    yield put({ type: loginActions.LOGIN_API_CALL_FAILURE});
                    let selectedPerfil='';
                    yield put({ type: loginActions.CHANGE_SELECTED_PROFILE, selectedPerfil});
                }
            }
            //Falló la llamada al WS
            else{
                yield put({ type: loginActions.LOGIN_API_CALL_FAILURE});
            }
        }
        else{
            yield put({ type: loginActions.LOGIN_API_CALL_FAILURE});
        }
    
    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: loginActions.LOGIN_API_CALL_FAILURE, error });
    }
}
export function* getLoginSaga() {
    yield takeLatest(loginActions.LOGIN_API_CALL_REQUEST, getLogin);
}