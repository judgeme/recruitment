import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import DashboardView from '../views/DashboardView.vue';
import NewReview from '../views/NewReview.vue';
import EditReview from '../views/EditReview.vue';

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
          component: DashboardView
        },
        {
          path: 'published-reviews',
          name: 'published-reviews',
          component: DashboardView
        }
      ]
    },
    {
      path: '/new-review',
      name: 'new-review',
      component: NewReview
    },
    {
      path: '/edit-review/:id',
      name: 'edit-review:id',
      component: EditReview
    }
  ]
});

export default router;
