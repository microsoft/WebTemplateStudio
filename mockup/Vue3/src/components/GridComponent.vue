<template>
  <b-col sm="12" md="4" class="p-5">
    <h3>{{header}}</h3>
    <p>{{description}}</p>
  </b-col>
</template>

<script>
export default {
  name: "GridComponent",
  props: {
    header: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>
