<template>

  <v-row>
    <div>salut</div>
    <v-col
      v-for="anime in animes"
      :key="anime.title"
      cols="12"
      sm="12"
      md="6"
      lg="4"
    >
      <CardAnime :anime="anime" />
    </v-col>
    <div class="text-center">
      <v-pagination
        v-model="page"
        @input="nextPage()"
        :length="animes.length"
        circle
      ></v-pagination>
    </div>
  </v-row>

</template>

<script>
import axios from "axios";
import CardAnime from "../components/CardAnime.vue";



export default {
  components : {CardAnime},
  data: () => ({
    drawer: false,
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
        })
        .then((res) => (this.animes = res.data.data))
        .catch((error) => {
          console.error(error);
        });
    },
    nextPage() {
      this.page + 1;
      this.getAnimes();
      console.log(this.page);
    },
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