import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCC11zk_MMrqXm53doVBn7ZlJJ3tCijTEc',
  authDomain: 'fivedm-africa.firebaseapp.com',
  projectId: 'fivedm-africa',
  storageBucket: 'fivedm-africa.firebasestorage.app',
  messagingSenderId: '31367265991',
  appId: '1:31367265991:web:9e561033ecdcccb57e88e2',
  measurementId: 'G-1MS6MGVPCY',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
