"use strict";

/**
 * Init Function to Launch on document Ready
 */

/* SHOW HIDE MAP EVENT FUNCTION  */
function showhideMapEvent() {
  var btnMap = document.querySelector('.btn-map');
  var btnList = document.querySelector('.btn-liste');
  var showMap = document.querySelector('.container-listing-map');
  btnMap.addEventListener('click', function () {
    if (btnMap.classList.contains('active')) {
      btnMap.classList.remove('active');
      btnList.classList.toggle('active');
      showMap.classList.remove('show-map');
    } else {
      btnMap.classList.add('active');
      btnList.classList.remove('active');
      showMap.classList.toggle('show-map');
    }
  });
  btnList.addEventListener('click', function () {
    if (btnList.classList.contains('active')) {
      btnList.classList.remove('active');
      btnMap.classList.toggle('active');
      showMap.classList.toggle('show-map');
    } else {
      btnList.classList.add('active');
      showMap.classList.remove('show-map');
      btnMap.classList.remove('active');
    }
  });
}
/* END */


function mapArtisans() {
  var newMap = L.map('map').setView([47.22237886732545, 7.4034674198320305], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(newMap);

  function onEachFeature(feature, layer) {
    var popupContent = "<div class='card-artisan'>" + "<picture><img data-src=" + feature.properties.photo + " uk-img /></picture>" + "<div class='content-card'>" + "<h2>" + feature.properties.title + "</h2><div class='competences'><p>" + feature.properties.specialite + "</p></div>" + "<div class='container-adresse'><svg class='icon'><use xlink:href='assets/images/sprite.svg#carte'></use></svg><div class='adresse'><p>" + feature.properties.adresse + "</p></div></div>" + "<ul class='share-buttons'>" + "<li><a href='mailto:" + feature.properties.email + "' uk-tooltip='Contacter par email'><svg class='icon'><use xlink:href='assets/images/sprite.svg#fiche-mail'></use></svg></a></li>" + "<li><a href='tel:+33" + feature.properties.phone + "' uk-tooltip='Contacter par phone'><span class='icon-phone'></span></a></li>" + "<li><a href='" + feature.properties.link + "' uk-tooltip='En savoir plus'><svg class='icon'><use xlink:href='assets/images/sprite.svg#fiche-plus'></use></svg></a></li>" + "</ul>" + "</div>" + "</div>";
    layer.bindPopup(popupContent);
  }

  var smallIcon = new L.divIcon({
    className: 'icon-map',
    iconSize: [29, 37],
    iconAnchor: [29, 37],
    popupAnchor: [-13, -40]
  });
  $.getJSON('./assets/images/liste-artisan.geojson', function (data) {
    L.geoJson(data, {
      pointToLayer: function pointToLayer(feature, latlng) {
        return L.marker(latlng, {
          icon: smallIcon
        });
      },
      onEachFeature: onEachFeature
    }).addTo(newMap);
  });
}

var initReady = function initReady() {
  showhideMapEvent();
  //mapArtisans();
}; // Document ready


document.addEventListener('DOMContentLoaded', initReady);