import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import session from 'redux-persist/lib/storage/session';
import userReducer from './userSlice'; // Presumed to handle auth state
import locationReducer from './locationSlice'; // Handles location state

// Config for persisting the 'auth' state using localStorage
const authPersistConfig = {
    key: 'user',
    storage, // Uses localStorage
};

// Config for persisting the root reducer using sessionStorage, excluding 'auth'
const rootPersistConfig = {
    key: 'root',
    storage: session, // Uses sessionStorage
    blacklist: ['auth'], // Exclude auth from root persistence
};

// Combine your reducers into a rootReducer
const rootReducer = combineReducers({
    user: persistReducer(authPersistConfig, userReducer), // Persist the auth state
    location: locationReducer, // No specific persistence, defaults to session
});

// Apply the root persist configuration
const persistRootReducer = persistReducer(rootPersistConfig, rootReducer);

// Create the store with the persisted reducer and middleware
const store = configureStore({
    reducer: persistRootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Persistor for rehydrating the store
export const persistor = persistStore(store);

// Types for use throughout your application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;