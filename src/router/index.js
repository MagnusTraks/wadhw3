import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import SignUpPage from '../components/SignUpPage.vue';
import LoginPage from '../components/LoginPage.vue';
import ContactUsPage from '../components/ContactUsPage.vue';
import AddPostPage from '../components/AddPostPage.vue';
import PostPage from '../components/PostPage.vue';
import store from '@/store';

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'Home',
    component: MainPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpPage,
  },
  {
    path: '/contact',
    name: 'ContactUs',
    component: ContactUsPage,
  },
  {
    path: '/add-post',
    name: 'AddPost',
    component: AddPostPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: PostPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: 'LoginPage' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;