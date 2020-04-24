<template>
  <main class="container" id="mainContent">
    <div class="row">
      <div class="col mt-5 p-0">
        <h3>Bootstrap List Template</h3>
      </div>
      <div class="col-12 p-0">
        <ListForm v-model="textField" @addListItem="addListItem" />
      </div>
      <ListItem
        v-for="listItem in listItems"
        :key="listItem._id"
        :listItem="listItem"
        @deleteListItem="deleteListItem"
      />
      <BaseWarningMessage
        v-if="WarningMessageOpen"
        :text="WarningMessageText"
        @onWarningClose="handleWarningClose"
      />
    </div>
  </main>
</template>

<script>
import CONSTANTS from "@/constants";
import ListForm from "@/components/ListForm";
import ListItem from "@/components/ListItem";
import BaseWarningMessage from "@/components/BaseWarningMessage";

export default {
  name: "VueList",

  components: {
    ListForm,
    ListItem,
    BaseWarningMessage
  },

  data() {
    return {
      listItems: [],
      textField: "",
      WarningMessageOpen: false,
      WarningMessageText: ""
    };
  },

  created() {
    this.loadListItem();
  },

  methods: {
    loadListItem() {
      fetch(CONSTANTS.ENDPOINT.LIST)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => (this.listItems = result))
        .catch(error => {
          this.WarningMessageOpen = true;
          this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`;
        });
    },
    addListItem() {
      fetch(CONSTANTS.ENDPOINT.LIST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: this.textField
        })
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          this.listItems.unshift(result);
          this.textField = "";
        })
        .catch(error => {
          this.WarningMessageOpen = true;
          this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`;
        });
    },
    deleteListItem(listItem) {
      fetch(`${CONSTANTS.ENDPOINT.LIST}/${listItem._id}`, { method: "DELETE" })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          this.listItems = this.listItems.filter(item => item._id !== result._id);
        })
        .catch(error => {
          this.WarningMessageOpen = true;
          this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`;
        });
    },
    handleWarningClose() {
      this.WarningMessageOpen = false;
      this.WarningMessageText = "";
    }
  }
};
</script>

