import { combineReducers } from "redux"
// import { cartReducer as cart } from "./cartReducer"
import { userReducer as user } from "./userReducer"
// import { shopReducer as shop } from "./shopReducer"
import { filmReducer as film } from "./filmReducer"
import { categoryReducer as category } from "./categoryReducer"

const rootReducer = combineReducers({

  user,
  film,
  category,
})

export default rootReducer
