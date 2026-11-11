import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.Home, 'index']).as('home')

router.get('users', [controllers.Users, 'index']).use([middleware.auth(), middleware.admin()])

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
router.get('/videos/create', [controllers.Videos, 'create']).use(middleware.auth())
router.post('/videos', [controllers.Videos, 'store']).use(middleware.auth())
router.get('/videos/:id', [controllers.Videos, 'show'])
router.delete('/videos/:id', [controllers.Videos, 'destroy']).use(middleware.auth())
