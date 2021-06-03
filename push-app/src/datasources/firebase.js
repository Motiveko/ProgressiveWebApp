import firebase from 'firebase/app'

import 'firebase/firebase-database'

const oFirebase = firebase.initializeApp({
    databaseURL: "https://motiveko-84a06-default-rtdb.firebaseio.com"
})

const oDB = oFirebase.database()

export const oSubscriptionsinDB = oDB.ref('subscriptions')