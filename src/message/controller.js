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
MessageController.get('/:userId', async (req, res) => {
    const messages = await MessageService.getAll(req.params.userId)
    console.log('messages -- ', messages)
    res.status(201).send({messages})
})

/**
 * GET /messages
 * @return Messages<Array>
 */
MessageController.get('/getAll', async (req, res) => {
    console.log('req --- ', req.params)
    console.log('req --- ', req.body)
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

