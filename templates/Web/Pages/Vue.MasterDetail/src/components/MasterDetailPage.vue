<template>
  <div class="col">
    <div class="row heading">
      <div class="col">
        <h3 class="ml-3 mb-4">{{sampleOrder.title}}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 col-12 ml-3 mb-5 mt-3">
        <p class="title">Status</p>
        <p>{{sampleOrder.status}}</p>
        <p class="title">Order Date</p>
        <p>{{sampleOrder.orderDate}}</p>
        <p class="title">Ship To</p>
        <p>{{sampleOrder.shipTo}}</p>
        <p class="title">Order Total</p>
        <p>{{sampleOrder.orderTotal}}</p>
        <p class="title">Description</p>
        <p>{{sampleOrder.longDescription}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MasterDetailPage",
  props: {
    sampleOrder: {
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

.heading {
  background-color: #cecece;
  padding-top: 18em;
}
</style>
