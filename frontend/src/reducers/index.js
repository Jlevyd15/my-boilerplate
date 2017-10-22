// import individual reducers here
import fieldReducer from './fieldReducer';
import formReducer from './formReducer';
import transientsReducer from './transientsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	fields: fieldReducer,
	forms: formReducer,
	transients: transientsReducer
});
export default rootReducer;