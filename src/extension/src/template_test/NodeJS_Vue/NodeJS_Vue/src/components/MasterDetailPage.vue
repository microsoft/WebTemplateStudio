<template>
  <div class="col">
    <div class="row heading">
      <div class="col">
        <h3 class="ml-3 mb-4">{{textSampleData.title}}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white">
            <li class="breadcrumb-item">
              <a class="breadCrumbLink" href="#">Master Detail</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{textSampleData.title}}</li>
          </ol>
        </nav>
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
    textSampleData: Object
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
