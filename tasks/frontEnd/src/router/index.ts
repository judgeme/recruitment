import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import DashboardView from '../views/DashboardView.vue';
import AllReviews from '../views/AllReviews.vue';
import PublishedReviews from '../views/PublishedReviews.vue';
import StoreReviews from '../views/StoreReviews.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: '',
          redirect: 'reviews'
        },
        {
          path: 'reviews',
          name: 'reviews',
          component: AllReviews
        },
        {
          path: 'published-reviews',
          name: 'published-reviews',
          component: PublishedReviews
        },
        {
          path: 'store-reviews',
          name: 'store-reviews',
          component: StoreReviews
        }
      ]
    },
    {
      path: '/new-review',
      name: 'new-review',
      component: () => import('../views/NewReview.vue')
    },
    {
      path: '/edit-review/:id',
      name: 'edit-review:id',
      component: () => import('../views/EditReview.vue')
    }
  ]
});

export default router;
