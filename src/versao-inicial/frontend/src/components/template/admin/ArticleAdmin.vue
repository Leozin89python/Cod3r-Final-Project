<template>
    <div class="article-admin">
         <b-form>
          <input id="article-id" type="hidden" v-model="article.id" />
          <b-row>
              <b-col xs="12">
                  <b-form-group label="Nome:" label-for="article-name">
                      <b-form-input id="article-name"
                        type="text"
                        v-model="article.name" required
                        placeholder="informe o Nome do artigo ..."
                        />
                  </b-form-group>
              </b-col>
          </b-row>
           <b-row>
              <b-col xs="12">
                  <b-form-group label="Descrição:" label-for="article-description">
                      <b-form-input id="article-description"
                        type="text"
                        v-model="article.description" required
                        placeholder="informe a descrição do artigo ..."
                        />
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col xs="12">
                  <b-form-group label="Imagem (URL):" label-for="article-imageUrl">
                      <b-form-input id="article-imageUrl"
                        type="text"
                        v-model="article.imageUrl" required
                        placeholder="informe a URL da imagem ..."
                        />
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col xs="12">
                  <b-form-group label="Categoria:" label-for="article-categoryId">
                      <b-form-select id="article-categoryId"
                        :options="articles"  v-model="article.categoryId" 
                        />
                  </b-form-group>
              </b-col>
          </b-row>
           <b-row>
              <b-col xs="12">
                  <b-form-group label="Autor:" label-for="article-userId">
                      <b-form-select id="article-userId"
                        :options="users"  v-model="article.userId" 
                        />
                  </b-form-group>
              </b-col>
          </b-row>
           <b-form-group label="conteúdo:" label-for="article-parentID">
            <VueEditor v-model="article.content"
            placeholder="informe o  conteúdo do artigo ..."
           />          
           </b-form-group>
       </b-form>

        <b-button variant="primary" v-if="mode === 'save'" class="mt-3 mb-3" @click="save">
            Salvar
        </b-button>

        <b-button variant="danger" v-if="mode === 'remove'" class="mt-3 mb-3" @click="remove">
            Excluir
        </b-button>

        <b-button class="ml-3 mt-3 mb-3" @click="reset">
            limpar
        </b-button>

       <b-table hover striped :items="articles" :fields="fields">
           <template  slot="actions" slot-scope="data">
                <b-button variant="warning"  @click="loadArticle(data.item)" class="mr-2">
                  <i class="fa fa-pencil"></i>
              </b-button>
              <b-button variant="danger" @click="loadArticle(data.item,'remove')">
                    <i class="fa fa-trash"></i>  
            </b-button>
           </template>    
       </b-table>
       <b-pagination sixe="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>




<script>
import { VueEditor } from 'vue2-editor'
    import axios from 'axios'
    import {baseApiUrl, showError} from '@/global'

    export default{
        name: 'ArticleAdmin',
        components: { VueEditor },
         data:function() {
            return  {
                mode:'save',
                article:{},
                articles:[],
                categories:[],
                users:[],
                page:1,
                limit:0,
                count:0,
                fields:[{
                    key:'id' , label:'Código' , sortable:true},
                    {key:'name' , label:'Nome' , sortable:true},
                    {key:'description' , label:'descrição' , sortable:true},
                    {key:'actions', label:'Ações'}
                    ]
            }
        },
        methods:{
            loadArticles()    {
                const url = `${baseApiUrl}/articles?page=${this.page}`
                axios.get(url).then(res => this.articles = res.data)
            },loadArticle(article, mode='save')    {
                this.mode = mode
                //this.article = {...article}
                axios.get(`${baseApiUrl}/articles/${article.id}`)
                     .then(res  =>  {
                         this.articles  =  res.data.data
                         this.count     =  res.data.count
                         this.limit     =  res.data.limit
                     })
            },reset()   {
                this.mode ='save'
                this.article = {}
                this.loadArticles()
            },save()    {
                const method = this.article.id ? 'put' : 'post'
                const id = this.article.id ? `/${ this.article.id }` : ''
                axios[method](`${baseApiUrl}/articles${id}`, this.article)
                            .then( () =>{
                                this.$toasted.global.defaultSuccess()
                                this.reset()
                            })
                            .catch(showError,this.reset())
            },remove()  {
                  const id = this.article.id
                  axios.delete(`${baseApiUrl}/articles${id}`)
                     .then(() =>{
                         this.$toasted.global.defaultSuccess()
                         this.reset()
                    })
                    .catch(showError)
            },loadCategories()  {
                const url = `${baseApiUrl}/categories`
                axios.get(url).then(res =>{
                    this.categories = res.data.map(category =>  {
                        return {value:category.id,text:category.path}
                    })
                })
            },loadUsers()   {
                const url = `${baseApiUrl}/users`
                axios.get(url).then(res =>  {
                    this.users = res.data.map(user =>{
                        return {value:user.id,text:`${user.name} - ${user.email}`}
                    })
                })
            }
        },
        watch: {
            page()  {
                this.loadArticles()
            }
        },mounted() {
             this.loadUsers()
             this.loadCategories()
             this.loadArticles() 
        }
    }    
</script>




<style>
    
</style>
