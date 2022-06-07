/**
 * Init Function to Launch on document Ready
 */
import contentMap from './vendor/contentMap';
import Accordion from './vendor/Accordion';

const menuButton = document.getElementById('burger-menu');
const menuBtnAnim = document.querySelector('.nav-icon');
const menuOuvert = document.getElementById('nav-container-id');
const tagRayonButtons = [].slice.call(document.querySelectorAll('.tag-rayon-button'));
const projectMobileButton = document.querySelector('.project-mobile-button');
const projectLinkButton = document.querySelector('.project-link');
const projectMobilecontainer = document.getElementById('container-projet-mobile');
const closeProjectButton = document.getElementById('close-container-project');

const customSelects = [].slice.call(document.querySelectorAll('.custom-select'));

/* TAG RAYON SEARCH BUTTONS */
function activeClassRayonButtons() {
    if (tagRayonButtons) {
        tagRayonButtons.forEach(function(tagRayonButton) {
            tagRayonButton.addEventListener('click', (event) => {
                tagRayonButton.classList.toggle('active');
                event.preventDefault();
            });
        });
    }
}
/* END */

/* PROJECT MOBILE FUNCTION  */
function projectMobile() {
    projectMobileButton.addEventListener('click', () => {
        if (menuOuvert.classList.contains('open')) {
            menuOuvert.classList.toggle('open');
            menuBtnAnim.classList.toggle('open');
        }
        projectMobilecontainer.classList.toggle('open');
        projectMobileButton.classList.toggle('active');
    });
    projectLinkButton.addEventListener('click', () => {
        if (menuOuvert.classList.contains('open')) {
            menuOuvert.classList.toggle('open');
            menuBtnAnim.classList.toggle('open');
        }
        projectMobilecontainer.classList.toggle('open');
        projectLinkButton.classList.toggle('active');
    });
    closeProjectButton.addEventListener('click', () => {
        projectMobilecontainer.classList.toggle('open');
        projectMobileButton.classList.toggle('active');
    });
}
/* END */

/* MÉTIERS CONTAINER FUNCTION  */
function metiersContainer() {
    var metiersButtons = document.querySelectorAll('.metier-button');
    var menuMetiersContainer = document.getElementById('container-menu-metier');
    var closeButton = document.getElementById('close-metier-container');
    if (menuMetiersContainer) {
        metiersButtons.forEach(metiersButton => {
            metiersButton.addEventListener('click', () => {
                if (menuOuvert.classList.contains('open')) {
                    menuOuvert.classList.remove('open');
                    menuBtnAnim.classList.remove('open');
                }
                menuMetiersContainer.classList.toggle('open');
            });
        });
        closeButton.addEventListener('click', () => {
            menuMetiersContainer.classList.toggle('open');
        });
    }
}
/* END */

/* NAV MOBILE FUNCTION  */
function navMobile() {
    if (document.body.classList.contains('mobile')) {
        menuButton.addEventListener('click', () => {
            if (projectMobilecontainer.classList.contains('open')) {
                projectMobilecontainer.classList.toggle('open');
                projectMobileButton.classList.toggle('active');
            }
            menuOuvert.classList.toggle('open');
            menuBtnAnim.classList.toggle('open');
        });
    }
}
/* END */

/* GET RESOLUTION / ADD MOBILE CLASS & DESKTOP CLASS  */
function getResolution() {
    if (window.innerWidth < 1024) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
    }
}
window.addEventListener('resize', getResolution);
/* END */

/* RESIZE HEADER ON SCROLL */
function resizeHeaderOnScroll() {
    if (document.body.classList.contains('desktop')) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            headerEl = document.getElementById('header'),
            menuMetiersContainer = document.getElementById('container-menu-metier');

        if (distanceY > shrinkOn) {
            headerEl.classList.add("smaller");
            if (menuMetiersContainer) {
                menuMetiersContainer.classList.add("smaller");
            }


        } else {
            headerEl.classList.remove("smaller");
            if (menuMetiersContainer) {
                menuMetiersContainer.classList.add("smaller");
            }
        }
    }
}
window.addEventListener('scroll', resizeHeaderOnScroll);
/* END */

