<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row justify-content-around">
        <div class="col-8 col-md-5">
          <h5 class="title">wts.VueDefault</h5>
          <p class="description">This is placeholder text. Your web app description goes here.</p>
        </div>
        <div class="col-2">
          <ul class="list-unstyled">
            <li>
              <a class="footerlink" href="/">Example Link</a>
            </li>
            <li>
              <a class="footerlink" href="/">Example Link</a>
            </li>
            <li>
              <a class="footerlink" href="/">Example Link</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>


<style scoped>
.footer {
  background-color: #1d1d1d;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.title {
  color: #fff;
}

.description {
  color: #fff;
}

.footerlink,
.footerlink:hover {
  color: #fff;
}
</style>
