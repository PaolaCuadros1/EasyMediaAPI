import { Firestore } from "../firebase/firestore/core.js";

const COLLECTION_NAME = 'users'

const UserService = {
    async create(user) {
        user.createAt = new Date()
        const docRef = Firestore.collection(COLLECTION_NAME).doc()
        await docRef.set(user)
        return docRef.id
    },

    async findByEmail (userEmail) {
        if (!userEmail) {
          return Promise.reject(new Error("The user email must be specified."))
        }
        const snapshot = await Firestore.collection(COLLECTION_NAME).where('email', '==', userEmail).count().get()
        return snapshot.data().count
      }
}

export default UserService