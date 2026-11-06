import vine from '@vinejs/vine'

const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

export const signupValidator = vine.create({
  username: vine.string().trim().regex(/^[a-zA-Z0-9_.]+$/)
                .minLength(3).maxLength(50)
                .unique({ table: 'users', column: 'username'}),

  email: email().unique({ table: 'users', column: 'email' }).optional()
                .requiredWhen((field) => !field.data.phoneNumber),

  phoneNumber: vine.string().minLength(4).maxLength(20)
                   .unique({ table: 'users', column: 'phone_number'}).optional()
                   .requiredWhen((field) => !field.data.email),

  birthDate: vine.date({ formats: ['YYYY-MM-DD'] }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
