<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item"></div>
    <div class="content-column">
      <h1>This is an about page</h1>
    </div>
    <div class="md-layout-item"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class About extends Vue {}
</script>
