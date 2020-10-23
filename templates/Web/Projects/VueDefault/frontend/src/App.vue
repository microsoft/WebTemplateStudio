<template>
  <div>
    <NavBar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    NavBar,
    Footer
  }
};
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 160px !important; /* Height of the footer */
  padding: 0;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 160px; /* Set the fixed height of the footer here */
}

/* Override Bootstrap Styling */

.btn-primary {
  background-color: #025fce !important;
}

</style>
