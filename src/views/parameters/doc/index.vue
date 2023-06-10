<template>
  <div class="iframe">
    <iframe
      class="network_show"
      name="content_frame"
      src="http://139.198.104.58:8209/swagger-ui.html"
    ></iframe>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.network_show {
  height: 700px;
  width: 100%;
}
</style>
