<template>
  <div class="container-listing-items">
    <ul class="listing-items" >
      <li v-for="data in filteredArtisans" v-bind:key="data.id">
        <div class="card-artisan">
          <button class="poptomap" :title="data.title" data-id="marker_1"  @mouseleave="onmouseenter(null)" @mouseover="onmouseenter(data.id)">
            <figure>
              <img :data-src="data.photo" width="390" height="170" alt="" uk-img />
            </figure>

            <div class="content-card">
              <h2>{{data.title}}</h2>
              <ul class="competences" v-for="comp in data.specialite" v-bind:key="comp.id" >
                <li v-for="com in comp" v-bind:key="com.id"> 
                  {{com.label}}
                </li>
              </ul>
              <div class="container-adresse">
                <svg class="icon">
                  <use xlink:href="/assets/images/sprite.svg#carte"></use>
                </svg>
                <div class="adresse" v-for="info in data.info_adresse" v-bind:key="info.id">
                  <p>{{info.adresse}}<br>{{info.code}} <span>{{info.ville}}</span></p>
                </div>
              </div>
              <ul class="share-buttons">
                <li>
                  <a :href="'mailto:' + data.email" uk-tooltip="Contacter par email">
                    <svg class="icon">
                      <use xlink:href="/assets/images/sprite.svg#fiche-mail"></use>
                    </svg>
                  </a>
                </li>
                <li>
                  <a :href="'tel:+33' + data.phone" uk-tooltip="Contacter par Téléphone">
                    <span class="icon-phone"></span>
                  </a>
                </li>
                <li>
                  <a :href="data.link" uk-tooltip="En savoir plus">
                    <svg class="icon">
                      <use xlink:href="/assets/images/sprite.svg#fiche-plus"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
</script>