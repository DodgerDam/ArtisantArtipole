<template>
  <section class="section-listing-items">
    <div class="uk-container">
      <div class="kg-listing-list-map">
        <div class="container-items-links">
          <div class="share-print-buttons">
            <a href="#" class="share">
              <svg class="icon">
                <use xlink:href="/assets/images/sprite.svg#share"></use>
              </svg>
              <span>Partager ma recherche</span>
            </a>
            <a href="#" class="print">
              <svg class="icon">
                <use xlink:href="/assets/images/sprite.svg#print"></use>
              </svg>
              <span>Imprimer ma recherche</span>
            </a>
          </div>
          <p class="result"><span>{{ nbrArtisan }}</span> résultats</p>
          <div class="switch-button">
            <button type="button" class="btn-liste" v-on:click="activeListe=true,activeMap=false,showMap=false" v-bind:class="classActiveListe"><svg class="icon"><use xlink:href="/assets/images/sprite.svg#liste"></use></svg><span>Liste</span></button>
            <button type="button" class="btn-map" v-on:click="activeMap=true,activeListe=false,showMap=true" v-bind:class="classActiveMaps"><svg class="icon"><use xlink:href="/assets/images/sprite.svg#carte"></use></svg><span>Carte</span></button>
          </div>
        </div>
          <div class="container-listing-map" v-bind:class="classObject">
            <template v-if="nbrArtisan !== 0">
              <Cards />
              <Carte :show-map="showMap"/>
            </template>
            <template v-else>
              <p>Aucun résultats </p>
            </template>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import Cards from './Cards.vue'
import Carte from "./Carte.vue";

export default {
  name: "Listing",
  components: {
    Cards,
    Carte
  },

  data () {
    return {
      showMap: false,
      activeListe: true,
      activeMap: false,
      nbr_artisans:0
    };
  },
  computed: {
    classObject: function () {
      return {
        'show-map': this.showMap,
      }
    },
    classActiveListe: function () {
      return {
        'active': this.activeListe,
      }
    },
    classActiveMaps: function () {
      return {
        'active': this.activeMap,
      }
    },
    artisans(){
        return this.$store.state.artisans
    },
    communes () {
        return this.$store.state.communes
    },
    nbrArtisan(){
      this.nbr_artisans=0
        for( let i = 0; i < this.artisans.length; i++) {
          if(this.artisans[i]['active']==1){
            this.nbr_artisans++;
          }
        }
        return this.nbr_artisans;
    }
  }
}
</script>