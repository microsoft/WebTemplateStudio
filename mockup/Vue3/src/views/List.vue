<template>
  <main class="container" id="mainContent">
    <div class="row justify-content-center py-5">
      <h3>List</h3>
    </div>
    <div class="row">
      <div class="col-12 p-0">
        <ListForm v-model="textField" @addlistitem="addlistitem" />
      </div>
      <ListItem
        v-for="listItem in listItems"
        :key="listItem.id"
        :listItem="listItem"
        @deletelistitem="deletelistitem"
      />
      <BaseWarningMessage
        v-if="WarningMessageOpen"
        :text="WarningMessageText"
        @onwarningclose="handleWarningClose"
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
  name: "List",
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
    addlistitem() {
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
    deletelistitem(listItem) {
      fetch(`${CONSTANTS.ENDPOINT.LIST}/${listItem.id}`, { method: "DELETE" })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          this.listItems = this.listItems.filter(item => item.id !== result.id);
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

