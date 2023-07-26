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
            res.status(208).send({ userRegistered: "ok" })
        } else {
            const userId = await UserService.create(req.body)
            res.status(201).send({ userId: userId })
        }
    }
})

/**
 * @param {*} params => params to validate with Joi. 
 * @returns validated data
 */
function validate(params) {
    return userSchema.validate({
        userName: params.userName,
        email: params.email,
        password: params.password
    },
        { abortEarly: false })
}

export default UsersController

