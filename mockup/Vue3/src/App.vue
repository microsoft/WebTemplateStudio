<template>
  <div id='root'>
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

export default {
 components: {
    NavBar,
    Footer
  }
}
</script>

<style scoped>

#root {
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

img {
  width: 200px;
}

#nav {
  font-size: 1.5em;
  margin-bottom: 30px;
}

a {
  text-decoration: none;
  margin: 30px 25px;
  color: #333;
}

a:hover {
  text-decoration: underline;
  color: 
}

</style>
