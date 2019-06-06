<template>
  <div>
    <main id="mainContent" class="container-fluid">
      <div class="row">
        <div class="col-2 p-0 border-right sidebar">
          <div class="list-group list-group-flush border-bottom">
            <MasterDetailSideBarTab
              v-for="(textAssets, index) in masterDetailText"
              v-on:onDisplayTabClick="handleDisplayTabClick"
              v-bind:tabText="textAssets.title"
              v-bind:index="index"
              v-bind:key="textAssets.id"
            />
          </div>
        </div>
        <MasterDetailPage v-bind:textSampleData="masterDetailText[currentDisplayTabIndex]"/>
      </div>
    </main>
    <WarningMessage
      v-if="WarningMessageOpen"
      v-on:onWarningClose="handleWarningClose"
      v-bind:text="WarningMessageText"
    />
  </div>
</template>

<script>
import CONSTANTS from "../constants";
import MasterDetailPage from "../components/MasterDetailPage";
import MasterDetailSideBarTab from "../components/MasterDetailSideBarTab";
import WarningMessage from "../components/WarningMessage";

export default {
  name: "VueMasterDetail",

  components: {
    MasterDetailPage,
    MasterDetailSideBarTab,
    WarningMessage
  },

  data: function() {
    return {
      masterDetailText: [
        {
          paragraph: "",
          title: "",
          tabName: "",
          id: 0
        }
      ],
      currentDisplayTabIndex: 0,
      WarningMessageOpen: false,
      WarningMessageText: ""
    };
  },

  created: function() {
    this.fetchTextAssets();
  },

  methods: {
    fetchTextAssets: function() {
      fetch(CONSTANTS.ENDPOINT.MASTERDETAIL)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          this.masterDetailText = result;
        })
        .catch(error => {
          this.WarningMessageOpen = true;
          this.WarningMessageText = `${
            CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET
          } ${error}`;
        });
    },
    handleWarningClose: function() {
      this.WarningMessageOpen = false;
      this.WarningMessageText = "";
    },
    handleDisplayTabClick: function(id) {
      this.currentDisplayTabIndex = id;
    }
  }
};
</script>

<style scoped>
.sidebar {
  /* full height - footer height - navbar height */
  min-height: calc(100vh - 160px - 57px);
}
</style>
