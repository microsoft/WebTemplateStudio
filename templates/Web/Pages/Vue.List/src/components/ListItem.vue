<template>
  <div class="col-12 mb-3 border">
    <div class="row">
      <div class="col-11">
        <p class="mt-3">{{listItem.text}}</p>
      </div>
      <div class="col-1">
        <button
          type="button"
          class="close py-2"
          data-dismiss="alert"
          aria-label="Close"
          v-on:click="$emit('onDeleteListItem', listItem)"
        >
          <div aria-hidden="true">&times;</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    listItem: Object
  }
};
</script>
