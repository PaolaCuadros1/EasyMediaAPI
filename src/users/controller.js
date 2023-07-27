import { Router } from 'express'
import userSchema from './schema.js'
import UserService from './service.js'

const UsersController = Router()

/**
 * POST /users
 * @return Users
 */
UsersController.post('/', async (req, res) => {
    const { error } = validate(req.body)

    if (error) {
        console.log(error)
        res.sendStatus(400)
    } else {
        const totalUsers = await UserService.findByEmail(req.body.email)
        if (totalUsers >= 1) {
            res.status(208).send({ userRegistered: "ok", status: false })
        } else {
            const userId = await UserService.create(req.body)
            res.status(201).send({ status: true })
        }
    }
})

/**
 * GET /users/:id
 * @return User
 */
UsersController.get('/:id', async (req, res) => {
    try {
        const user = await UserService.findById(req.params.id)
        res.status(201).send(user)
    } catch (error) {
        resError(res, error, 'Error getting Credit Card info.')
    }
})

/**
 * @param {*} params => params to validate with Joi. 
 * @returns validated data
 */
function validate(params) {
    return userSchema.validate({
        userName: params.userName,
        email: params.email
    },
        { abortEarly: false })
}

export default UsersController

