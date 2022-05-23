/**
 * Affichage Carte Leaflet en page de contenu
 */

const contentMap = () => {
    const mapContainer = document.querySelector('.event-map-detail');
    // IF Map Container is not present on DOM return

    if (!mapContainer) {
        return false;
    }

    const zoom = mapContainer.dataset.zoom;
    const latitute = mapContainer.dataset.latitude;
    const longitude = mapContainer.dataset.longitude;

    // Init Leaflet Map
    const myContentMap = L.map(mapContainer, {
        preferCanvas: false,
        scrollWheelZoom: false,
        zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myContentMap);

    myContentMap.setView([latitute, longitude], zoom);

    // Display Marker
    const myIcon = L.divIcon({
        className: 'map-icon-artisan',
        //iconUrl: '../assets/images/map-icon-red.svg',
        iconSize: null,
        iconAnchor: [20, 20],
    });

    L.marker([latitute, longitude], {
        icon: myIcon
    }).addTo(myContentMap);

}

export default contentMap;