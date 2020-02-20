import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/scan',
    name: 'Scan',
    component: () => import('../views/Scan.vue'),
  },
  {
    path: '/',
    name: 'Create',
    component: () => import('../views/Create.vue'),
  },
  {
    path: '/print',
    name: 'Print',
    component: () => import('../views/Print.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
