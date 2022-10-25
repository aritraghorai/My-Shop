import { configureStore } from "@reduxjs/toolkit";
import addToCardSlice from "./Reducers/addToCardSlice";
import alertReducer, { hideAlert, showAlert } from "./Reducers/alertReducer";
import fetchProductDetailSlice from "./Reducers/fetchParticularProduct";
import fetchProductsSlice from "./Reducers/fetchProduct";
import orderRducer from "./Reducers/orderSlice";
import getAllOrderByUserReducer from "./Reducers/userOrdersSlice";
import getAllUserReducer from "./Reducers/Admin/listAllUser";
import orderDetailReducer from "./Reducers/orderDetailSlice";
import { userAuthSlice } from "./Reducers/userAuthSlice";
import { loadState, saveState } from "./Storage/card_storage";
import UserDetailReducer from "./Reducers/Admin/UserDetailById";
const CARD_KEY = "cardItem";
const USER_KEY = "USER_KEY";

const store = configureStore({
  reducer: {
    productList: fetchProductsSlice.reducer,
    productDetail: fetchProductDetailSlice.reducer,
    card: addToCardSlice.reducer,
    loginDetail: userAuthSlice.reducer,
    alertState: alertReducer,
    order: orderRducer,
    orderDetail: orderDetailReducer,
    ordersByUser: getAllOrderByUserReducer,
    allUsers: getAllUserReducer,
    userDetail: UserDetailReducer,
  },
  preloadedState: {
    card: loadState(CARD_KEY),
    loginDetail: loadState(USER_KEY),
  },
});

store.subscribe(() => {
  saveState(JSON.stringify(store.getState().card), CARD_KEY);

  saveState(JSON.stringify(store.getState().loginDetail), USER_KEY);
});
export function showAlertFun(alertBody: {
  Type: string | undefined;
  Message: string;
}) {
  store.dispatch(showAlert(alertBody));
  setTimeout(() => {
    store.dispatch(hideAlert());
  }, 2000);
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
