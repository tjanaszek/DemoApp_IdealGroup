<template>
  <div class="recycleBin">
    <v-row justify="center">
      <p v-if="removedDocuments.length==0" class="font-italic grey--text mt-10" >Recycle Bin is empty</p>
      </v-row>
    <div class="d-flex justify-center my-10">
      <v-list min-width="50%">
        <v-list-item v-for="item in removedDocuments" v-bind:key="item.name" >
          <v-hover v-slot="{ hover }">
          <v-card class="d-flex align-center px-5 my-1" width="100%" :elevation="hover ? 6 : 3">
          <v-list-item-content >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn :id="item.name" v-on:click="restore(item)" fab small>
              <v-icon>mdi-delete-restore</v-icon>
            </v-btn>
          </v-list-item-action>
          </v-card>
          </v-hover>
        </v-list-item>
      </v-list>
    </div>

    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        id="emptyRecycleBin"
          fab class="red mx-2 my-5"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-delete-empty</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Confirm Deletion
        </v-card-title>
        <v-card-text>Are you sure you want to permanently remove all items?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            id="deletion-yes-btn"
            color="green darken-1"
            text
            v-on:click="emptyRecycleBin"
          >
            YES
          </v-btn>
          <v-btn
            id="deletion-no-btn"
            color="green darken-1"
            text
            @click="dialog = false"
          >
            NO
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  </div>
</template>

<script>

  export default {
    data(){
      return {
        documents: [],
        removedDocuments: [],
        dialog: false
      }
    },
    methods:{
      emptyRecycleBin: function () {
        this.removedDocuments.splice(0, this.removedDocuments.length)
        this.dialog = false
      },
      restore: function (item) {
        this.documents.push(item)
        this.removedDocuments.splice(this.removedDocuments.indexOf(item), 1)
        this.documents.sort(function(a,b){
          return new Date(b.date)-new Date(a.date)
        })
      }
    },
    mounted(){
      console.log("App mounted!")
      if(localStorage.documents){
        this.documents=JSON.parse(localStorage.documents)
      }
      if(localStorage.removedDocuments){
        console.log(this.removedDocuments)
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
