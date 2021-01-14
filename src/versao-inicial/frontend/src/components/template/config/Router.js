import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from '../admin/AdminPages'
import Home from '../home/Home'
import articlesByCategory from '../article/articlesByCategory'
import articleById from '../article/articleById'
import auth from '../auth/auth'

Vue.use(VueRouter)

const routes =[{
    name:'home',
    path:'/',
    component:Home
},{
    name:'adminPages',
    path:'/admin',
    component:Admin
},{
    name:'articlesByCategory',
    path:'/categories/:id/articles',
    component:articlesByCategory
},{
    name:'articleById',
    path:'/articles/:id ',
    component:articleById
},{
    name:'auth',
    path:'/login',
    component:auth
}]

const router =  new VueRouter({
    mode:'history',
    routes
})

export default router


