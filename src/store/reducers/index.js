//Archivo que junta todos los reducers de la aplicacion
import { combineReducers } from "redux";

import LoginReducer from "./LoginReducer";
import DashboardReducer from "./DashboardReducer";
import AdministradorReducer from './AdministradorReducer'

export default combineReducers({
  LoginReducer, DashboardReducer, AdministradorReducer
});