<template>
  <form class="input-group my-3" @submit.prevent="$emit('onAddListItem')">
    <div class="col-11">
      <input
        :value="value"
        aria-label="Add text here..."
        class="form-control"
        placeholder="Add text here..."
        type="text"
        @input="$emit('input', $event.target.value)"
      />
      <b-alert :show="!this.isValid" variant="danger" dismissible>{{this.emptyError}}</b-alert>
    </div>
    <span class="input-group-btn col-1">
      <button :disabled="!this.isSubmitable" class="btn btn-primary" type="submit">Submit</button>
    </span>
  </form>
</template>

<script>
import CONSTANTS from "@/constants";
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
      isSubmitable: false,
      emptyError: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE
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
