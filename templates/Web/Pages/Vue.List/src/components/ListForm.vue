<template>
  <form class="input-group my-3" v-on:submit.prevent="$emit('onAddListItem')">
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      type="text"
      class="form-control"
      placeholder="Add text here..."
      aria-label="Add text here..."
    >
    <button type="submit" class="btn btn-primary ml-2">Submit</button>
  </form>
</template>

<script>
export default {
  name: "ListForm",
  props: {
    value: String
  }
};
</script>
