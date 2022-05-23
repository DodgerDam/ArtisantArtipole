<template>
  <div>
    <template v-if="isHome === 'true'">
    <MoteurHome />
    </template>
    <template v-else>
      <Moteur />
      <Listing />
    </template>
  </div>
</template> 

<script>
import Listing from './components/Listing.vue'
import Moteur from "./components/Moteur.vue";
import MoteurHome from "./components/MoteurHome.vue";

export default {
  name: 'App',
  components: {
   Listing,
   Moteur,
   MoteurHome
  },
  data(){
    return{
      isHome: 1
    }
  },
  beforeMount() {
    this.isHome = document.getElementById("app").getAttribute("data-home")
  },
  mounted() {
    this.$store.dispatch('GET_DATAS')
    this.$store.dispatch('GET_COMMUNE')
  },
}

</script>