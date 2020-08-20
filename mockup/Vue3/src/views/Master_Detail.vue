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
      @onwarningclose="handleWarningClose"
    />
  </div>
</template>

<script>
import CONSTANTS from "@/constants";
import MasterDetailPage from "@/components/MasterDetailPage";
import MasterDetailList from "@/components/MasterDetailList";
import BaseWarningMessage from "@/components/BaseWarningMessage";
import { ref, onMounted} from "vue";
import mitt from "mitt";

export default {
  name: "Master_Detail",
  components: {
    MasterDetailPage,
    MasterDetailList,
    BaseWarningMessage
  },
  setup(){
    const sampleOrders = ref([]);
    const currentSampleOrder = ref({});
    const WarningMessageOpen = ref(false);
    const WarningMessageText = ref("");
    const fetchTextAssets = () => {
      fetch(CONSTANTS.ENDPOINT.MASTERDETAIL)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(listSampleOrders => {
          sampleOrders.value = listSampleOrders;
          currentSampleOrder.value = listSampleOrders[0];
        })
        .catch(error => {
          WarningMessageOpen.value = true;
          WarningMessageText.value = `${CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET} ${error}`;
        });
    }
    const handleWarningClose = () => {
      WarningMessageOpen.value = false;
      WarningMessageText.value = "";
    }
    const selectSampleOrder = (sampleOrder) => {
      currentSampleOrder.value = sampleOrder;
    }

    onMounted(()=> fetchTextAssets());

    const eventBus = mitt();
    eventBus.on('selectsampleorder', selectSampleOrder)

    return {sampleOrders, currentSampleOrder, WarningMessageOpen, WarningMessageText, handleWarningClose};
  }
};
</script>

<style scoped>
.sidebar {
  /* full height - footer height - navbar height */
  min-height: calc(100vh - 160px - 57px);
}
</style>
