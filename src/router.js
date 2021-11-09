import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import BookIndex from "./components/BookIndex.vue";
import AuthorIndex from "./components/AuthorIndex.vue";
import BookDetails from "./components/BookDetails.vue";
import AuthorDetails from "./components/AuthorDetails.vue";
import EditorialIndex from "./components/EditorialIndex.vue";
import EditorialDetails from "./components/EditorialDetails.vue";

const routes = [
  { path: "/", component: Home },
	
  { path: "/book", component: BookIndex },
  { path: "/book/show/:id", 
    component: BookDetails, props: {show:true} },
  { path: "/book/edit/:id", 
    component: BookDetails, props: {edit:true} },
  { path: "/book/create", 
    component: BookDetails, props: {create:true} },
  { path: "/book/delete/:id", 
    component: BookDetails, props: {delete:true} },
  //------------------------------------------------//
  { path: "/author", component: AuthorIndex },
  { path: "/author/show/:id", 
    component: AuthorDetails, props: {show:true} },
  { path: "/author/edit/:id", 
    component: AuthorDetails, props: {edit:true} },
  { path: "/author/create", 
    component: AuthorDetails, props: {create:true} },
  { path: "/author/delete/:id", 
    component: AuthorDetails, props: {delete:true} },
  //------------------------------------------------//
  { path: "/publisher", component: EditorialIndex },
  { path: "/publisher/show/:id", 
    component: EditorialDetails, props: {show:true} },
  { path: "/publisher/edit/:id", 
    component: EditorialDetails, props: {edit:true} },
  { path: "/publisher/create", 
    component: EditorialDetails, props: {create:true} },
  { path: "/publisher/delete/:id", 
    component: EditorialDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;