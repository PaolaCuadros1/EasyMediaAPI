import { Firestore } from "../firebase/firestore/core.js";

const COLLECTION_NAME = 'messages'

const MessageService = {
    async create(message) {
        message.createAt = new Date()
        const docRef = Firestore.collection(COLLECTION_NAME).doc()
        await docRef.set(message)
        return docRef.id
    },

    async getAll () {    
        const creditCards = []
        let snapshot = await Firestore.collection(COLLECTION_NAME).orderBy('createAt', 'desc').get()
        return snapshot.docs.map(doc => doc.data())
      }
}

export default MessageService