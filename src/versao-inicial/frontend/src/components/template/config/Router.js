import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from '../admin/AdminPages'
import Home from '../home/Home'
import articlesByCategory from '../article/articlesByCategory'

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
}]

const router =  new VueRouter({
    mode:'history',
    routes
})

export default router


