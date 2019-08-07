<template>
  <b-col sm="12" md="4" class="p-5">
    <img src="@/assets/GreyBox.svg" alt="Default Grey Box" class="mb-3" />
    <h3>{{header}}</h3>
    <p>{{description}}</p>
  </b-col>
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
