<template>
  <div>
    <main id="mainContent" class="container-fluid">
      <div class="row">
        <div class="col-2 p-0 border-right sidebar">
          <div class="list-group list-group-flush border-bottom">
            <MasterDetailList
              v-for="(sampleOrder) in sampleOrders"
              :key="sampleOrder.id"
              :sampleOrder="sampleOrder"
              @selectSampleOrder="selectSampleOrder"
              :isActive="sampleOrder === currentSampleOrder"
            />
          </div>
        </div>
        <MasterDetailPage v-if="currentSampleOrder.id" :sampleOrder="currentSampleOrder" />
      </div>
    </main>
    <BaseWarningMessage
      v-if="WarningMessageOpen"
      :text="WarningMessageText"
      @onWarningClose="handleWarningClose"
    />
  </div>
</template>

<script>
import CONSTANTS from "@/constants";
import MasterDetailPage from "@/components/MasterDetailPage";
import MasterDetailList from "@/components/MasterDetailList";
import BaseWarningMessage from "@/components/BaseWarningMessage";

export default {
  name: "Master_Detail",

  components: {
    MasterDetailPage,
    MasterDetailList,
    BaseWarningMessage
  },

  data() {
    return {
      sampleOrders: [],
      currentSampleOrder: {},
      WarningMessageOpen: false,
      WarningMessageText: ""
    };
  },

  created() {
    this.fetchTextAssets();
  },

  methods: {
    fetchTextAssets() {
      fetch(CONSTANTS.ENDPOINT.MASTERDETAIL)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(listSampleOrders => {
          this.sampleOrders = listSampleOrders;
          this.currentSampleOrder = listSampleOrders[0];
        })
        .catch(error => {
          this.WarningMessageOpen = true;
          this.WarningMessageText = `${CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET} ${error}`;
        });
    },
    handleWarningClose() {
      this.WarningMessageOpen = false;
      this.WarningMessageText = "";
    },
    selectSampleOrder(sampleOrder) {
      this.currentSampleOrder = sampleOrder;
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
