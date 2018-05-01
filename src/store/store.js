import { combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  form: formReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(),
);

export default store;
