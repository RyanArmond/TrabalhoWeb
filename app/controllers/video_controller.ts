import Video from '#models/video'
import type { HttpContext } from '@adonisjs/core/http'

export default class VideoController {

    async index({ request }: HttpContext) {
        const search = request.input('search')
        const query = Video.query()

        if (search) {
            query.whereLike('title', `%${search}%`)
        }

        const videos = await query
        return videos
    }

    async create({ view }: HttpContext) {
        return view.render('pages/videos/create')
    }

    async store({ request, auth, response }: HttpContext) {
        const { title, description, url } = request.only(['title', 'description', 'url'])

        await Video.create({
            title,
            description,
            url,
            userId: auth.user?.id,
        })

        return response.redirect().toPath('/videos')
    }

    async show({ params, view }: HttpContext) {
        const video = await Video.findOrFail(params.id)
        await video.load('user')
        return view.render('pages/videos/show', { video })
    }

    async destroy({ params, response }: HttpContext) {
        const video = await Video.findOrFail(params.id)
        await video.delete()
        return response.redirect().toPath('/videos')
    }

}

