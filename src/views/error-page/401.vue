<template>
  <div class="error-page">
    <div class="error-content">
      <div class="text-h1 text-grey-5">401</div>
      <div class="text-h5 q-mb-md">권한이 없습니다</div>
      <q-btn unelevated color="primary" label="홈으로" :to="'/'" />
    </div>
  </div>
</template>

<style scoped>
.error-page { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
.error-content { text-align: center; }
</style>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
