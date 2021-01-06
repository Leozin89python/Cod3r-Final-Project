import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
   state:{
        isMenuVisisble : true,
        user:{
            name:'usuário mock',
            email:'mock@cod3r.com.br'
        }
   },mutations:{
        toggleMenu(state, isVisible){
            if(isVisible === undefined){
                state.isMenuVisisble = !state.isMenuVisisble
            }else{
                state.isMenuVisisble = isVisible
            }

            console.log('visibleOrNot = ' +  state.isMenuVisisble)
        }
   }
})