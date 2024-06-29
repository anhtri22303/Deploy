import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import {thunk} from 'redux-thunk'; // Chú ý: không cần đặt dấu {}
import areaReducer from "./Area/Reducer";
import cartReducer from "./Cart/Reducer";
import areaOrderReducer from "./Area Order/Reducer";
import componentReducer from "./Components/Reducer";
import menuItemReducer from "./Menu/Reducer";
import { orderReducer } from "./Order/Reducer";
import categoryReducer from "./Categories/Reducer";
import customerReducer from "./Customer/Reducer";
import goldPriceReducer from "./Gold Price/Reducer";
import valuationReducer from "./Valuation/Reducer";

const rootReducer = combineReducers({
  auth : authReducer,
  menu : menuItemReducer,
  area : areaReducer,
  cart: cartReducer,
  order: orderReducer,
  areaOrder : areaOrderReducer,
  component : componentReducer,
  category : categoryReducer,
  customer : customerReducer,
  gold_price : goldPriceReducer,
  valuation : valuationReducer

  
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
