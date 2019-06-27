<template>
  <div class="col-md-4 col-sm-12 p-5">
    <img src="../assets/GreyBox.svg" alt="Default Grey Box" class="mb-3">
    <h3>{{header}}</h3>
    <p>{{description}}</p>
  </div>
</template>

<script>
export default {
  name: "GridComponent",
  props: {
    header: String,
    description: String
  }
};
</script>
