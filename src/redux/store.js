import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage for web)
import cartReducer from "./cart/cartSlice";

const persistConfig = {
  key: "cart", 
  storage,
};


const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Configure the store
const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
});

export const persistor = persistStore(store);
export default store;
