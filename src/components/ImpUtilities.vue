<template>
  <div class="md-layout height-100">
    <div class="padding-16 md-layout-item md-size-50 md-small-size-100">
      <div class="md-title">Module Properties</div>

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

                <md-tooltip md-direction="bottom">The primary namespace used within the datapack.</md-tooltip>

                <span class="md-error" v-if="!$v.form.namespace.required">Required field</span>
              </md-field>
            </div>

            <!-- SCORESPACE -->
            <div class="md-layout-item md-size-40 md-medium-size-100">
              <md-field :class="getValidationClass('scorespace')">
                <label for="scorespace-input">Scorespace</label>

                <md-input name="scorespace-input" id="scorespace-input" v-model="form.scorespace" />

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
            <!-- RESET -->
            <div>
              <md-button class="md-raised md-layout-item" v-on:click="resetForm">Reset</md-button>
              <md-tooltip md-direction="bottom">Clear the form and start fresh.</md-tooltip>
            </div>

            <!-- EXAMPLE -->
            <div>
              <md-button class="md-raised md-layout-item" v-on:click="exampleForm">Example</md-button>
              <md-tooltip md-direction="bottom">Fill the form with example data.</md-tooltip>
            </div>

            <div style="flex: auto;"></div>

            <!-- APPLY -->
            <div>
              <md-button class="md-raised md-primary md-layout-item" v-on:click="applyForm">Apply</md-button>
            </div>
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

                <md-tooltip md-direction="bottom">The function to call when uninstalling the module.</md-tooltip>

                <span class="md-error" v-if="!$v.form.teardownFunction.required">Required field</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <!-- RESET -->
            <div>
              <md-button class="md-raised md-layout-item" v-on:click="resetForm">Reset</md-button>
              <md-tooltip md-direction="bottom">Clear the form and start fresh.</md-tooltip>
            </div>

            <!-- EXAMPLE -->
            <div>
              <md-button class="md-raised md-layout-item" v-on:click="exampleForm">Example</md-button>
              <md-tooltip md-direction="bottom">Fill the form with example data.</md-tooltip>
            </div>

            <div style="flex: auto;"></div>

            <!-- APPLY -->
            <div>
              <md-button class="md-raised md-primary md-layout-item" v-on:click="applyForm">Apply</md-button>
            </div>
          </div>
        </md-tab>

        <md-tab md-label="JSON">
          <md-field :class="getModuleJsonTextInputClass()">
            <label for="module-json-text-input">
              Paste the contents of
              <code>.module.json</code> here
            </label>
            <md-textarea
              name="module-json-text-input"
              id="module-json-text-input"
              v-model="moduleJsonText"
            />
            <span class="md-error">Invalid module definition</span>
          </md-field>

          <div class="md-layout md-gutter">
            <!-- RESET -->
            <div>
              <md-button class="md-raised md-layout-item" v-on:click="resetForm">Reset</md-button>
              <md-tooltip md-direction="bottom">Clear the form and start fresh.</md-tooltip>
            </div>

            <!-- EXAMPLE -->
            <div>
              <md-button class="md-raised md-layout-item" v-on:click="exampleForm">Example</md-button>
              <md-tooltip md-direction="bottom">Fill the form with example data.</md-tooltip>
            </div>

            <div style="flex: auto;"></div>

            <!-- IMPORT -->
            <div>
              <md-button class="md-raised md-accent md-layout-item" v-on:click="applyJson">
                Import
                <md-tooltip
                  md-direction="bottom"
                >This will overwrite any form fields you have filled.</md-tooltip>
              </md-button>
            </div>
          </div>
        </md-tab>
      </md-tabs>
    </div>

    <div class="padding-16 md-layout-item md-size-50 md-small-size-100">
      <div class="md-title">Datapack Output</div>

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
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, url } from "vuelidate/lib/validators";

import {
  DatapackModule,
  makePackMcMeta,
  makeManagementFunction,
  makeManagementTag
} from "minecraft-imp-utils";

