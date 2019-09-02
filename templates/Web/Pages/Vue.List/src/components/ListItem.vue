<template>
  <div class="col-12 mb-3 border">
    <div class="row">
      <div class="col-11">
        <p class="mt-3">{{listItem.text}}</p>
      </div>
      <div class="col-1">
        <button
          aria-label="Close"
          class="close py-2"
          data-dismiss="alert"
          type="button"
          @click="$emit('onDeleteListItem', listItem)"
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
    listItem: {
      type: Object,
      required: true,
      validator: function(value) {
        return value.text !== undefined && value._id !== undefined;
      }
    }
  }
};
</script>
