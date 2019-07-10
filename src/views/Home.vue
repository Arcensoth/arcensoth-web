<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item"></div>
    <div class="content-column">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
      <div style="height: 4000px;"></div>
    </div>
    <div class="md-layout-item"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
