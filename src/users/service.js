import { Firestore } from "../firebase/firestore/core.js";

const COLLECTION_NAME = 'users'

const UserService = {
    async create(user) {
        user.createAt = new Date()
        const docRef = Firestore.collection(COLLECTION_NAME).doc(user.uid)
        await docRef.set(user)
        return docRef.email
    },

    async findByEmail (userEmail) {
        if (!userEmail) {
          return Promise.reject(new Error("The user email must be specified."))
        }
        const snapshot = await Firestore.collection(COLLECTION_NAME).where('email', '==', userEmail).count().get()
        return snapshot.data().count
      },

    async findById (userId) {
        if (!userId) {
          return Promise.reject(new Error("The user email must be specified."))
        }
        const snapshot = await Firestore.collection(COLLECTION_NAME).doc(userId).get()
        return snapshot.data()
      }
}

export default UserService