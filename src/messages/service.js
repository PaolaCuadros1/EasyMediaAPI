import { Firestore } from "../firebase/firestore/core.js";
import UserService from '../users/service.js'
import { Timestamp } from 'firebase-admin/firestore'

const COLLECTION_NAME = 'messages'
export const LIMIT_PER_PAGE = 3

const injectParams = (query, params = {}) => {
    if ( typeof params === 'object' && Object.keys(params).length > 0 ) {
        Object.keys(params).forEach((k) => {
            const value = params[k]
            if (k === 'createAt' && value) {
                const start = new Date(`${value}T00:00:00.000Z`)
                const end = new Date(`${value}T23:59:59.000Z`)
                query = query.where(k, '>=', start).where(k, '<=', end)
            } else if (k !== 'page') {
                if (value) {
                    query = query.where(k, '==', value)
                }
            }
        })
    }

    return query
}

const MessagesService = {
    async create(message) {
        message.createAt = new Date()
        let user = await UserService.findById(message.userId)
        message.userName = user.userName
        const docRef = Firestore.collection(COLLECTION_NAME).doc()
        await docRef.set(message)
        return docRef.id
    },

    async getAll(params, page = 1, limit = LIMIT_PER_PAGE) {
        let query = Firestore.collection(COLLECTION_NAME).orderBy('createAt', 'desc')
        query = injectParams(query, params)

        const snapshot = await query.offset(limit*(page-1)).limit(limit).get()
        return snapshot.docs.map(doc => doc.data())
    },

    async getCount(params) {
        let query = Firestore.collection(COLLECTION_NAME)
        query = injectParams(query, params)

        const snapshot = await query.count().get()

        return snapshot.data().count
    }
}

export default MessagesService
