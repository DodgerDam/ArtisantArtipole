<template>

  <div class="search-container">
    <div class="uk-container">
      <div class="container-items-search">
        <div class="container-picto">
          <svg class="icon">
            <use xlink:href="/assets/images/sprite.svg#artisan"></use>
          </svg>
          <p class="title-search">Je recherche un artisan...</p>
        </div>
        <form v-on:submit.prevent="onRecherche" id="search_form" autocomplete="off">
          <div class="container-select-field">
            <label class="uk-form-label sr-only" for="metiers-search-form">Métiers</label>
            <select id="metiers-search-form" name="metiers" class="custom-select" v-model="selected_metier" autocomplete="off">
              <option value="0">Métiers</option>
              <option v-for="metier in moteurs.metiers" :value="metier.id" v-bind:key="metier.id">{{metier.label}}</option>
            </select>
          </div>
          <!--<div class="container-select-field uk-margin">
            <label class="uk-form-label sr-only" for="ville-search-form">Villes</label>
            <select id="ville-search-form" name="ville" class="custom-select" v-model="selected_ville" autocomplete="off">
              <option value="0" >Villes</option>
              <option v-for="ville in moteurs.villes"  v-bind:value="[ville.id_ville, ville.lat,ville.lng]"  v-bind:key="ville.id_ville">{{ville.label}} ({{ville.code}})</option>
            </select>
          </div>-->
          <div class="container-select-field uk-margin">
            <suggestions
              v-model="query"
              :options="options"
              :onInputChange="onCountryInputChange">
              <div slot="item" slot-scope="props" >
                <strong>{{props.item}}</strong>
              </div>
            </suggestions>
          </div>
          <div class="rayon-container">
            <label class="uk-form-label" for="ville-search-form">Dans un rayon de :</label>
            <div class="uk-flex">
              <div>
                <label class="uk-form-label sr-only" for="km-search-form-01">5 km</label>
                <button v-on:click="counter5 += 1,valueRayon(5)" type="button" class="tag-rayon-button" name="rayon" id="km-search-form-01">5 km</button>
              </div>
              <div>
                <label class="uk-form-label sr-only" for="km-search-form-02">10 km</label>
                <button v-on:click="counter10 += 1,valueRayon(10)" type="button" class="tag-rayon-button" name="rayon" id="km-search-form-02">10 km</button>
              </div>
              <div>
                <label class="uk-form-label sr-only" for="km-search-form-03">50 km</label>
                <button v-on:click="counter50 += 1,valueRayon(50)" type="button" class="tag-rayon-button" name="rayon" id="km-search-form-03">50 km</button>
              </div>
            </div>
          </div>
          <button type="submit" class="submit-search-button" aria-label="Valider votre recherche"><span class="txt-search-button">Rechercher</span><span uk-search-icon></span></button>
        </form>
      </div>
      <div class="pattern"></div>
    </div>
  </div>

</template>

<script>
import Suggestions from 'v-suggestions'

  export default {
    name: "MoteurHome",
    data() {
      return {
        ville: 0,
        lat:0,
        lng:0,
        selected_metier: 0,
        selected_ville: 0,
        rayon_de:0,
        counter5: 0,
        counter10: 0,
        counter50: 0,
        tableau_rayon:[],
        query: '',
        selectedCountry: null,
        options: {placeholder: 'Ville'}
      }
    },
    computed: {
      moteurs () {
        return this.$store.state.moteurs
      },
      communes () {
        return this.$store.state.communes
      },
      artisans(){
        return this.$store.state.artisans
      },
       isloaded(){
        return this.$store.state.isloaded
      }
    },
    components:{
      Suggestions
    },
    methods: {
      onCountryInputChange (query) {
        if (query.trim().length <= 2) {
          return null
        }
        let ville=[]

         this.$store.state.communes.features.forEach(element => {
          ville.push(element.properties.nom)
        });
                  

        // return the matching countries as an array
        return ville.filter((country) => {
          return country.toLowerCase().includes(query.toLowerCase())
        })
      },
      onCountrySelected (item) {
        this.selectedCountry = item
      },
      onSearchItemSelected (item) {
        this.selectedSearchItem = item
      },
      onRecherche() {

        if(this.selected_metier!=''){
          let ville=[]
            // on stocke les villes disponible
            if(this.query!=''){
              this.$store.state.communes.features.forEach(element => {
                if(this.query==element.properties.nom || this.query==element.properties.code ){
                  ville.push(element.geometry.coordinates[0][0][1])
                  ville.push(element.geometry.coordinates[0][0][0])
                }
              });
              window.location.href='/listing-artisan.html?metier='+this.selected_metier+'&ville='+this.query+'&rayon='+this.rayon_de+'&lat='+ville[0]+'&lng='+ville[1];
            }else{
              window.location.href='/listing-artisan.html?metier='+this.selected_metier+'&ville='+this.query+'&rayon='+this.rayon_de;
            }
        }else{
          if(this.query!=''){
              let ville=[]
              this.$store.state.communes.features.forEach(element => {
                if(this.query==element.properties.nom || this.query==element.properties.code ){
                  ville.push(element.geometry.coordinates[0][0][1])
                  ville.push(element.geometry.coordinates[0][0][0])
                }
              });
              window.location.href='/listing-artisan.html?metier='+this.selected_metier+'&ville='+this.query+'&rayon='+this.rayon_de+'&lat='+ville[0]+'&lng='+ville[1];
          }
        }
      },
      
      valueRayon(value) {
          
         if(value==5){
          if(this.counter5 % 2 != 0){
            this.tableau_rayon.push(5);
          }else{
            const index = this.tableau_rayon.indexOf(5);
            this.tableau_rayon.splice(index, 1)
          }
        }else if(value==10){
          if(this.counter10 % 2 != 0){
            this.tableau_rayon.push(10);
          }else{
            const index = this.tableau_rayon.indexOf(10);
            this.tableau_rayon.splice(index, 1)
          }
        }else if(value==50){
          if(this.counter50 % 2 != 0){
            this.tableau_rayon.push(50);
          }else{
            const index = this.tableau_rayon.indexOf(50);
            this.tableau_rayon.splice(index, 1)
          }
        }
        
        let last_input=''
        for( let i = 0; i < this.tableau_rayon.length; i++) {
            if(this.rayon_de=''){
              last_input=this.tableau_rayon[i]
            }
            if( last_input<=this.tableau_rayon[i]){
               last_input=this.tableau_rayon[i]
            }
        }
        this.rayon_de=last_input
      },

    }
  }
</script>

