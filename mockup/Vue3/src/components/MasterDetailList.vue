<template>
  <button
    class="list-group-item list-group-item-action styles.sidebarText"
    v-bind:class="{ active: isActive }"
    type="button"
    @click="eventBus.emit('selectsampleorder', sampleOrder)"
  >
    <img class="mr-3" :src="sampleOrder.imageSrc" :alt="sampleOrder.title" />
    {{sampleOrder.title}}
  </button>
</template>

<script>
import mitt from 'mitt';

export default {
  name: "MasterDetailList",
  props: {
    sampleOrder: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    }
  },
  setup(){
    const eventBus = new mitt();
    return {eventBus};
  }
};
</script>

<style scoped>
.sidebarText {
  font-weight: 500;
}
</style>
