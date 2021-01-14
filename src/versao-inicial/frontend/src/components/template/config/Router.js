import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from '../admin/AdminPages'
import Home from '../home/Home'
import articlesByCategory from '../article/articlesByCategory'
import articleById from '../article/articleById'
import auth from '../auth/auth'
import {userKey} from '@/global'

Vue.use(VueRouter)

const routes =[{
    name:'home',
    path:'/',
    component:Home,
    meta:{requiresUser: true}
},{
    name:'adminPages',
    path:'/admin',
    component:Admin,
    meta: {requiresAdmin: true}
},{
    name:'articlesByCategory',
    path:'/categories/:id/articles',
    component:articlesByCategory,
    meta:{requiresUser: true}
},{
    name:'articleById',
    path:'/articles/:id ',
    component:articleById,
    meta:{requiresUser: true}
},{
    name:'auth',
    path:'/login',
    component:auth
}]

const router =  new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to, from, next)  =>    {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.Admin ? next() : next({path: '/'})
    }else{
        next()
    }
}) 

router.beforeEach((to,from,next)    =>{
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresUser)) {
        const user = JSON.parse(json)
        user ? next() : next({path: '/login'})
    }else{
        next()
    }
})
export default router


