<template>
  <div class="home">
    <v-row justify="center">
      <p v-if="documents.length==0" class="font-italic grey--text mt-10" >No documents here</p>
      </v-row>
    <div class="d-flex justify-center my-10">
      <v-list min-width="50%" >
        <v-list-item  v-for="item in documents" v-bind:key="item.name" >
          <v-hover v-slot="{ hover }">
          <v-card class="d-flex align-center px-5 my-1" width="100%" :elevation="hover ? 6 : 3" >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle> 
          </v-list-item-content>
          <v-list-item-action>
            <v-btn :id="item.name" v-on:click="removeDocument(item)" fab small >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
          </v-card>
          </v-hover>
        </v-list-item>
      </v-list>
    </div>

    <v-row justify="center">
      <v-btn id="addButton" v-on:click="addDocument" fab class="green mx-2 my-5">
        <v-icon>mdi-file-plus</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>



<script>
  export default {
    name: 'Documents',
    data(){
      return {
        documents: [],
        removedDocuments: []
      }
    },
    methods:{
      addDocument: function () {
        this.documents.push({name: "document"+(this.documents.length+1), date: new Date().toLocaleString()})
        this.documents.sort(function(a,b){
          return new Date(b.date)-new Date(a.date)
        })
      },
      removeDocument: function(item){
          this.removedDocuments.push(item)
          this.removedDocuments.sort(function(a,b){
          return new Date(b.date)-new Date(a.date)
        })
          this.documents.splice(this.documents.indexOf(item), 1)
      }
    },
    mounted(){
      if(localStorage.documents){
        this.documents=JSON.parse(localStorage.documents)
      }
      if(localStorage.removedDocuments){
        this.removedDocuments=JSON.parse(localStorage.removedDocuments)
      }
    },
    watch:{
      documents:{
        handler(){
          localStorage.documents=JSON.stringify(this.documents)
        }
      },
      removedDocuments:{
        handler(){
          localStorage.removedDocuments=JSON.stringify(this.removedDocuments)
        }
      }
    }

  }
</script>
