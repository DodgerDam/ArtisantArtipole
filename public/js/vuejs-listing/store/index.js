import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'Axios'

Vue.use(Vuex)

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );

export default new Vuex.Store({
  state: {
    artisans: {},
    moteurs: {},
    communes:{},
    isloaded: false,
    bounce_id: null,
  },
  actions: {
    GET_DATAS: function ({ commit}) {
      axios
        .get("assets/json/datas.json")
        .then(response => {
          let mydatas = response.data.items
          commit('SET_ARTISANS', mydatas)
          commit('SET_MOTEUR', response.data.moteur)
          commit('SET_ISLOADED', true)
        })
    },
    GET_COMMUNE: function ({ commit}) {
      axios
        .get("assets/json/commune.json")
        .then(responses => {
          commit('SET_COMMUNE', responses.data)
          commit('SET_ISLOADED', true)
        })
    },
    resetArtisan: function ({ commit, state}) {
      const reset = state.defaultArtisans
      commit('SET_ARTISANS', reset)
    },
  },
  mutations: {
    SET_ARTISANS: (state, payload) => {
      state.artisans = payload
    },
    SET_MOTEUR: (state, payload) => {
      state.moteurs = payload
    },
    SET_COMMUNE: (state, payload) => {
      state.communes = payload
    },
    SET_ISLOADED: (state, payload) => {
      state.isloaded = payload
    },
    setBounceId(state, payload) {
      state.bounce_id = payload
    }
  },
  getters: {
    getFilteredArtisans: state =>Object.filter(state.artisans, d => d.active === 1),
  }
})