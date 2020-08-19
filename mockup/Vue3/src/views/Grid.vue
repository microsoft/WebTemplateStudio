<template>
  <div>
    <main id="mainContent">

      <div class="container">
        <div class="row justify-content-center py-5">
          <h3>Grid</h3>
        </div>

        <div class="row justify-content-around text-center pb-5">
          <GridComponent
            v-for="textAsset in gridTextAssets"
            :key="textAsset.id"
            :header="textAsset.title"
            :description="textAsset.shortDescription"
          />
        </div>
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
import GridComponent from "@/components/GridComponent";
import BaseWarningMessage from "@/components/BaseWarningMessage";
import {onMounted, ref} from "vue";

export default {
  name: "Grid",
  components: {
    GridComponent,
    BaseWarningMessage
  },
  setup(){
    const gridTextAssets = ref([
        {
          shortDescription: "",
          title: "",
          id: 0
        }
      ]);
    const WarningMessageOpen = ref(false);
    const WarningMessageText = ref("");

    const fetchTextAssets = () => {
      fetch(CONSTANTS.ENDPOINT.GRID)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          gridTextAssets.value = result;
        })
        .catch(error => {
          WarningMessageOpen.value = true;
          WarningMessageText.value = `${CONSTANTS.ERROR_MESSAGE.GRID_GET} ${error}`;
        });
    }

    onMounted(()=>{
      fetchTextAssets();
    });
    return {gridTextAssets,WarningMessageOpen,WarningMessageText};
  }
};
</script>

<style scoped>
.header {
  background-color: #cecece;
  padding-top: 7rem;
  padding-bottom: 7rem;
}
</style>
