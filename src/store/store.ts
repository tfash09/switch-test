import { configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import authReducer from "./features/auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { decrypt, encrypt } from "@/lib/encryption";

const PERSIST_KEY = "reduxState";
// Load persisted state from localStorage and decrypt
function loadState() {
  try {
    const serializedState = localStorage.getItem(PERSIST_KEY);
    if (!serializedState) return undefined;
    const decrypted = decrypt(serializedState);
    if (!decrypted) return undefined;
    return JSON.parse(decrypted);
  } catch {
    return undefined;
  }
}

// Save state to localStorage with encryption as instructed in the case study
function saveState(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    const encrypted = encrypt(serializedState);
    localStorage.setItem(PERSIST_KEY, encrypted);
  } catch {
    // Ignore write errors
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Subscribe to store changes and persist encrypted state
store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