/* PROGRESS BAR */
function progress() {
    $(document).on("scroll", function() {
        var pixels = $(document).scrollTop();
        var pageHeight = $(document).height() - $(window).height();
        var progress = 100 * pixels / pageHeight;
        $("div.progress").css("width", progress + "%");
    });
}
/* END */

/* FAST ACCES */
function fastAcces() {
    var acces = document.getElementById("fast-acces");
    var btnCloseAcces = document.querySelector(".open-fast-acces");
    var distanceY = window.scrollY;
    if (distanceY > 700) {
        acces.classList.add("close");
    }
    btnCloseAcces.addEventListener('click', () => {
        acces.classList.remove('close');
    });
}
window.addEventListener('scroll', fastAcces);
/* END */

/* SWIPERS  */
function swipers() {
    var swiper_home = new Swiper(".swiper-home", {
        effect: "fade",
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "custom",
            renderCustom: function(swiper, current, total) {
                if (current < 10) {
                    var $nbrCurrent = '0' + current;
                } else {
                    var $nbrCurrent = current;
                }
                if (total < 10) {
                    var $nbrTotal = '0 ' + total;
                } else {
                    var $nbrTotal = total;
                }
                return '<span class="current">' + $nbrCurrent + '</span>' + ' ' + '<span class="total">' + $nbrTotal + '</span>';
            }
        },
        speed: 1500,
    });
    var swiper_marques = new Swiper(".swiper-marques", {
        slidesPerView: "6",
        spaceBetween: 20,
        loop: true,
        freeMode: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        speed: 500,
        navigation: {
            nextEl: ".swiper-button-next-marques",
            prevEl: ".swiper-button-prev-marques",
        },
        breakpoints: {
            200: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1400: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
        },
    });
    var swiper_autres_artisans = new Swiper(".swiper-autres-artisans", {
        slidesPerView: "4",
        spaceBetween: 20,
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        },
        breakpoints: {
            200: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });
    var swiper_actus = new Swiper(".swiper-actus", {
        loop: true,
        speed: 1500,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    var swiper_avis = new Swiper(".swiper-avis", {
        slidesPerView: "1",
        spaceBetween: 20,
        freeMode: true,
        navigation: {
            nextEl: ".swiper-button-next-avis",
            prevEl: ".swiper-button-prev-avis",
        },
    });
}

function swiperGalerie() {
    var swiperTabs = new Swiper(".swiper-tabs", {
        spaceBetween: 10,
        slidesPerView: 9,
        navigation: {
            nextEl: ".swiper-button-next-galerie",
            prevEl: ".swiper-button-prev-galerie",
        },
    });
    var swiperGalerie = new Swiper(".swiper-slide-galerie", {
        spaceBetween: 10,
        effect: "fade",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiperTabs,
        },
    });

    var select = document.getElementById("select-swipe-mobile");
    if (select) {
        select.addEventListener('change', function() {
            swiperGalerie.slideTo(this.value);
        });
    }

}

