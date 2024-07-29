import { initializeApp, signInWithEmailAndPassword  } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHO7rhIrfypj-x27HetVym-08K9YmE22U",
  authDomain: "bem-estar-3fb2c.firebaseapp.com",
  databaseURL: "https://bem-estar-3fb2c-default-rtdb.firebaseio.com",
  projectId: "bem-estar-3fb2c",
  storageBucket: "bem-estar-3fb2c.appspot.com",
  messagingSenderId: "123743475693",
  appId: "1:123743475693:web:36043abf2701a929eff9e4",
  measurementId: "G-NFR3GLN5R7"
};



// Inicialize o app Firebase
const app = initializeApp(firebaseConfig);


// Inicialize o Firebase Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, app };


// ID de cliente OAuth 2.0 115633635008464638497




