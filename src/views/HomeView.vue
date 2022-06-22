<template>
  <div>
    <v-autocomplete
      v-model="model"
      :search-input.sync="search"
      class="my-4"
      label="Search for an anime"
    >
    </v-autocomplete>
    <v-row v-if="search">
      <v-col
        v-for="anime in filteredList"
        :key="anime._id"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <CardAnime :anime="anime" />
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="page"
        @input="nextPage()"
        :length="filteredList.length"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import config from "../../config.json";
import CardAnime from "../components/CardAnime.vue";
const token = config.RAPIDAPI_KEY;

export default {
  name: "HomeView",
  components: { CardAnime },
  data: () => ({
    model: "",
    search: "",
    drawer: false,
    animes: [],
    title: "",
    page: 1,
    size: 20,
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
            size: this.size,
            //  genres: "Fantasy,Drama",
            sortBy: "ranking",
            sortOrder: "asc",
          },
          headers: {
            "X-RapidAPI-Key": `${token}`,
            "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
          },
        })
        .then((res) => (this.animes = res.data.data))
        .catch((error) => {
          console.error(error);
        });
    },
    nextPage() {
      this.page + 1;
      this.size = 400;
      this.getAnimes();
      console.log(this.page);
    },
  },

  computed: {
    filteredList() {
      return this.animes.filter((anime) => {
        return anime.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  async mounted() {
    try {
      await axios
        .get("https://anime-db.p.rapidapi.com/anime", {
          method: "GET",
          params: {
            page: this.page,
            size: this.size,
            //  genres: "Fantasy,Drama",
            sortBy: "ranking",
            sortOrder: "asc",
          },
          headers: {
            "X-RapidAPI-Key": `${token}`,
            "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
          },
        })
        .then((res) => (this.animes = res.data.data))
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
