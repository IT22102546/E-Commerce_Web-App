
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import productsReducer from './product/productSlice';
import { productsApi } from './product/productApi';
import cartReducer, { getCartTotal } from './cart/cartSlice';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(productsApi.middleware),
});

store.dispatch(getCartTotal());

export const persistor = persistStore(store);
