<template>
	<div id="app" :class="{'hide-menu': !isMenuVisisble}  ||  !user">
		<Header title="cod3r  - base de conhecimento"
		 :hideToggle="!user"
		 :hideUserDropDown="!user"/>
		<Menu v-if="user"/>
		<Loading v-if="authToken"/>
		<Content v-else/>
		<Footer />
	</div>
</template>




<script>
	import axios from 'axios'
	import {baseApiUrl, userKey,showError} from '@/global'
 	import {mapState} from 'vuex'
	import Header from '@/components/template/Header'
	import Menu from '@/components/template/Menu'
	import Content from '@/components/template/Content'
	import Footer from '@/components/template/Footer'
	import Loading from '@/components/template/loading'

	export default {
		name: "App",
		components: { Header, Menu, Content, Footer, Loading},
		computed:mapState(['isMenuVisisble','user']),
		data: function()	{
			return {
				validatingToken: true
			}
		},
		methods:	{
			async authTolken()	{
				this.validatingToken = true

				const json = localStorage.getItem(userKey)
				const userData = JSON.parse(json)
				this.$store.commit('setUser',null)

				if(!userData){
					this.validatingToken = false
					this.$route.push({ name:'auth' })
					return
				}

				const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

				 if(res.data)	{
					 this.$store.commit('setUser',userData)
					  
				 if(this.$mq === 'xs'||this.$mq === 'sm')    {
                        this.$store.commit('toggleMenu' , false)
					}
					
				 }else	{
					  localStorage.removeItem(userKey)
					  this.$route.push({name:'auth'})
				 }

				 this.validatingToken = false
			}
		},created()	{
			this.authTolken()
		}
	}
</script>




<style>
	*{
		font-family: "Lato",sans-serif;
	}
	body{
		margin: 0;
	}
	#app{
		height: 100vh;
		display:grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas: 
		"header header"
		"menu content"
		"menu footer";
	}
	#app.hide-menu{
		grid-template-areas: 
		"header header"
		"content content"
		"footer footer";
	}
</style>