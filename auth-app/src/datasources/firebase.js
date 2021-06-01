import firebase from 'firebase/app'

const oFirebase = firebase.initializeApp({
    apiKey: "AIzaSyC-7ApUgOsefKsjoWmlwFCxSI4P4BYW46U",
    authDomain: "motiveko-84a06.firebaseapp.com"
})

export const oFirebaseAuth = oFirebase.auth();