export default {
  name: "ImpUtilities",
  mixins: [validationMixin],
  data: () => ({
    categoryOptions: ["Gameplay", "Utility", "Library", "Engine"],
    colorOptions: ["aqua", "green", "yellow", "red", "light_purple"],
    minecraftVersionOptions: ["1.13", "1.14", "1.15"],
    datapackModule: null,
    isModuleJsonValid: true,
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
      setupFunction: null,
      teardownFunction: null
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

    getModuleJsonTextInputClass() {
      return {
        "md-invalid": !this.isModuleJsonValid
      };
    },

    resetOutput() {
      this.datapackModule = null;
      this.isModuleJsonValid = true;
      this.packMcmetaText = " ";
      this.manageMcfunctionText = " ";
      this.manageJsonText = " ";
    },

    updateOutput() {
      this.packMcmetaText = makePackMcMeta(this.datapackModule);
      this.manageMcfunctionText = makeManagementFunction(this.datapackModule);
      this.manageJsonText = makeManagementTag(this.datapackModule);
    },

    getNamespaceText() {
      return this.form.namespace || "<namespace>";
    },

    resetForm() {
      this.form.title = null;
      this.form.color = null;
      this.form.description = null;
      this.form.version = null;
      this.form.minecraftVersion = null;
      this.form.category = null;
      this.form.namespace = null;
      this.form.scorespace = null;
      this.form.authorName = null;
      this.form.authorUrl = null;
      this.form.url = null;
      this.form.setupFunction = null;
      this.form.teardownFunction = null;

      this.$v.$reset();

      this.moduleJsonText = " ";

      this.resetOutput();
    },

    exampleForm() {
      this.form.title = "IMP";
      this.form.color = "light_purple";
      this.form.description = "IMP core engine and module manager.";
      this.form.version = "0.1.0";
      this.form.minecraftVersion = "1.14";
      this.form.category = "Engine";
      this.form.namespace = "imp";
      this.form.scorespace = "imp";
      this.form.authorName = "Arcensoth";
      this.form.authorUrl = "https://github.com/Arcensoth";
      this.form.url = "https://github.com/Arcensoth/imp-datapack";
      this.form.setupFunction = ".module/setup";
      this.form.teardownFunction = ".module/teardown";

      this.applyForm();
    },

    applyForm() {
      this.resetOutput();

      this.$v.$touch();

      if (!this.$v.$invalid) {
        // TODO form support for multiple authors
        const authors = [
          { name: this.form.authorName, url: this.form.authorUrl || null }
        ];

        // TODO form support for dependencies
        const dependencies = [];

        // TODO form support for custom manage function
        const manageFunction = ".module/manage";

        const dpm = new DatapackModule(
          this.form.title,
          this.form.color,
          this.form.description,
          this.form.version,
          this.form.minecraftVersion,
          this.form.category,
          this.form.namespace,
          this.form.scorespace,
          authors,
          dependencies,
          this.form.url,
          manageFunction,
          this.form.setupFunction,
          this.form.teardownFunction
        );

        this.moduleJsonText = JSON.stringify(dpm.toObject(), null, 2);

        this.datapackModule = dpm;

        this.updateOutput();
      }
    },

    applyJson() {
      this.resetOutput();

      try {
        const dpm = DatapackModule.fromObject(JSON.parse(this.moduleJsonText));

        this.form.title = dpm.title;
        this.form.color = dpm.color;
        this.form.description = dpm.description;
        this.form.version = dpm.version;
        this.form.minecraftVersion = dpm.minecraftVersion;
        this.form.category = dpm.category;
        this.form.namespace = dpm.namespace;
        this.form.scorespace = dpm.scorespace;
        this.form.authorName = dpm.authors[0].name;
        this.form.authorUrl = dpm.authors[0].url;
        this.form.url = dpm.url;
        this.form.setupFunction = dpm.setupFunction;
        this.form.teardownFunction = dpm.teardownFunction;

        this.datapackModule = dpm;

        this.updateOutput();
      } catch {
        this.isModuleJsonValid = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.md-title {
  margin: 8px !important;
}

// bunch of hacks to get around vue-material's many proplems

textarea {
  max-height: 600px !important;
  height: 600px !important;
  resize: none;
  font-family: "Roboto Mono", monospace !important;
  font-size: small !important;
}

// .md-textarea {
//   max-height: 600px !important;
// }

// div.md-content.md-tabs-content.md-theme-default {
//   height: 100% !important;
//   max-height: 100% !important;
// }
</style>
