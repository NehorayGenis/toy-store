import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import about from '../views/aboutView.vue'
// import carApp from '../views/car-app.vue'
// import carDetails from '../views/car-details.vue'
// import carEdit from '../views/car-edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/car',
    //   name: 'car-app',
    //   component: carApp,
    // },
    // {
    //   path: '/car/:id',
    //   name: 'car-details',
    //   component: carDetails,
    // },
    // {
    //   path: '/car/edit/:id?',
    //   name: 'car-edit',
    //   component: carEdit,
    // },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
  ]
})

export default router
