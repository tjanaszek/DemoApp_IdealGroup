<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1 class="hidden-xs-only">Documents</h1>

      <v-spacer></v-spacer>

      <v-btn
        router-link to="/"
        text
      >
        <span class="mr-2">Home</span>
        <v-icon></v-icon>
      </v-btn>
      <v-btn
        router-link :to="{name: 'RecycleBin'}"
        text
      >
        <span class="mr-2">Recycle Bin</span>
        <v-icon></v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
