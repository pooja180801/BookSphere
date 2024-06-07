import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./Authorization/Reducer"
import { productReducer } from "./product/Reducer";
import { cartReducer } from "./cart/Reducer";
import { orderReducer } from "./order/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  products:productReducer,
  cart:cartReducer,
  order:orderReducer
});

const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

export default store;
