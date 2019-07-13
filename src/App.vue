<template>
  <div class="page-container">
    <link
      rel="stylesheet"
      href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <md-app md-mode="fixed">
      <md-app-toolbar class="md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <div style="padding-right: 8px;">
              <md-avatar>
                <img src="./assets/arcensoth-256.png" alt="Arcensoth" />
              </md-avatar>
            </div>

            <h3 class="md-title">Arcenstuff</h3>

            <md-tabs class="md-primary" md-sync-route>
              <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
              <md-tab id="tab-about" md-label="About" to="/about"></md-tab>
              <md-tab id="tab-projects" md-label="Projects" to="/projects"></md-tab>
              <md-tab id="tab-tools" md-label="Tools" to="/tools"></md-tab>
            </md-tabs>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" href="https://github.com/Arcensoth">
              <md-icon class="fa fa-github-alt"></md-icon>
              <md-tooltip md-direction="bottom">GitHub</md-tooltip>
            </md-button>
            <md-button class="md-icon-button" href="https://twitter.com/Arcensoth">
              <md-icon class="fa fa-twitter"></md-icon>
              <md-tooltip md-direction="bottom">Twitter</md-tooltip>
            </md-button>
            <md-button class="md-icon-button" href="https://www.reddit.com/user/Arcensoth/">
              <md-icon class="fa fa-reddit-alien"></md-icon>
              <md-tooltip md-direction="bottom">Reddit</md-tooltip>
            </md-button>
          </div>
        </div>

        <div v-show="showToolsSubmenu()" class="md-toolbar-row">
          <md-tabs class="md-primary" md-sync-route>
            <md-tab id="tab-tools-imp" md-label="IMP Utilities" to="/tools/imp"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import router from "./router";

@Component
export default class App extends Vue {
  private showToolsSubmenu(): boolean {
    return (
      router.currentRoute.path === "/tools" ||
      router.currentRoute.path.startsWith("/tools/")
    );
  }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine";

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(teal, 500),
    accent: md-get-palette-color(orange, 900)
  )
);

@import "~vue-material/dist/theme/all";

.page-container {
  height: 100vh;
}

.md-app {
  height: 100%;
}

.md-content {
  padding: 0 !important;
  border: 0 !important;
}

.content-column {
  width: 960px !important;
  padding: 16px;
  height: 100%;
}

.tool-container {
  height: 100%;
}

.md-empty-state {
  margin: 120px;
}

.height-100 {
  height: 100%;
}

.padding-16 {
  padding: 16px;
}
</style>
