import admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
//import { getAuth } from 'firebase-admin/auth'

admin.initializeApp({
  credential: applicationDefault()
})

const Firestore = getFirestore()
Firestore.settings({ ignoreUndefinedProperties: true })
//const Auth = getAuth()

export { Firestore }
