export default {
    name: "Cards",
    computed: {
      filteredArtisans () {
        return this.$store.getters.getFilteredArtisans
      }
    },
    methods: {
      onmouseenter(id) {
        this.$store.commit('setBounceId', id)
      }
    }
  }