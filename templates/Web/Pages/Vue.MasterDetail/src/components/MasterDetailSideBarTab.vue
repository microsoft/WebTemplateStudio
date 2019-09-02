<template>
  <button
    class="list-group-item list-group-item-action styles.sidebarText"
    type="button"
    @click="$emit('onDisplayTabClick', index)"
  >
    <img class="mr-3" src="@/assets/GreyAvatar.svg" alt="Default Grey Avatar" />
    {{tabText}}
  </button>
</template>

<script>
export default {
  name: "MasterDetailSideBarTab",
  props: {
    tabText: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.sidebarText {
  font-weight: 500;
}
</style>
