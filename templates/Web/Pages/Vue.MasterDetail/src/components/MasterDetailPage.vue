<template>
  <div class="col">
    <div class="row heading">
      <div class="col">
        <h3 class="ml-3 mb-4">{{textSampleData.title}}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <b-breadcrumb class="bg-white">
          <b-breadcrumb-item href="#">Master Detail</b-breadcrumb-item>
          <b-breadcrumb-item active>{{textSampleData.title}}</b-breadcrumb-item>
        </b-breadcrumb>
      </div>
      <div class="col-md-8 col-12 ml-3 mb-5">
        <p class="title">Status</p>
        <p>{{textSampleData.status}}</p>
        <p class="title">Order Date</p>
        <p>{{textSampleData.orderDate}}</p>
        <p class="title">Ship To</p>
        <p>{{textSampleData.shipTo}}</p>
        <p class="title">Order Total</p>
        <p>{{textSampleData.orderTotal}}</p>
        <p class="title">Description</p>
        <p>{{textSampleData.longDescription}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MasterDetailPage",
  props: {
    textSampleData: {
      type: Object,
      required: true,
      validator: function(value) {
        return (
          value.id !== undefined &&
          value.longDescription !== undefined &&
          value.orderDate !== undefined &&
          value.orderTotal !== undefined &&
          value.shipTo !== undefined &&
          value.status !== undefined &&
          value.title !== undefined
        );
      }
    }
  }
};
</script>

<style scoped>
.title {
  font-weight: 700;
  margin-bottom: 0;
}

.breadCrumbLink {
  color: #025fce;
}

.heading {
  background-color: #cecece;
  padding-top: 18em;
}
</style>
