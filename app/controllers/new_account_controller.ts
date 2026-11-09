import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class NewAccountController {
  async create({ view }: HttpContext) {
    return view.render('pages/auth/signup')
  }

  async store({ request, response, auth }: HttpContext) {
    const { username, email, phoneNumber, birthDate, password } = await request.validateUsing(signupValidator)
    const user = await User.create({ username, email, phoneNumber, birthDate, displayName: username, password, })

    await auth.use('web').login(user)
    response.redirect().toRoute('home')
  }
}
