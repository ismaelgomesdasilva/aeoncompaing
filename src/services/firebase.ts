// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA7K1ZITcFg_KrOdooitoFDhqN3odrctnQ',
  authDomain: 'aeon-campaign.firebaseapp.com',
  projectId: 'aeon-campaign',
  storageBucket: 'aeon-campaign.appspot.com',
  messagingSenderId: '920167090016',
  appId: '1:920167090016:web:551ba46686439dd1ba4005',
}

initializeApp(firebaseConfig)

export const db = getFirestore()
