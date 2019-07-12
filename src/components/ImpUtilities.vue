<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-50 md-small-size-100">
      <md-card>
        <md-card-header>
          <div class="md-title">Module Properties</div>
        </md-card-header>

        <md-card-content>
          <md-tabs>
            <md-tab md-label="Required">
              <!-- TITLE -->
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-60 md-medium-size-100">
                  <md-field :class="getValidationClass('title')">
                    <label for="title-input">Title</label>

                    <md-input name="title-input" id="title-input" v-model="form.title" />

                    <md-tooltip md-direction="bottom">A human-readable title for the module.</md-tooltip>

                    <span class="md-error" v-if="!$v.form.title.required">Required field</span>
                  </md-field>
                </div>

                <!-- VERSION -->
                <div class="md-layout-item md-size-40 md-medium-size-100">
                  <md-field :class="getValidationClass('version')">
                    <label for="version-input">Version</label>

                    <md-input name="version-input" id="version-input" v-model="form.version" />

                    <md-tooltip
                      md-direction="bottom"
                    >The current version of the module. (SemVer-compliant)</md-tooltip>

                    <span class="md-error" v-if="!$v.form.version.required">Required field</span>
                  </md-field>
                </div>
              </div>

              <!-- DESCRIPTION -->
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                  <md-field :class="getValidationClass('description')">
                    <label for="description-input">Description</label>

                    <md-input
                      name="description-input"
                      id="description-input"
                      v-model="form.description"
                    />

                    <md-tooltip
                      md-direction="bottom"
                    >A succinct one-sentence description of the module and what it provides.</md-tooltip>

                    <span class="md-error" v-if="!$v.form.description.required">Required field</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <!-- CATEGORY -->
                <div class="md-layout-item md-size-60 md-medium-size-100">
                  <md-autocomplete
                    v-model="form.category"
                    :md-options="categoryOptions"
                    :class="getValidationClass('category')"
                  >
                    <label>Category</label>

                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                      <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                    </template>

                    <md-tooltip
                      md-direction="bottom"
                    >A generalized one-word label categorizing the module.</md-tooltip>

                    <span class="md-error">Required field</span>
                  </md-autocomplete>
                </div>

                <!-- COLOR -->
                <div class="md-layout-item md-size-40 md-medium-size-100">
                  <md-autocomplete
                    v-model="form.color"
                    :md-options="colorOptions"
                    :class="getValidationClass('color')"
                  >
                    <label>Color</label>

                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                      <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                    </template>

                    <md-tooltip
                      md-direction="bottom"
                    >The text component color to apply to the module's title.</md-tooltip>

                    <span class="md-error">Required field</span>
                  </md-autocomplete>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <!-- NAMESPACE -->
                <div class="md-layout-item md-size-60 md-medium-size-100">
                  <md-field :class="getValidationClass('namespace')">
                    <label for="namespace-input">Namespace</label>

                    <md-input name="namespace-input" id="namespace-input" v-model="form.namespace" />

                    <md-tooltip
                      md-direction="bottom"
                    >The primary namespace used within the datapack.</md-tooltip>

                    <span class="md-error" v-if="!$v.form.namespace.required">Required field</span>
                  </md-field>
                </div>

                <!-- SCORESPACE -->
                <div class="md-layout-item md-size-40 md-medium-size-100">
                  <md-field :class="getValidationClass('scorespace')">
                    <label for="scorespace-input">Scorespace</label>

                    <md-input
                      name="scorespace-input"
                      id="scorespace-input"
                      v-model="form.scorespace"
                    />

                    <md-tooltip
                      md-direction="bottom"
                    >A shortened version of the namespace for use with limited scoreboard objective names.</md-tooltip>

                    <span class="md-error" v-if="!$v.form.scorespace.required">Required field</span>
                    <span
                      class="md-error"
                      v-else-if="!$v.form.scorespace.maxlength"
                    >Cannot exceed 16 characters</span>
                  </md-field>
                </div>
              </div>

              <!-- AUTHOR NAME -->
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-60 md-medium-size-100">
                  <md-field :class="getValidationClass('authorName')">
                    <label for="author-name-input">Author name</label>

                    <md-input
                      name="author-name-input"
                      id="author-name-input"
                      v-model="form.authorName"
                    />

                    <md-tooltip md-direction="bottom">The name of the datapack's primary author.</md-tooltip>

                    <span class="md-error" v-if="!$v.form.authorName.required">Required field</span>
                  </md-field>
                </div>

                <!-- MINECRAFT VERSION -->
                <div class="md-layout-item md-size-40 md-medium-size-100">
                  <md-autocomplete
                    :class="getValidationClass('minecraftVersion')"
                    :md-options="minecraftVersionOptions"
                    v-model="form.minecraftVersion"
                  >
                    <label>Minecraft version</label>

                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                      <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                    </template>

                    <md-tooltip
                      md-direction="bottom"
                    >The major version of Minecraft this module is compatible with.</md-tooltip>

                    <span class="md-error">Required field</span>
                  </md-autocomplete>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <md-button class="md-primary md-layout-item" v-on:click="applyForm">Apply</md-button>
              </div>
            </md-tab>

            <md-tab md-label="Optional">
              <!-- URL -->
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                  <md-field :class="getValidationClass('url')">
                    <label for="url-input">Datapack URL/repository</label>

                    <md-input name="url-input" id="url-input" v-model="form.url" />

                    <md-tooltip md-direction="bottom">A link to the datapack's repository or readme.</md-tooltip>

                    <span class="md-error" v-if="!$v.form.url.url">Invalid URL</span>
                  </md-field>
                </div>
              </div>

              <!-- AUTHOR URL -->
              <div class="md-layout-item md-size-100">
                <md-field :class="getValidationClass('authorUrl')">
                  <label for="author-url-input">Author URL/website</label>

                  <md-input name="author-url-input" id="author-url-input" v-model="form.authorUrl" />

                  <md-tooltip md-direction="bottom">A link to the author's website or profile.</md-tooltip>

                  <span class="md-error" v-if="!$v.form.authorUrl.url">Invalid URL</span>
                </md-field>
              </div>

              <!-- SETUP FUNCTION -->
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                  <md-field :class="getValidationClass('setupFunction')">
                    <label for="setup-function-input">Setup function</label>
                    <span class="md-prefix">{{ getNamespaceText() }}:</span>
                    <md-input
                      name="setup-function-input"
                      id="setup-function-input"
                      v-model="form.setupFunction"
                    />

                    <md-tooltip
                      md-direction="bottom"
                    >The function to call when installing or reinstalling the module.</md-tooltip>

                    <span class="md-error" v-if="!$v.form.setupFunction.required">Required field</span>
                  </md-field>
                </div>
              </div>

              <!-- TEARDOWN FUNCTION -->
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                  <md-field :class="getValidationClass('teardownFunction')">
                    <label for="setup-function-input">Teardown function</label>
                    <span class="md-prefix">{{ getNamespaceText() }}:</span>
                    <md-input
                      name="setup-function-input"
                      id="setup-function-input"
                      v-model="form.teardownFunction"
                    />

                    <md-tooltip
                      md-direction="bottom"
                    >The function to call when uninstalling the module.</md-tooltip>

                    <span class="md-error" v-if="!$v.form.teardownFunction.required">Required field</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <md-button class="md-primary md-layout-item" v-on:click="applyForm">Apply</md-button>
              </div>
            </md-tab>

            <md-tab md-label="JSON">
              <md-field>
                <label for="module-json-text-input">
                  Paste the contents of
                  <code>.module.json</code> here
                </label>
                <md-textarea
                  name="module-json-text-input"
                  id="module-json-text-input"
                  v-model="moduleJsonText"
                />
              </md-field>

              <div class="md-layout md-gutter">
                <md-button class="md-accent md-layout-item" v-on:click="applyJson">
                  Import
                  <md-tooltip
                    md-direction="bottom"
                  >This will overwrite any form fields you have filled.</md-tooltip>
                </md-button>
              </div>
            </md-tab>
          </md-tabs>
        </md-card-content>
      </md-card>
    </div>

    <div class="md-layout-item md-size-50 md-small-size-100">
      <md-card>
        <md-card-header>
          <div class="md-title">Datapack Output</div>
        </md-card-header>

        <md-card-content>
          <md-tabs>
            <!-- MANAGE.MCFUNCTION -->
            <md-tab md-label="manage.mcfunction">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="manage-mcfunction-output">
                    <code>data/{{ getNamespaceText() }}/functions/.module/manage.mcfunction</code>
                  </label>
                  <md-textarea
                    name="manage-mcfunction-output"
                    id="manage-mcfunction-output"
                    v-model="manageMcfunctionText"
                  />
                </md-field>
              </div>
            </md-tab>

            <!-- MANAGE.JSON -->
            <md-tab md-label="manage.json">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="manage-json-output">
                    <code>data/imp/tags/functions/manage.json</code>
                  </label>
                  <md-textarea
                    name="manage-json-output"
                    id="manage-json-output"
                    v-model="manageJsonText"
                  />
                </md-field>
              </div>
            </md-tab>

            <!-- PACK.MCMETA -->
            <md-tab md-label="pack.mcmeta">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="pack-mcmeta-output">
                    <code>pack.mcmeta</code>
                  </label>
                  <md-textarea
                    name="pack-mcmeta-output"
                    id="pack-mcmeta-output"
                    v-model="packMcmetaText"
                  />
                </md-field>
              </div>
            </md-tab>
          </md-tabs>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, url } from "vuelidate/lib/validators";

