import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import useAuth from '@/auth/useAuth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/preview/:document/:parsedMarkdown',
      name: 'preview',
      component: () => import('../views/PreView.vue'),
      props: true,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      props: true
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('../views/EditProfileView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { state } = useAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !state.isLogin) {
    next('/login')
  } else {
    next()
  }
})

export default router
