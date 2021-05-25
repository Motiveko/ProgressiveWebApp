import firebase from 'firebase/app'

import 'firebase/firebase-database'
import 'firebase/storage'

const oFirebase = firebase.initializeApp({

    storageBucket: "motiveko-84a06.appspot.com",
    databaseURL: "https://motiveko-84a06-default-rtdb.firebaseio.com/"
});

const oDB = oFirebase.database();

// firebase db 객체 중 pictures 공개
export const oPicturesinDB = oDB.ref('pictures');
// firebase storage 객체 공개
export const oStorage = oFirebase.storage();

