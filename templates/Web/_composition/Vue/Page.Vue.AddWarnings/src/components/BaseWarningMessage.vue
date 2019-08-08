<template>
  <div class="alert alert-warning ml-3 warningPosition" role="alert">
    {{text}}
    <button @click="$emit('onWarningClose')" class="close ml-2" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseWarningMessage",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.warningPosition {
  position: fixed !important;
  bottom: 0;
  left: 0;
  z-index: 1030;
}
</style>
