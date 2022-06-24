import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from "../../config.json";

const token = config.RAPIDAPI_KEY;
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    animes: [],
    page: 1,
    size: 9,
  },
  getters: {
    animes: state => {
      return state.animes;
  }
  },
  mutations: {
    fetchAnimes(state, newAnimes) {
      state.animes = newAnimes;
    },

  },
  actions: {
    async fetchAnimes({commit, state}) {
      await axios
      .get("https://anime-db.p.rapidapi.com/anime", {
        method: "GET",
        params: {
          page: state.page,
          size: state.size,
          //  genres: "Fantasy,Drama",
          sortBy: "ranking",
          sortOrder: "asc",
        },
        headers: {
          "X-RapidAPI-Key": `${token}`,
          "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
        },
      })
      .then((res) => commit('fetchAnimes', res.data.data)
      )
      .catch((error) => {
        console.error(error);
      });
    },
  },
  modules: {
  }
})
