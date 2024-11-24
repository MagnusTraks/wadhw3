import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import SignUpPage from '../components/SignUpPage.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',  
    component: MainPage 
  },
  {
    path: '/signup',
    name: 'SignUp', 
    component: SignUpPage 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
