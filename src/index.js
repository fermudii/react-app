import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Containers/App';
import './fonts/Montserrat-Bold.ttf'; 
import './fonts/Montserrat-ExtraBold.ttf'; 
import './fonts/Montserrat-Regular.ttf'; 
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux";

import store from "./store/store";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
document.getElementById('root'));
registerServiceWorker();