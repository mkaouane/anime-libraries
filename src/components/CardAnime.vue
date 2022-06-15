<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="anime.image" height="200px"></v-img>

    <v-card-title>{{ anime.title }} </v-card-title>

    <v-card-subtitle> {{ anime.alternativeTitles[0] }}</v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" target="_blank" :href="anime.link" text>
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ anime.synopsis }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: ["anime"],
  data() {
    return {
      show: false,
    };
  },
};
</script>

