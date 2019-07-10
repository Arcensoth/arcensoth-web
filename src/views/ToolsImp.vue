<template>
  <div class="tool-container">
    <ImpUtilities />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ImpUtilities from "@/components/ImpUtilities.vue";

@Component({
  components: {
    ImpUtilities
  }
})
export default class ToolsImp extends Vue {}
</script>