function swiperCooperateurs() {
    var swiper_cooperateur_1 = new Swiper(".swiper_cooperateur_1", {
        slidesPerView: 1,
        slidesPerGroupSkip: 1,
        spaceBetween: 20,
        breakpoints: {
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
        },
        pagination: {
            el: ".swiper-pagination-cooperateur_1",
            clickable: true,
            renderBullet: function(index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
    });
    var swiper_cooperateur_2 = new Swiper(".swiper_cooperateur_2", {
        slidesPerView: 1,
        slidesPerGroupSkip: 1,
        spaceBetween: 20,
        breakpoints: {
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
        },
        pagination: {
            el: ".swiper-pagination-cooperateur_2",
            clickable: true,
            renderBullet: function(index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
    });
    var swiper_cooperateur_3 = new Swiper(".swiper_cooperateur_3", {
        slidesPerView: 1,
        slidesPerGroupSkip: 1,
        spaceBetween: 20,
        breakpoints: {
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
        },
        pagination: {
            el: ".swiper-pagination-cooperateur_3",
            clickable: true,
            renderBullet: function(index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
    });
}

/* END */


function animeSwiperGalerie() {
    var galerieButtons = [].slice.call(document.querySelectorAll('.button-galerie'));
    var galerieSlides = [].slice.call(document.querySelectorAll('.container-swiper-galerie .swiper-slide'));
    var itemPhotos = [].slice.call(document.querySelectorAll('.container-swiper-galerie .swiper-slide .item-photo'));
    var swiperTabs = [].slice.call(document.querySelectorAll('.swiper-tabs .tab-swiper'));

    galerieButtons.forEach(function(galerieButton) {
        galerieButton.addEventListener('click', () => {
            if (galerieSlides) {
                galerieSlides.forEach(function(galerieSlide) {
                    if (galerieSlide.classList.contains('swiper-slide-active')) {
                        setTimeout(function() {
                            itemPhotos.forEach(function(itemPhoto) {
                                itemPhoto.classList.toggle('aos-animate');
                            });
                        }, 800);
                    } else {
                        itemPhotos.forEach(function(itemPhoto) {
                            itemPhoto.classList.remove('aos-animate');
                        });
                    }
                });
            }
        });
    });
    swiperTabs.forEach(function(swiperTab) {
        swiperTab.addEventListener('click', () => {
            if (galerieSlides) {
                galerieSlides.forEach(function(galerieSlide) {
                    if (galerieSlide.classList.contains('swiper-slide-active')) {
                        setTimeout(function() {
                            itemPhotos.forEach(function(itemPhoto) {
                                itemPhoto.classList.toggle('aos-animate');
                            });
                        }, 800);
                    } else {
                        itemPhotos.forEach(function(itemPhoto) {
                            itemPhoto.classList.remove('aos-animate');
                        });
                    }
                });
            }
        });
    });
}

function moveFicheArtisanMobile() {
    var cible = document.querySelector('.container-fiche-artisan-mobile');
    var fiche = document.querySelector('.fiche-artisan');
    if (document.body.classList.contains('mobile') && (cible)) {
        cible.appendChild(fiche);
    }
}

function customTomSelects() {
    if (customSelects) {
        customSelects.forEach(function(customSelect) {
            new TomSelect(customSelect, {
                create: false,
                sortField: {
                    field: "text",
                    direction: "asc"
                }
            });
        });
    }
}

function animeGalerieInspiration() {
    var contentInspirations = [].slice.call(document.querySelectorAll('.container-photos-inspirations'));
    var itemPhotos = [].slice.call(document.querySelectorAll('.items-imgs__photo'));
    var buttonCarInspirations = [].slice.call(document.querySelectorAll('.button-cat-inspiration'));
    buttonCarInspirations.forEach(function(buttonCarInspiration) {
        buttonCarInspiration.addEventListener('click', () => {
            if (contentInspirations) {
                contentInspirations.forEach(function(contentInspiration) {
                    if (contentInspiration.classList.contains('uk-active')) {
                        setTimeout(function() {
                            itemPhotos.forEach(function(itemPhoto) {
                                itemPhoto.classList.toggle('aos-animate');
                            });
                        }, 800);
                    } else {
                        itemPhotos.forEach(function(itemPhoto) {
                            itemPhoto.classList.remove('aos-animate');
                        });
                    }
                });
            }
        });
    });
}


const initReady = () => {
    getResolution();
    resizeHeaderOnScroll();
    swipers();
    progress();
    navMobile();
    activeClassRayonButtons();
    swiperGalerie();
    animeSwiperGalerie();
    projectMobile();
    contentMap();
    moveFicheArtisanMobile();
    Accordion();
    swiperCooperateurs();
    metiersContainer();
    animeGalerieInspiration();
    setTimeout(customTomSelects, 100);
    AOS.init({
        easing: 'ease-out-cubic',
        duration: 800,
        once: true
    });
};

// Document ready
document.addEventListener('DOMContentLoaded', initReady);