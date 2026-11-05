

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

const VideoController = () => import('#controllers/video_controller')

router.on('/').render('pages/home').as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('/dashboard').render('pages/dashboard').as('dashboard')
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())


router.get('/videos', [VideoController, 'index'])
router.get('/videos/create', [VideoController, 'create'])
router.post('/videos', [VideoController, 'store'])
router.get('/videos/:id', [VideoController, 'show'])
router.delete('/videos/:id', [VideoController, 'destroy'])

