import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from '../admin/AdminPages'
import Home from '../home/Home'

Vue.use(VueRouter)

const routes =[{
    name:'home',
    path:'/',
    component:Home
},{
    name:'adminPages',
    path:'/admin',
    component:Admin
}]

export default new VueRouter({
    mode:'history',
    routes: routes
})



