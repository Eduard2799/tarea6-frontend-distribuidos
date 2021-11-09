<!-- AuthorDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Author</label>
       <input class="u-full-width" type="text"
         v-model="author.author">
      </div>
      <div class="six columns">
       <label for="authorInput">Nationality</label>
       <input class="u-full-width" type="text"
          v-model="author.nationality">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="publisherInput">Birth year</label>
       <input class="u-full-width" type="text"
          v-model="author.birth_year">
      </div>
      <div class="six columns">
       <label for="editionInput">Fields</label>
       <input class="u-full-width" type="text"
         v-model="author.fields">
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
     <div class="row">
      <router-link class="button button-primary" 
        to="/author">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateauthor(author._id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createauthor()">Create</a>
     </div>
    </form>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "author Details",
  props: ['create','edit','create'],
  data() {
    return {
      title: "author Data",
      author: {},
      books: []
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findauthor(route.params.id);
    else {
      this.author = {
        '_id': Math.floor(Math.random()*100000000),'author':'','nationality':'',
        'birth_year':0,'fields':'',
        'books':[] };
    }
  },
  methods: {
    findauthor: function(id) {
      fetch(this.url+'/.netlify/functions/authorFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.author = items[0];
       this.books = this.author['books'];
      })
    },
    updateauthor: function(id) {
      fetch(this.url+'/.netlify/functions/authorUpdate/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'PUT',
          body: JSON.stringify(this.author)})
        .then((data) => {
          this.$router.push('/author');
        }
      )
    },
    createauthor: function() {
      fetch(this.url+'/.netlify/functions/authorInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.author)})
        .then((data) => {
           this.$router.push('/author');
        }
      )
    }
  }
};
</script>