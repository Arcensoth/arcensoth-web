<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item"></div>
    <div class="content-column">
      <md-empty-state
        md-icon="home"
        md-label="Under construction"
        md-description="There is nothing to show here right now. Check back later!"
      />
    </div>
    <div class="md-layout-item"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