import { DatapackModule } from "minecraft-imp-utils";

export default {
  name: "ImpUtilities",
  mixins: [validationMixin],
  data: () => ({
    categoryOptions: ["Gameplay", "Utility", "Library", "Engine"],
    colorOptions: ["aqua", "green", "yellow", "red", "light_purple"],
    minecraftVersionOptions: ["1.13", "1.14", "1.15"],
    moduleJsonText: " ",
    manageMcfunctionText: " ",
    manageJsonText: " ",
    packMcmetaText: " ",
    form: {
      title: null,
      color: null,
      description: null,
      version: null,
      minecraftVersion: null,
      category: null,
      namespace: null,
      scorespace: null,
      authorName: null,
      authorUrl: null,
      url: null,
      setupFunction: ".module/setup",
      teardownFunction: ".module/teardown"
    }
  }),
  validations: {
    form: {
      title: { required },
      color: { required },
      description: { required },
      version: { required },
      minecraftVersion: { required },
      category: { required },
      namespace: { required },
      scorespace: { required, maxLength: maxLength(16) },
      authorName: { required },
      authorUrl: { url },
      url: { url },
      setupFunction: {},
      teardownFunction: {}
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    getNamespaceText() {
      return this.form.namespace || "<namespace>";
    },
    applyForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // FIXME apply form
      }
    },
    applyJson() {
      // FIXME apply json
    }
  }
};
</script>

<style scoped lang="scss">
.md-card {
  margin: 16px !important;
}

.md-card-content {
  padding-bottom: 0 !important;
}
</style>
