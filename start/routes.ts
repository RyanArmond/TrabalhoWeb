import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

const VideoController = () => import('#controllers/videos_controller')

router.on('/').render('pages/home').as('home')

router.get('users', [controllers.Users, 'index'])

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router.post('logout', [controllers.Session, 'destroy']).use(middleware.auth())

router.get('/videos', [controllers.Videos, 'index'])
router.get('/videos/create', [controllers.Videos, 'create'])
router.post('/videos', [controllers.Videos, 'store'])
router.get('/videos/:id', [controllers.Videos, 'show'])
router.delete('/videos/:id', [controllers.Videos, 'destroy'])
