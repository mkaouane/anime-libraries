<template>
  <div>
    <v-autocomplete
      v-model="model"
      :search-input.sync="search"
      class="my-4"
      label="Search for an anime"
    >
    </v-autocomplete>
 <v-row>
      <v-col
        v-for="anime in animes"
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
        v-model="$store.state.page"
        @input="$store.dispatch('fetchAnimes')"
        :length="9"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import CardAnime from "../components/CardAnime.vue";


export default {
  name: "HomeView",
  components: { CardAnime },
  data: () => ({
    model: "",
    search: "",
    drawer: false,
    title: "",
    page: 1,
    size: 20,
  }),
  methods: {
    toggleCard() {
      this.show = !this.show;
    },
   
    nextPage() {
      this.size = 400;
      console.log(this.page);
    },
  },
   mounted () {
        this.$store.dispatch('fetchAnimes')
    },
  computed: mapState([
        'animes'
    ]),
 

};
</script>
