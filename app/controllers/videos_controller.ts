import Video from '#models/video'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class VideoController {
  async index({ request, view }: HttpContext) {
    const search = request.input('search')
    const query = Video.query().preload('user')

    if (search) {
      query.whereLike('title', `%${search}%`)
    }
    const videos = await query
    return view.render('pages/videos/index', { videos, search })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/videos/create')
  }

  async store({ request, auth, response }: HttpContext) {
    const { title, description } = request.only(['title', 'description'])

    const videoFile = request.file('video_file')
    let videoUrl = request.input('url')

    if (videoFile) {
      const fileName = `${Date.now()}_${videoFile.clientName}`
      await videoFile.move(app.makePath('public/uploads/videos'), {
        name: fileName,
      })
      videoUrl = `/uploads/videos/${fileName}`
    }

    await Video.create({
      title,
      description,
      url: videoUrl,
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
