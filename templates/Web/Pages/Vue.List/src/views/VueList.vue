<template>
  <main class="container" id="mainContent">
    <div class="row">
      <div class="col mt-5 p-0">
        <h3>Bootstrap VueList Template</h3>
      </div>
      <div class="col-12 p-0">
        <ListForm v-on:onAddListItem="handleAddListItem" v-model="textField"/>
      </div>
      <ListItem
        v-for="listItem in list"
        v-bind:key="listItem._id"
        v-bind:listItem="listItem"
        v-on:onDeleteListItem="handleDeleteListItem"
      />
      <WarningMessage
        v-if="WarningMessageOpen"
        v-on:onWarningClose="handleWarningClose"
        v-bind:text="WarningMessageText"
      />
    </div>
  </main>
</template>

<script>
import CONSTANTS from "../constants";
import ListForm from "../components/ListForm";
import ListItem from "../components/ListItem";
import WarningMessage from "../components/WarningMessage";

export default {
  name: "VueList",

  components: {
    ListForm,
    ListItem,
    WarningMessage
  },

  data: function() {
    return {
      list: [],
      textField: "",
      WarningMessageOpen: false,
      WarningMessageText: ""
    };
  },

  created: function() {
    this.fetchTextAssets();
  },

  methods: {
    fetchTextAssets: function() {
      fetch(CONSTANTS.ENDPOINT.LIST)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => (this.list = result))
        .catch(error => {
          this.WarningMessageOpen = true;
          this.WarningMessageText = `${
            CONSTANTS.ERROR_MESSAGE.LIST_GET
          } ${error}`;
        });
    },
    handleAddListItem: function() {
      // Warning Pop Up if the user submits an empty message
      if (!this.textField) {
        this.WarningMessageOpen = true;
        this.WarningMessageText = CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE;
        return;
      }

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
          this.list.unshift(result);
          this.textField = "";
        })
        .catch(error => {
          this.WarningMessageOpen = true;
          this.WarningMessageText = `${
            CONSTANTS.ERROR_MESSAGE.LIST_ADD
          } ${error}`;
        });
    },
    handleDeleteListItem(listItem) {
      fetch(`${CONSTANTS.ENDPOINT.LIST}/${listItem._id}`, { method: "DELETE" })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          this.list = this.list.filter(item => item._id !== result._id);
        })
        .catch(error => {
          this.WarningMessageOpen = true;
          this.WarningMessageText = `${
            CONSTANTS.ERROR_MESSAGE.LIST_DELETE
          } ${error}`;
        });
    },
    handleWarningClose() {
      this.WarningMessageOpen = false;
      this.WarningMessageText = "";
    }
  }
};
</script>

