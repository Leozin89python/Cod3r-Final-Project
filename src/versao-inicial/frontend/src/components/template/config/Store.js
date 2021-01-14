import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


export default new Vuex.Store({
   state:{
        isMenuVisisble : false,
        user: null
   },mutations:{
        toggleMenu(state, isVisible){
            if(!user.state) {
                state.isMenuVisisble = false
                return
            }
            if(isVisible === undefined){
                state.isMenuVisisble = !state.isMenuVisisble
            }else{
                state.isMenuVisisble = isVisible
            }

        },setUser(state, user) {
            state.user = user
            if(user)    {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisisble = true
            }else{
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisisble = false
            }
        }
   }
})

