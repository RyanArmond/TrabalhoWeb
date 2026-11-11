import type { HttpContext } from '@adonisjs/core/http'
import Video from '#models/video'

export default class HomeController {
    async index({ view }: HttpContext) {
        const videos = await Video.query()
                                  .preload('user')
                                  .orderBy('createdAt', 'desc')

        return view.render('pages/home', { videos })
    }
}