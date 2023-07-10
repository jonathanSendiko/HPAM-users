import Joi from 'joi'

const validateRegister = (user) => {
    const schema = Joi.object({
      name: Joi.string().required().min(2).max(50),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3)
    });
  
    return schema.validate(user);
  };

const validateUpdate = (user) => {
const schema = Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    status: Joi.boolean()
});

return schema.validate(user);
};

export {
    validateRegister,
    validateUpdate
}