<template>
  <form class="input-group my-3" @submit.prevent="$emit('onAddListItem')">
    <input
      :value="value"
      aria-label="Add text here..."
      class="form-control"
      placeholder="Add text here..."
      type="text"
      @input="$emit('input', $event.target.value)"
    />
    <button type="submit" class="btn btn-primary ml-2">Submit</button>
  </form>
</template>

<script>
export default {
  name: "ListForm",
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>
