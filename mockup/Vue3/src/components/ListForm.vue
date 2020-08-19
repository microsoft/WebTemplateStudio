<template>
  <form class="input-group my-3" @submit.prevent="addListItem">
    <div class="col-11">
      <input
        :value="value"
        aria-label="Add text here..."
        class="form-control"
        placeholder="Add text here..."
        type="text"
        @input="onInput($event.target.value)"
      />
      <b-alert :show="!isValid" variant="danger" dismissible>{{emptyError}}</b-alert>
    </div>
    <span class="input-group-btn col-1">
      <button :disabled="isSubmitable" class="btn btn-primary" type="submit">Submit</button>
    </span>
  </form>
</template>

<script>
import CONSTANTS from "@/constants";
import { ref } from 'vue';

export default {
  name: "ListForm",
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup(){
    const isValid = ref(true);
    const isSubmitable = ref(false);
    const emptyError = CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE;

    const addListItem = ()=>{
      isValid.value = true;
      isSubmitable.value = false;
    };
    const onInput = (val) =>{
      isValid.value = isSubmitable.value = val.length > 0;
    }
    return {isValid, isSubmitable, emptyError, addListItem, onInput};
  }
};
</script>

<style scoped>
.col-11 {
  padding-left: 0px;
  padding-right: 0px;
}
</style>