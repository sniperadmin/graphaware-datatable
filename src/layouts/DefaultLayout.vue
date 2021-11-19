<template>
  <v-app>
    <v-app-bar app color="indigo lighten-1" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
      </div>

      <v-spacer></v-spacer>

      <h3>Reusable data table</h3>

      <template v-slot:extension>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              color="cyan accent-4"
              bottom
              left
              absolute
              v-bind="attrs"
              v-on="on"
              @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            >
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-btn>
          </template>
          <span>Toggle light / dark theme</span>
        </v-tooltip>
      </template>
    </v-app-bar>

    <v-main>
      <keep-alive>
        <slot />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "DefaultLayout",
  });
</script>

<style scoped>

</style>
