<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <nav>
        <router-link :to="{ name: 'home' }">Home</router-link> |
        <router-link :to="{ name: 'about' }">Card</router-link>
      </nav>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Anime Library</v-toolbar-title>

    
            <v-spacer></v-spacer>

      <v-switch v-model="$vuetify.theme.dark" inset persistent-hint></v-switch>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      drawer: false,
      isLoading: false,
    };
  },
};
</script>

<style>
</style>