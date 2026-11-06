import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user";

export default class UsersController {
    async index({ view }: HttpContext) {
        const users = await User.all()
        return view.render('pages/listUsers', { users })
    }

}