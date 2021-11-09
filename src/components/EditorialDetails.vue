<!-- BookDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Publisher</label>
       <input class="u-full-width" type="text"
         v-model="editorial.publisher">
      </div>
      <div class="six columns">
       <label for="authorInput">Country</label>
       <input class="u-full-width" type="text"
          v-model="editorial.country">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="publisherInput">Founded</label>
       <input class="u-full-width" type="text"
          v-model="editorial.founded">
      </div>
      <div class="six columns">
       <label for="editionInput">Genere</label>
       <input class="u-full-width" type="text"
         v-model="editorial.genere">
      </div>
     </div>     
     <div class="row">
      <label for="publisherInput">Books</label>
      <div class="six columns" v-for='book in books'>
         <router-link class="button"
         :to="'/book/show/'+book.book_id">{{book.title}}
          </router-link>
      </div>
     </div>     
     <div class="row">
      <router-link class="button button-primary" 
        to="/publisher">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateEditorial(editorial._id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createEditorial()">Create</a>
     </div>
    </form>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Editorail Details",
  props: ['create','edit','create'],
  data() {
    return {
      title: "Editorail Data",
      editorial: {},
      books: [],
      book: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findEditorial(route.params.id);
    else {
      this.editorial = {
        '_id': Math.floor(Math.random()*100000000),'publisher':'','country':'',
        'founded':0,'genere':'','books':[]};
    }
  },
  methods: {
    findEditorial: function(id) {
      fetch(this.url+'/.netlify/functions/editorialFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.editorial = items[0];
       this.books = this.editorial['books'];
      })      
    },
    updateEditorial: function(id) {
      fetch(this.url+'/.netlify/functions/editorialUpdate/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'PUT',
          body: JSON.stringify(this.editorial)})
        .then((data) => {
          this.$router.push('/publisher');
        }
      )
    },
    createEditorial: function() {
      fetch(this.url+'/.netlify/functions/editorialInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.editorial)})
        .then((data) => {
           this.$router.push('/publisher');
        }
      )
    }
  }
};
</script>