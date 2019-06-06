<template>
  <div>
    <main id="mainContent">
      <div class="text-center header">
        <h1>Param_ProjectName</h1>
        <p>This is placeholder text. Your web app description goes here.</p>
        <a
          href="https://github.com/Microsoft/WebTemplateStudio"
          class="btn btn-primary my-2"
        >Link to our Github</a>
      </div>

      <div class="container">
        <div class="row justify-content-center py-5">
          <h1>Bootstrap VueGrid Template</h1>
        </div>

        <div class="row justify-content-around text-center pb-5">
          <GridComponent
            v-for="textAsset in gridTextAssets"
            v-bind:key="textAsset.id"
            v-bind:header="textAsset.title"
            v-bind:description="textAsset.shortDescription"
          />
        </div>
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
import GridComponent from "../components/GridComponent";
import WarningMessage from "../components/WarningMessage";

export default {
  name: "VueGrid",

  components: {
    GridComponent,
    WarningMessage
  },

  data: function() {
    return {
      gridTextAssets: [
        {
          description: "",
          header: "",
          id: 0
        }
      ],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };
  },

  created: function() {
    this.fetchTextAssets();
  },

  methods: {
    fetchTextAssets: function() {
      fetch(CONSTANTS.ENDPOINT.GRID)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          this.gridTextAssets = result;
        })
        .catch(error => {
          this.WarningMessageOpen = true;
          this.WarningMessageText = `${
            CONSTANTS.ERROR_MESSAGE.GRID_GET
          } ${error}`;
        });
    },
    handleWarningClose: function() {
      this.WarningMessageOpen = false;
      this.WarningMessageText = "";
    }
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
