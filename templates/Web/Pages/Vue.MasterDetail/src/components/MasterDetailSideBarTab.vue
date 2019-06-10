<template>
  <button
    v-on:click="$emit('onDisplayTabClick', index)"
    type="button"
    class="list-group-item list-group-item-action styles.sidebarText"
  >
    <img src="../assets/GreyAvatar.svg" alt="Default Grey Avatar" class="mr-3">
    {{tabText}}
  </button>
</template>

<script>
export default {
  name: "MasterDetailSideBarTab",
  props: {
    tabText: String,
    index: Number
  }
};
</script>

<style scoped>
.sidebarText {
  font-weight: 500;
}
</style>
