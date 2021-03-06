import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import PostDetail from '../views/PostDetail.vue'
import Profile from '../views/Profile.vue'
import NewPost from '../views/NewPost.vue'
import AdminWords from '../views/AdminWords.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/myprofile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/myprofile/newpost',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/myprofile/words',
    name: 'Words',
    component: AdminWords
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
