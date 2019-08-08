<template>
  <form class="input-group my-3" @submit.prevent="$emit('onAddListItem')">
    <div class="col-11">
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        type="text"
        class="form-control"
        placeholder="Add text here..."
        aria-label="Add text here..."
      />
      <b-alert
        variant="danger"
        :show="!this.isValid"
        dismissible
      >Input must be at least 1 character long.</b-alert>
    </div>
    <span class="nput-group-btn col-1">
      <button type="submit" class="btn btn-primary" :disabled="!this.isSubmitable">Submit</button>
    </span>
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
  },

  data() {
    return {
      isValid: true,
      isSubmitable: false
    };
  },

  created() {
    this.$on("input", val => {
      this.isValid = this.isSubmitable = val.length > 0;
    });
    this.$on("onAddListItem", () => {
      this.isValid = true;
      this.isSubmitable = false;
    });
  }
};
</script>

<style scoped>
.col-11 {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
