import { Firestore } from "../firebase/firestore/core.js"
import UserService from '../users/service.js'
import { DateTime, Settings } from 'luxon'

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

    async getAll(params = {}) {
        let query = Firestore.collection(COLLECTION_NAME).orderBy('createAt', 'desc')
        if (typeof params === 'object' && Object.keys(params).length > 0) {
            Object.keys(params).forEach((k) => {
                if (k == 'createAt' && params[k] != '') {
                    const start = new Date(`${params[k]}T05:00:00.000Z`)
                    const end = new Date(`${params[k]}T23:59:59.000z`)
                    query = query.where(k, '>', start)
                    query = query.where(k, '<', end)
                } else {
                    if (params[k] != '') {
                        query = query.where(k, '==', params[k])
                    }
                }
            })
        }
        const snapshot = await query.get()
        return snapshot.docs.map(doc => doc.data())
    }
}

export default MessageService