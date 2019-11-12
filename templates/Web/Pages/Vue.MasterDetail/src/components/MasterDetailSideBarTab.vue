<template>
  <button
    class="list-group-item list-group-item-action styles.sidebarText"
    type="button"
    @click="$emit('selectSampleOrder', sampleOrder)"
  >
    <img class="mr-3" src="@/assets/GreyAvatar.svg" alt="Default Grey Avatar" />
    {{sampleOrder.title}}
  </button>
</template>

<script>
export default {
  name: "MasterDetailSideBarTab",
  props: {
    sampleOrder: {
      type: Object,
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
