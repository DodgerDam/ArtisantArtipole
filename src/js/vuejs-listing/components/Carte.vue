<template>
  <div class="kg-listing-map">

    <l-map class="event-uk-map" id="map" ref="mymap"
           :zoom="zoom"
           :center="center"
           :options="{zoomControl: false, scrollWheelZoom: false}">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-control-zoom position="topright"></l-control-zoom>
      <l-marker
          ref="markers"
          v-for="data in filteredArtisans"
          :key="data.id"
          :lat-lng="data.coordinates"
          @updated="fitToMarkers">
        <l-icon :popup-anchor="[0,-30]" :icon-anchor="[21,21]" :class-name="(bounceid === data.id ? 'pulsate' : '')">
          <div class="icon-map"></div>
        </l-icon>
        <l-popup>
          <div class="card-artisan">
            <button class="poptomap" :title="data.title" data-id="marker_1">
              <figure>
                <img :data-src="data.photo" width="390" height="170" alt="" uk-img />
              </figure>

              <div class="content-card">
                <h2>{{data.title}}</h2>
                <ul class="competences" >
                  <li v-for="comp in data.specialite.metier" v-bind:key="comp.id"> {{comp.label}}</li>
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
        </l-popup>
        <l-tooltip :tooltip-anchor="[20,20]" :content="data.title" />
      </l-marker>
    </l-map>
  </div>
</template>

<script>

import {latLng, latLngBounds} from "leaflet";
import {LMap, LTileLayer, LControlZoom, LMarker, LIcon, LPopup, LTooltip} from "vue2-leaflet";


export default {
  name: "Carte",
  props: ['showMap'],
  data() {
    return {
      zoom: 10,
      bounds: null,
      center: latLng(47.00061202902875, 5.862686634063721),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  },
  computed: {
    filteredArtisans () {
      return this.$store.getters.getFilteredArtisans
    },
    bounceid () {
      return this.$store.state.bounce_id
    }
  },
  watch: {
    filteredArtisans(newValue) {
      if (newValue)
        this.fitToMarkers()
    },
    showMap(newValue) {
      if (newValue)
        this.fitToMarkers()
    },
  },
  components: {
    'l-map': LMap,
    LControlZoom,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    LTooltip
  },
  methods: {
    fitToMarkers() {
      let bounds = []
      for (let i in this.filteredArtisans) {
        bounds.push([this.filteredArtisans[i].coordinates.lat,this.filteredArtisans[i].coordinates.lng])
      }
      if(bounds.length > 0) {
          this.bounds = latLngBounds(bounds)
          setTimeout(() => {
          this.$refs.mymap.mapObject.invalidateSize()
          this.$refs.mymap.mapObject.fitBounds(bounds)
      }, 100)
      }
      
    }
  }
}
</script>

