//Archivo que une todos los archivos Saga
import { all, fork } from "redux-saga/effects";

import * as LoginSaga from "./LoginSaga";
import * as DashboardSaga from "./DashboardSaga";
import * as AdministradorSaga from "./AdministradorSaga";


export default function* rootSaga() {

  var allSagas = Object.assign(LoginSaga, DashboardSaga, AdministradorSaga);

  yield all(
    [...Object.values(allSagas)].map(fork)
  );
}