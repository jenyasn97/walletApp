import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCa_ZwuPVEwcb0pBlQWGSDWV816Qe9ZNKw',
  authDomain: 'myapp-wallet.firebaseapp.com',
  projectId: 'myapp-wallet',
  storageBucket: 'myapp-wallet.firebasestorage.app',
  messagingSenderId: '857399806531',
  appId: '1:857399806531:web:7636a868ea698884f462f6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
