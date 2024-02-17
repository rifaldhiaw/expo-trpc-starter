import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJnPeugmqdufHYlBHXm2wsREwYt57E3WE",
  authDomain: "ailinggo-dev.firebaseapp.com",
  projectId: "ailinggo-dev",
  storageBucket: "ailinggo-dev.appspot.com",
  messagingSenderId: "1072106305560",
  appId: "1:1072106305560:web:314382118cfcb80b862b6d",
  measurementId: "G-4YTJB555TV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence:
    Platform.OS === "web"
      ? undefined // default browser persistence
      : getReactNativePersistence(AsyncStorage),
});
