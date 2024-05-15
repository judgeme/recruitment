import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

import IndexPage from '@/pages/IndexPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('@/pages/products/ProductDetailPage.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/shops',
      name: 'shops',
      component: () => import('@/pages/shops/ShopPage.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/shop/:id',
      name: 'shop-detail',
      component: () => import('@/pages/shops/ShopDetailPage.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/SignupPage.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgotpassword',
      component: () => import('@/pages/ForgotPasswordPage.vue')
    }
  ]
});

router.beforeEach(async (to, _, next) => {
  const currentUser = await getCurrentUser();
  if (to.meta.requiresAuth) {
    if (!currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    if (!currentUser) {
      next();
    }
  }
});

export default router;
