<template>
  <button
    class="list-group-item list-group-item-action styles.sidebarText"
    v-bind:class="{ active: isActive }"
    type="button"
    @click="$emit('selectSampleOrder', sampleOrder)"
  >
    <img class="mr-3" :src="sampleOrder.imageSrc ? sampleOrder.imageSrc : imgGreyAvatar" :alt="sampleOrder.title" />
    {{sampleOrder.title}}
  </button>
</template>

<script>
import imgGreyAvatar from '../assets/GreyAvatar.svg';
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
  data (){
    return {
      imgGreyAvatar
    }
  }
};
</script>

<style scoped>
.sidebarText {
  font-weight: 500;
}
</style>
