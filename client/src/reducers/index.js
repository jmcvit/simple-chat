import { combineReducers } from 'redux';
import reducerMessages from './reducerMessages';

const reducers = combineReducers({
    messages: reducerMessages
});

export default reducers;
