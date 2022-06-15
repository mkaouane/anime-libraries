<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Anime Library</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch v-model="$vuetify.theme.dark" inset persistent-hint></v-switch>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="anime in animes"
            :key="anime.title"
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <CardAnime
              :title="anime.title"
              :image="anime.image"
              :synopsis="anime.synopsis"
              :link="anime.link"
              :type="anime.type"
              :alternativeTitles="anime.alternativeTitles[0]"
            />
          </v-col>
        </v-row>
        <div class="text-center">
          <v-pagination v-model="page" @input="nextPage()" :length="animes.length" circle></v-pagination>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import CardAnime from "./CardAnime.vue";
import config from "../../config.json";

const token = config.RAPIDAPI_KEY;



export default {
  components: { CardAnime },
  data: () => ({
    drawer: false,
    animes: [],
    title: "",
    page: 1,
  }),
  methods: {
    toggleCard() {
      this.show = !this.show;
    },
    async getAnimes() {
      await axios
        .get("https://anime-db.p.rapidapi.com/anime", {
          method: "GET",
          params: {
            page: this.page,
            size: "9",
            //  genres: "Fantasy,Drama",
            sortBy: "ranking",
            sortOrder: "asc",
          },
          headers: {
            "X-RapidAPI-Key": `${token}`,
            "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
          },
        }).then(res => this.animes = res.data.data)
        .catch((error) => {
          console.error(error);
        });
    },
      nextPage() {
      this.page + 1;
      this.getAnimes()
      console.log(this.page)
    }
  },
  async mounted() {
    try {
      await axios
        .get("https://anime-db.p.rapidapi.com/anime", {
          method: "GET",
          params: {
            page: this.page,
            size: "9",
            //  genres: "Fantasy,Drama",
            sortBy: "ranking",
            sortOrder: "asc",
          },
          headers: {
            "X-RapidAPI-Key": `${token}`,
            "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
          },
        }).then(res => this.animes = res.data.data)
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>