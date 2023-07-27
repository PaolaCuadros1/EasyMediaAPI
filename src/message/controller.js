import { Router } from 'express'
import messageSchema from './schema.js'
import MessagesService from './service.js'

const MessagesController = Router()

/**
 * POST /messages
 * @return Messages
 */
MessagesController.post('/', async (req, res) => {
    console.log('req.body -- ', req.body)
    const { error } = validate(req.body)

    if (error) {
        console.log(error)
        res.sendStatus(400)
    } else {
        const messageId = await MessagesService.create(req.body)
        res.status(201).send({ messageId: messageId })
    }
})

// /**
//  * GET /messages
//  * @return Messages<Array>
//  */
// MessagesController.get('/:userId', async (req, res) => {
//     const messages = await MessagesService.getAll(req.params.userId)
//     console.log('messages -- ', messages)
//     res.status(201).send({messages})
// })

/**
 * GET /messages
 * @return Messages<Array>
 */
MessagesController.get('/', async (req, res) => {
    const messages = await MessagesService.getAll(req.query)
    res.json(messages)
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

export default MessagesController