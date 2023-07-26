import Joi from 'joi'

export default Joi.object({
    userName: Joi.string().regex(/^[A-Za-z\s]*$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8)
})