<!-- BookIndex.vue -->
<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
        <th>Publisher</th>
        <th>Country</th>
        <th>Founded</th>
        <th>Genere</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='editorial in editorials'>
       <td>{{editorial.publisher}}</td>
       <td>{{editorial.country}}</td>
       <td>{{editorial.founded}}</td>
       <td>{{editorial.genere}}</td>
       <td>
       <router-link class="button"
         :to="'/publisher/show/'+editorial._id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/publisher/edit/'+editorial._id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteeditorial(editorial._id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/publisher/create">New</router-link>
   </div>
  </div>
</template>

<script>
	
export default {
  name: "Editorial Index",
  data() {
    return {
      title: 'Editorial List',
      editorials: []
    };
  },
  mounted() {
    this.alleditorials()
  },
  methods: {
    alleditorials() {
      fetch(this.url+'/.netlify/functions/editorialFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.editorials = items;
        })
     },
     deleteeditorial(id) {
       fetch(this.url+'/.netlify/functions/editorialDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.alleditorials();
          }
        )
     }
  }
};
</script>