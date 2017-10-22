import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { storeEnhancer } from 'redux-bug-reporter'

import rootReducer from  './reducers';

import './index.css';
import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';

const StoreInstance = (initialState) => {
    return createStore(
    	rootReducer,
		initialState,
		compose(process.env.NODE_ENV !== 'production' ? storeEnhancer : f => f,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
}

ReactDOM.render(
	<Provider store={StoreInstance()}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
