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
                        placeholder="insira o nome da categoria..."
                        />
                  </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col xs="12">
                  <b-form-group label="artigo pai:" label-for="article-parentID">
                      <b-form-select id="article-parentId"
                        :options="articles"  v-model="article.parentId" 
                        />
                  </b-form-group>
              </b-col>
          </b-row>
           <b-form-group label="conteúdo:" label-for="article-parentID">
            <VueEditor v-model="article.content"
            aria-placeholder="informe o conteúdo do artigo ..."/>          
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
                const url = `${baseApiUrl}/articles`
                axios.get(url).then(res =>{
                   // this.articles = res.data
                   this.articles = res.data.map(article =>    {
                       return   {
                           ...article, value:article.id, text: article.path
                       }
                   })
                })
            },loadArticle(article, mode='save')    {
                this.mode = mode
                this.article = {...article}
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
            }
        },mounted() {
             loadArticles() 
        }
    }    
</script>




<style>
    
</style>

<!-- estou no tempo 5:26 da aula 572  -->