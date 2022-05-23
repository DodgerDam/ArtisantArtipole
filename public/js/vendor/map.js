/**
 * Init Function to Launch on document Ready
 */


/* SHOW HIDE MAP EVENT FUNCTION  */
function showhideMapEvent() {
    var btnMap = document.querySelector('.btn-map');
    var btnList = document.querySelector('.btn-liste');
    var showMap = document.querySelector('.container-listing-map');
    btnMap.addEventListener('click', () => {
        btnMap.classList.add('active');
        btnList.classList.remove('active');
        showMap.classList.add('show-map');
        setTimeout(function() { newMap.invalidateSize().setZoom(10) }, 100);
    });
    btnList.addEventListener('click', () => {
        btnMap.classList.remove('active');
        btnList.classList.add('active');
        showMap.classList.remove('show-map');
    });
}
/* END */



function mapArtisans() {
    newMap = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);

    var smallIcon = new L.divIcon({
        className: 'icon-map',
        iconSize: [29, 37],
        iconAnchor: [29, 37],
        popupAnchor: [-13, -40]
    });
    var markers = [];
    var filtreLayer = L.featureGroup();
    L.geoJson(geojsondatas, {
        pointToLayer: function(feature, latlng) {

            var popupContent =
                "<div class='card-artisan'>" +
                "<picture><img data-src=" + feature.properties.photo + " uk-img /></picture>" +
                "<div class='content-card'>" +
                "<h2>" + feature.properties.title + "</h2><div class='competences'><p>" + feature.properties.specialite + "</p></div>" +
                "<div class='container-adresse'><svg class='icon'><use xlink:href='assets/images/sprite.svg#carte'></use></svg><div class='adresse'><p>" + feature.properties.adresse + "</p></div></div>" +
                "<ul class='share-buttons'>" +
                "<li><a href='mailto:" + feature.properties.email + "' uk-tooltip='Contacter par email'><svg class='icon'><use xlink:href='assets/images/sprite.svg#fiche-mail'></use></svg></a></li>" +
                "<li><a href='tel:+33" + feature.properties.phone + "' uk-tooltip='Contacter par phone'><span class='icon-phone'></span></a></li>" +
                "<li><a href='" + feature.properties.link + "' uk-tooltip='En savoir plus'><svg class='icon'><use xlink:href='assets/images/sprite.svg#fiche-plus'></use></svg></a></li>" +
                "</ul>" +
                "</div>" +
                "</div>";
            var myMarker = L.marker(latlng, { icon: smallIcon, title: "marker_" + feature.properties.id }).bindPopup(popupContent);
            markers.push(myMarker);
            filtreLayer.addLayer(myMarker);
            //console.log(markers);
            return L.marker(latlng, { icon: smallIcon });
        }
    });
    filtreLayer.addTo(newMap);
    newMap.fitBounds(filtreLayer.getBounds());

    function markerFunction(id) {

        for (var i in markers) {
            var markerID = markers[i].options.title;
            /*     console.log(markerID);
                console.log(id); */
            if (markerID == id) {
                markers[i].openPopup();
            };
        }
    }

    var popMaps = [].slice.call(document.querySelectorAll('.poptomap'));
    popMaps.forEach(function(popMap) {
        popMap.addEventListener('click', (event) => {
            markerFunction(popMap.dataset.id);
        });
    });

}


const initReady = () => {
    var newMap;
    showhideMapEvent();
    //mapArtisans();
};

// Document ready
document.addEventListener('DOMContentLoaded', initReady);