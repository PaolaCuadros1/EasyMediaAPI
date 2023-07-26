import { Firestore } from "../firebase/firestore/core.js";
import UserService from '../users/service.js'

const COLLECTION_NAME = 'messages'

const MessageService = {
    async create(message) {
        message.createAt = new Date()
        let user = await UserService.findById(message.userId)
        message.userName = user.userName
        const docRef = Firestore.collection(COLLECTION_NAME).doc()
        await docRef.set(message)
        return docRef.id
    },

    async getAll(userId = '') {
        let query = Firestore.collection(COLLECTION_NAME).orderBy('createAt', 'desc')
        let snapshot = await (userId != '' ? query.get() : query.where('userId', '==', userId).get())
        //let snapshot = await Firestore.collection(COLLECTION_NAME).orderBy('createAt', 'desc').get()
        return snapshot.docs.map(doc => doc.data())
    }
}

export default MessageService