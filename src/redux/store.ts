import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import {actionLog} from "./middlewares/actionLog";
import {changeLanguage} from "./middlewares/changeLanguage";
import {productDetailSlice} from "./productDetail/slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { productSearchSlice } from "./productSearch/slice";
import {userSlice} from "./user/slice";
import {persistStore, persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import {shoppingCartSlice} from './shoppingCart/slice'
const persistConfig = {
    key: "root",
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart:shoppingCartSlice.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog, changeLanguage));
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog, changeLanguage],
    devTools: true,
});
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export default {store, persistor};