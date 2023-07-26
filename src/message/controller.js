import { Router } from 'express'
import messageSchema from './schema.js'
import MessageService from './service.js'

const MessageController = Router()

/**
 * POST /messages
 * @return Messages
 */
MessageController.post('/', async (req, res) => {
    console.log('req.body -- ', req.body)
    const { error } = validate(req.body)

    if (error) {
        console.log(error)
        res.sendStatus(400)
    } else {
        const messageId = await MessageService.create(req.body)
        res.status(201).send({ messageId: messageId })
    }
})
/**
 * GET /messages
 * @return Messages<Array>
 */
MessageController.post('/getAll', async (req, res) => {
    const mesages = await MessageService.getAll()
    res.status(201).send({ mesages: mesages })
})

/**
 * @param {*} params => params to validate with Joi. 
 * @returns validated data
 */
function validate(params) {
    return messageSchema.validate({
        title: params.title,
        message: params.message,
        userId: params.userId
    },
        { abortEarly: false })
}

export default MessageController

