// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env.REACT_APP_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'babbo-motel.firebaseapp.com',
  databaseURL:
		'https://babbo-motel-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'babbo-motel',
  storageBucket: 'babbo-motel.appspot.com',
  messagingSenderId: '955270239528',
  appId: '1:955270239528:web:43e3efb102bb59fcfbac1d',
  measurementId: 'G-SCZC6NBRYD'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app
// const analytics = getAnalytics(app);
