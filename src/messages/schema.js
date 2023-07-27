import Joi from 'joi'

export default Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    userId: Joi.string().required()
})